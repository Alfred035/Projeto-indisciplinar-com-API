import { useCallback, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import Header from '../components/Header'
import { apiGetClientes } from '../services/api'

export default function ClientesScreen({ navigation }) {
  const [clientes,   setClientes]   = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro,       setErro]       = useState('')

  useFocusEffect(useCallback(() => {
    apiGetClientes()
      .then(setClientes)
      .catch(() => setErro('Não foi possível carregar os clientes.'))
      .finally(() => setCarregando(false))
  }, []))

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      {carregando ? (
        <ActivityIndicator color="#111" style={styles.loading} />
      ) : erro ? (
        <Text style={styles.erro}>{erro}</Text>
      ) : (
        <FlatList
          data={clientes}
          keyExtractor={(_, i) => String(i)}
          contentContainerStyle={styles.lista}
          ListHeaderComponent={<Text style={styles.titulo}>👥 Clientes Cadastrados</Text>}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.avatar}>
                <Text style={styles.avatarLetra}>{item.nome?.charAt(0).toUpperCase()}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.email}>{item.email}</Text>
                {item.telefone ? <Text style={styles.tel}>📞 {item.telefone}</Text> : null}
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.vazio}>Nenhum cliente cadastrado ainda.</Text>}
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
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 8, padding: 12, marginBottom: 8, gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },
  avatarLetra: { color: '#fff', fontSize: 16, fontWeight: '700' },
  info: { flex: 1 },
  nome: { fontSize: 13, fontWeight: '700', color: '#111' },
  email: { fontSize: 11, color: '#666', marginTop: 2 },
  tel: { fontSize: 11, color: '#888', marginTop: 2 },
  vazio: { textAlign: 'center', color: '#bbb', fontSize: 13, marginTop: 40 },
  erro: { color: '#e53935', textAlign: 'center', margin: 24 },
})
