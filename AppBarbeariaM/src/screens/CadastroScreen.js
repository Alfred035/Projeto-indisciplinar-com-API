import { useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BotaoPrimario from '../components/BotaoPrimario'
import CampoInput from '../components/CampoInput'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { apiRegister, setToken } from '../services/api'

export default function CadastroScreen({ navigation }) {
  const { loginDireto } = useAuth()
  const [nome,  setNome]  = useState('')
  const [email, setEmail] = useState('')
  const [tel,   setTel]   = useState('')
  const [senha, setSenha] = useState('')
  const [erros, setErros] = useState({})
  const [carregando, setCarregando] = useState(false)

  const validar = () => {
    const e = {}
    if (!nome.trim()) e.nome = 'Nome obrigatório.'
    if (!email.trim()) {
      e.email = 'E-mail obrigatório.'
    } else if (!email.toLowerCase().endsWith('@gmail.com')) {
      e.email = 'O e-mail deve terminar com @gmail.com'
    }
    if (!senha) {
      e.senha = 'Senha obrigatória.'
    } else if (senha.length < 6) {
      e.senha = 'Mínimo 6 caracteres.'
    } else if (!/[A-Z]/.test(senha)) {
      e.senha = 'Precisa ter pelo menos 1 letra maiúscula.'
    }
    return e
  }

  const cadastrar = async () => {
    const e = validar()
    setErros(e)
    if (Object.keys(e).length > 0) return

    try {
      setCarregando(true)
      // Cadastra na API
      const novoUser = await apiRegister(nome.trim(), email.toLowerCase().trim(), senha, tel.trim())
      // Faz login automático para pegar o token
      const { login } = require('../context/AuthContext')
      // Login direto sem precisar chamar a API de novo
      loginDireto({ ...novoUser, tel: novoUser.telefone || tel }, false)
      // Precisa do token — faz login na API para obtê-lo
      const { apiLogin } = require('../services/api')
      await apiLogin(email.toLowerCase().trim(), senha)
      navigation.replace('Home')
    } catch (err) {
      const msg = err.message || ''
      if (msg.toLowerCase().includes('e-mail')) {
        setErros(p => ({ ...p, email: 'E-mail existente.' }))
      } else {
        setErros(p => ({ ...p, geral: msg }))
      }
    } finally {
      setCarregando(false)
    }
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.corpo} keyboardShouldPersistTaps="handled">
        <CampoInput label="Nome"     value={nome}  onChangeText={v => { setNome(v);  setErros(p => ({...p, nome: ''})) }}  placeholder="Digite seu Nome" />
        {erros.nome  ? <Text style={styles.erro}>{erros.nome}</Text>  : null}

        <CampoInput label="Email"    value={email} onChangeText={v => { setEmail(v); setErros(p => ({...p, email: ''})) }} placeholder="exemplo@gmail.com" keyboardType="email-address" />
        {erros.email ? <Text style={styles.erro}>{erros.email}</Text> : null}

        <CampoInput label="Telefone" value={tel}   onChangeText={setTel} placeholder="(11) 99999-9999" keyboardType="phone-pad" />

        <CampoInput label="Senha"    value={senha} onChangeText={v => { setSenha(v); setErros(p => ({...p, senha: ''})) }} placeholder="Mín. 6 caracteres, 1 maiúscula" secureTextEntry />
        {erros.senha ? <Text style={styles.erro}>{erros.senha}</Text> : null}
        {erros.geral ? <Text style={styles.erro}>{erros.geral}</Text> : null}

        <Text style={styles.dica}>A senha precisa ter mínimo 6 caracteres e 1 letra maiúscula.</Text>

        {carregando
          ? <ActivityIndicator color="#111" style={{ marginTop: 16 }} />
          : <BotaoPrimario label="Cadastrar" onPress={cadastrar} style={styles.btn} />
        }
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
          <Text style={styles.linkTexto}>Já tem conta? <Text style={styles.linkNegrito}>Entrar</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  corpo: { padding: 24 },
  erro: { color: '#e53935', fontSize: 11, marginTop: -10, marginBottom: 10 },
  dica: { fontSize: 10, color: '#aaa', marginBottom: 16, marginTop: -4 },
  btn: { marginTop: 4 },
  link: { marginTop: 16, alignItems: 'center' },
  linkTexto: { fontSize: 12, color: '#555' },
  linkNegrito: { color: '#111', fontWeight: '700', textDecorationLine: 'underline' },
})
