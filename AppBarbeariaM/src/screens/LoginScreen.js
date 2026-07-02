import { useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BotaoPrimario from '../components/BotaoPrimario'
import CampoInput from '../components/CampoInput'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'

export default function LoginScreen({ navigation }) {
  const { login } = useAuth()
  const [email,     setEmail]     = useState('')
  const [senha,     setSenha]     = useState('')
  const [erro,      setErro]      = useState('')
  const [carregando, setCarregando] = useState(false)

  const entrar = async () => {
    setErro('')
    if (!email || !senha) { setErro('Preencha e-mail e senha.'); return }
    try {
      setCarregando(true)
      await login(email.trim().toLowerCase(), senha, false)
      navigation.replace('Home')
    } catch (e) {
      setErro(e.message || 'E-mail ou senha incorretos.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.corpo} keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>Entrar como Cliente</Text>
        <CampoInput label="Email" value={email} onChangeText={v => { setEmail(v); setErro('') }} placeholder="exemplo@gmail.com" keyboardType="email-address" />
        <CampoInput label="Senha" value={senha} onChangeText={v => { setSenha(v); setErro('') }} placeholder="Digite sua Senha" secureTextEntry />
        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        {carregando
          ? <ActivityIndicator color="#111" style={{ marginTop: 16 }} />
          : <BotaoPrimario label="Entrar" onPress={entrar} style={styles.btn} />
        }
        <View style={styles.rodape}>
          <TouchableOpacity onPress={() => navigation.navigate('Welcome')}><Text style={styles.link}>← Voltar</Text></TouchableOpacity>
          <Text style={styles.sep}>|</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}><Text style={styles.link}>Criar conta</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  corpo: { padding: 24 },
  titulo: { fontSize: 18, fontWeight: '600', color: '#111', marginBottom: 20 },
  erro: { color: '#e53935', fontSize: 12, marginBottom: 12, textAlign: 'center' },
  btn: { marginTop: 8 },
  rodape: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 16 },
  link: { fontSize: 12, color: '#111', fontWeight: '700', textDecorationLine: 'underline' },
  sep: { fontSize: 12, color: '#bbb' },
})
