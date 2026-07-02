import { useCallback, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import CardAgendamento from '../components/CardAgendamento'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { apiCancelarAgendamento, apiGetAgendamentos } from '../services/api'

export default function HomeScreen({ navigation }) {
  const { isAdm } = useAuth()
  const [agendamentos, setAgendamentos] = useState([])
  const [carregando,   setCarregando]   = useState(true)
  const [erro,         setErro]         = useState('')

  const carregar = useCallback(async () => {
    try {
      setCarregando(true)
      setErro('')
      const data = await apiGetAgendamentos(isAdm)
      setAgendamentos(data)
    } catch (e) {
      setErro('Não foi possível carregar os agendamentos.\nVerifique se a API está rodando.')
    } finally {
      setCarregando(false)
    }
  }, [isAdm])

  // Recarrega sempre que a tela entra em foco
  useFocusEffect(carregar)

  const cancelar = async (id) => {
    try {
      await apiCancelarAgendamento(id, isAdm)
      setAgendamentos(prev => prev.filter(a => a.id !== id))
    } catch (e) {
      setErro(e.message)
    }
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      {carregando ? (
        <ActivityIndicator color="#111" style={styles.loading} />
      ) : erro ? (
        <Text style={styles.erro}>{erro}</Text>
      ) : (
        <FlatList
          data={agendamentos}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => (
            <CardAgendamento agendamento={item} onCancelar={cancelar} />
          )}
          ListHeaderComponent={
            isAdm ? <Text style={styles.titulo}>📋 Todos os Agendamentos</Text> : null
          }
          ListEmptyComponent={
            <Text style={styles.vazio}>Nenhum agendamento.{'\n'}{isAdm ? '' : 'Use o menu ☰ para criar.'}</Text>
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loading: { marginTop: 60 },
  lista: { padding: 16 },
  titulo: { fontSize: 14, fontWeight: '700', color: '#111', marginBottom: 12 },
  vazio: { textAlign: 'center', color: '#bbb', fontSize: 13, marginTop: 40, lineHeight: 22 },
  erro: { color: '#e53935', textAlign: 'center', margin: 24, lineHeight: 22 },
})
