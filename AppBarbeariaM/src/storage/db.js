export const ADM_EMAIL = 'Barbeiro.123@gmail.com'
export const ADM_SENHA = 'Sla31@123'

const db = {
  users: [],
  agendamentos: [
    { id: 1, userId: 'carlos@gmail.com', nome: 'Carlos Silva', tel: '(11) 91111-1111', servico: 'Corte + Barba', preco: 55, data: '2025-06-25', hora: '09:00' },
    { id: 2, userId: 'joao@gmail.com',   nome: 'João Lima',    tel: '(11) 92222-2222', servico: 'Degradê',        preco: 45, data: '2025-06-25', hora: '10:00' },
  ],
  nextId: 3,
}

export const getAgendamentos  = () => db.agendamentos
export const getUsers         = () => db.users

export const addUser = (user) => db.users.push(user)

export const addAgendamento = (ag) => {
  ag.id = db.nextId++
  db.agendamentos.push(ag)
}

export const removeAgendamento = (id) => {
  const idx = db.agendamentos.findIndex(a => a.id === id)
  if (idx !== -1) db.agendamentos.splice(idx, 1)
}

export const findUser = (email, senha) =>
  db.users.find(u => u.email === email && u.senha === senha) || null

export const emailExiste = (email) =>
  db.users.some(u => u.email === email) || email === ADM_EMAIL

// Retorna os horários já ocupados para uma data específica
export const horariosOcupados = (data) =>
  db.agendamentos.filter(a => a.data === data).map(a => a.hora)
