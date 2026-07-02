import { StyleSheet, Text, View } from 'react-native'
import BotaoPrimario from '../components/BotaoPrimario'
import Header from '../components/Header'

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.corpo}>
        <Text style={styles.titulo}>Bem Vindo</Text>
        <Text style={styles.subtitulo}>Como deseja entrar?</Text>

        <BotaoPrimario
          label="Sou Cliente"
          onPress={() => navigation.navigate('Login')}
          style={styles.btn}
        />
        <BotaoPrimario
          label="Sou Barbeiro"
          onPress={() => navigation.navigate('LoginBarbeiro')}
          variante="outline"
          style={styles.btn}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  corpo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  titulo: { fontSize: 22, fontWeight: '500', color: '#111' },
  subtitulo: { fontSize: 13, color: '#888', marginBottom: 8 },
  btn: {},
})
