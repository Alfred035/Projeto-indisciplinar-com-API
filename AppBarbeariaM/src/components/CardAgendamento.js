import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { useAuth } from '../context/AuthContext'

export default function CardAgendamento({ agendamento, onCancelar }) {
  const { usuario, isAdm } = useAuth()
  const isMeu = agendamento.usuarioId === usuario?.id
  const podeCancelar = isMeu || isAdm

  const dataFormatada = agendamento.data
    ? agendamento.data.split('T')[0].split('-').reverse().join('/')
    : ''

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.nome}>{agendamento.nomeUsuario || agendamento.nome}</Text>
        <Text style={styles.servico}>{agendamento.servico} — R$ {agendamento.preco}</Text>
        <Text style={styles.datetime}>{dataFormatada} às {agendamento.hora}</Text>
      </View>
      <View style={styles.direita}>
        {podeCancelar && (
          <TouchableHighlight
            onPress={() => onCancelar(agendamento.id)}
            underlayColor="#c62828"
            style={styles.btnCancelar}
          >
            <Text style={styles.btnCancelarTexto}>Cancelar</Text>
          </TouchableHighlight>
        )}
        {/* ADM vê o telefone; cliente não vê badge */}
        {!isMeu && agendamento.telUsuario ? (
          <View style={styles.badge}>
            <Text style={styles.badgeTexto}>{agendamento.telUsuario}</Text>
          </View>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#f5f5f5', borderRadius: 6, padding: 10, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  info: { flex: 1 },
  nome: { fontSize: 13, fontWeight: '700', color: '#111' },
  servico: { fontSize: 11, color: '#666', marginTop: 2 },
  datetime: { fontSize: 10, color: '#888', marginTop: 2 },
  direita: { alignItems: 'flex-end', gap: 4, maxWidth: 110 },
  btnCancelar: { backgroundColor: '#e53935', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 },
  btnCancelarTexto: { color: '#fff', fontSize: 10, fontWeight: '700' },
  badge: { backgroundColor: '#e8e8e8', borderWidth: 1, borderColor: '#ccc', borderRadius: 3, paddingHorizontal: 6, paddingVertical: 2 },
  badgeTexto: { color: '#111', fontSize: 9 },
})
