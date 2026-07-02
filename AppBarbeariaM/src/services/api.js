// URL base da API — mesma porta do launchSettings.json
const BASE_URL = 'http://localhost:5089/api'

// Guarda o token em memória (use AsyncStorage para persistir entre sessões)
let _token = ''
export const setToken = (t) => { _token = t }
export const getToken = () => _token

const headers = (extra = {}) => ({
  'Content-Type': 'application/json',
  ...((_token) ? { Authorization: `Bearer ${_token}` } : {}),
  ...extra,
})

// ── AUTH ──────────────────────────────────────────────────
export const apiRegister = async (nome, email, senha, telefone) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ nome, email, senha, telefone }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Erro ao cadastrar')
  return data // UsuarioResponseDto
}

export const apiLogin = async (email, senha) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, senha }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'E-mail ou senha incorretos.')
  setToken(data.token)
  return data // { token, usuario: { id, nome, email } }
}

// ── USUARIOS ──────────────────────────────────────────────
export const apiGetClientes = async () => {
  const res = await fetch(`${BASE_URL}/usuarios`, { headers: headers() })
  const data = await res.json()
  if (!res.ok) throw new Error('Erro ao buscar clientes')
  return data
}

// ── AGENDAMENTOS ──────────────────────────────────────────
export const apiGetAgendamentos = async (todos = false) => {
  const url = todos
    ? `${BASE_URL}/agendamentos?todos=true`
    : `${BASE_URL}/agendamentos`
  const res = await fetch(url, { headers: headers() })
  const data = await res.json()
  if (!res.ok) throw new Error('Erro ao buscar agendamentos')
  return data
}

export const apiGetHorariosOcupados = async (data) => {
  const res = await fetch(`${BASE_URL}/agendamentos/ocupados?data=${data}`, {
    headers: headers(),
  })
  const json = await res.json()
  if (!res.ok) throw new Error('Erro ao buscar horários')
  return json // string[]
}

export const apiCriarAgendamento = async (servico, preco, data, hora) => {
  const res = await fetch(`${BASE_URL}/agendamentos`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ servico, preco, data, hora }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Erro ao criar agendamento')
  return json
}

export const apiCancelarAgendamento = async (id, isAdm = false) => {
  const url = `${BASE_URL}/agendamentos/${id}${isAdm ? '?adm=true' : ''}`
  const res = await fetch(url, { method: 'DELETE', headers: headers() })
  if (!res.ok) {
    const json = await res.json().catch(() => ({}))
    throw new Error(json.message || 'Erro ao cancelar')
  }
}
