import { StyleSheet, Text, TouchableHighlight } from 'react-native'

export default function BotaoPrimario({ label, onPress, variante = 'preto', style }) {
  const estilos = [styles.botao]
  if (variante === 'vermelho') estilos.push(styles.vermelho)
  if (variante === 'outline')  estilos.push(styles.outline)

  const textoEstilos = [styles.texto]
  if (variante === 'outline') textoEstilos.push(styles.textoOutline)

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={variante === 'vermelho' ? '#c62828' : variante === 'outline' ? '#f5f5f5' : '#333'}
      style={[estilos, style]}
    >
      <Text style={textoEstilos}>{label}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#111',
    borderRadius: 6,
    paddingVertical: 13,
    alignItems: 'center',
    width: '100%',
  },
  vermelho: { backgroundColor: '#e53935' },
  outline: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#111',
  },
  texto: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  textoOutline: { color: '#111' },
})
