import { useState } from 'react'
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BotaoPrimario from '../components/BotaoPrimario'
import Header from '../components/Header'
import { apiCriarAgendamento, apiGetHorariosOcupados } from '../services/api'

const HORARIOS = [
  '08:00','08:30','09:00','09:30','10:00','10:30',
  '11:00','11:30','13:00','13:30','14:00','14:30',
  '15:00','15:30','16:00','16:30','17:00',
]

const SERVICOS = [
  { label: 'Corte simples',  preco: 35 },
  { label: 'Corte + Barba',  preco: 55 },
  { label: 'Barba',          preco: 30 },
  { label: 'Degradê',        preco: 45 },
  { label: 'Corte infantil', preco: 25 },
]

function gerarDatas() {
  const datas = []
  for (let i = 1; i <= 14; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    const iso = d.toISOString().split('T')[0]
    datas.push({ iso, display: iso.split('-').reverse().join('/') })
  }
  return datas
}

function Seletor({ label, opcoes, valorSelecionado, onSelecionar, getLabel, desabilitados = [] }) {
  return (
    <View style={ss.grupo}>
      <Text style={ss.label}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {opcoes.map((op, i) => {
          const val    = typeof op === 'object' ? op.iso || op.label : op
          const texto  = getLabel ? getLabel(op) : op
          const ativo  = valorSelecionado === val
          const ocupado = desabilitados.includes(val)
          return (
            <TouchableOpacity
              key={i}
              onPress={() => !ocupado && onSelecionar(val)}
              style={[ss.chip, ativo && ss.chipAtivo, ocupado && ss.chipOcupado]}
              activeOpacity={ocupado ? 1 : 0.7}
            >
              <Text style={[ss.chipTexto, ativo && ss.chipTextoAtivo, ocupado && ss.chipTextoOcupado]}>
                {texto}{ocupado ? ' ✕' : ''}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

const ss = StyleSheet.create({
  grupo: { marginBottom: 20 },
  label: { fontSize: 12, color: '#555', marginBottom: 8 },
  chip: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8, backgroundColor: '#f9f9f9' },
  chipAtivo: { backgroundColor: '#111', borderColor: '#111' },
  chipOcupado: { backgroundColor: '#f0f0f0', borderColor: '#e0e0e0', opacity: 0.5 },
  chipTexto: { fontSize: 12, color: '#555' },
  chipTextoAtivo: { color: '#fff', fontWeight: '700' },
  chipTextoOcupado: { color: '#bbb', textDecorationLine: 'line-through' },
})

export default function NovoAgendamentoScreen({ navigation }) {
  const [data,       setData]       = useState('')
  const [hora,       setHora]       = useState('')
  const [servico,    setServico]    = useState('')
  const [ocupados,   setOcupados]   = useState([])
  const [carregando, setCarregando] = useState(false)

  const datas = gerarDatas()

  const selecionarData = async (val) => {
    setData(val)
    setHora('')
    try {
      const lista = await apiGetHorariosOcupados(val)
      setOcupados(lista)
    } catch { setOcupados([]) }
  }

  const concluir = async () => {
    if (!data || !hora || !servico) {
      Alert.alert('Atenção', 'Selecione data, hora e serviço.')
      return
    }
    const srv = SERVICOS.find(s => s.label === servico)
    try {
      setCarregando(true)
      await apiCriarAgendamento(servico, srv?.preco ?? 0, data, hora)
      navigation.replace('Home')
    } catch (e) {
      Alert.alert('Erro', e.message || 'Não foi possível criar o agendamento.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.corpo} keyboardShouldPersistTaps="handled">
        <Seletor label="Data"    opcoes={datas}     valorSelecionado={data}    onSelecionar={selecionarData} getLabel={op => op.display} />
        <Seletor label="Hora"    opcoes={HORARIOS}  valorSelecionado={hora}    onSelecionar={setHora}        desabilitados={ocupados} />
        <Seletor label="Serviço" opcoes={SERVICOS}  valorSelecionado={servico} onSelecionar={setServico}     getLabel={op => `${op.label} — R$ ${op.preco}`} />

        {ocupados.length > 0 && <Text style={styles.aviso}>⚠️ Horários riscados já estão ocupados</Text>}

        {carregando
          ? <ActivityIndicator color="#111" style={{ marginTop: 16 }} />
          : <>
              <BotaoPrimario label="Concluir" onPress={concluir} style={styles.btn} />
              <BotaoPrimario label="Cancelar" onPress={() => navigation.goBack()} variante="vermelho" style={styles.btnRed} />
            </>
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  corpo: { padding: 24 },
  aviso: { fontSize: 11, color: '#e53935', marginTop: -10, marginBottom: 16 },
  btn: { marginTop: 8 },
  btnRed: { marginTop: 10 },
})
