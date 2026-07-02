import { useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BotaoPrimario from '../components/BotaoPrimario'
import CampoInput from '../components/CampoInput'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'

const ADM_EMAIL = 'Barbeiro.123@gmail.com'
const ADM_SENHA = 'Sla31@123'

export default function LoginBarbeiroScreen({ navigation }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro,  setErro]  = useState('')
  const [carregando, setCarregando] = useState(false)

  const entrar = async () => {
    setErro('')
    if (!email || !senha) { setErro('Preencha e-mail e senha.'); return }
    if (email !== ADM_EMAIL || senha !== ADM_SENHA) {
      setErro('Credenciais do barbeiro incorretas.')
      return
    }
    try {
      setCarregando(true)
      await login(email, senha, true) // isAdm = true
      navigation.replace('Home')
    } catch (e) {
      setErro(e.message || 'Erro ao conectar com a API.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.corpo} keyboardShouldPersistTaps="handled">
        <View style={styles.iconeArea}>
          <Text style={styles.icone}>✂️</Text>
          <Text style={styles.titulo}>Área do Barbeiro</Text>
          <Text style={styles.subtitulo}>Acesso restrito</Text>
        </View>
        <CampoInput label="Email" value={email} onChangeText={v => { setEmail(v); setErro('') }} placeholder="E-mail do barbeiro" keyboardType="email-address" />
        <CampoInput label="Senha" value={senha} onChangeText={v => { setSenha(v); setErro('') }} placeholder="Senha do barbeiro" secureTextEntry />
        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        {carregando
          ? <ActivityIndicator color="#111" style={{ marginTop: 16 }} />
          : <BotaoPrimario label="Entrar como Barbeiro" onPress={entrar} style={styles.btn} />
        }
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={styles.voltar}>
          <Text style={styles.voltarTexto}>← Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  corpo: { padding: 24 },
  iconeArea: { alignItems: 'center', marginBottom: 28, marginTop: 8 },
  icone: { fontSize: 40, marginBottom: 8 },
  titulo: { fontSize: 18, fontWeight: '700', color: '#111' },
  subtitulo: { fontSize: 12, color: '#888', marginTop: 2 },
  erro: { color: '#e53935', fontSize: 12, marginBottom: 12, textAlign: 'center' },
  btn: { marginTop: 8 },
  voltar: { marginTop: 16, alignItems: 'center' },
  voltarTexto: { fontSize: 12, color: '#111', fontWeight: '700', textDecorationLine: 'underline' },
})
