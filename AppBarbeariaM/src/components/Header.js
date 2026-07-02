import { useState } from 'react'
import {
  Modal, StyleSheet, Text, TouchableHighlight,
  TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native'
import { useAuth } from '../context/AuthContext'

export default function Header({ navigation }) {
  const { isAdm, logout } = useAuth()
  const [menuAberto, setMenuAberto] = useState(false)

  const fechar = () => setMenuAberto(false)

  const irPara = (tela) => {
    fechar()
    setTimeout(() => {
      if (tela === '__sair__') {
        logout()
        navigation?.replace?.('Welcome') || navigation?.navigate?.('Welcome')
      } else {
        navigation?.navigate(tela)
      }
    }, 200)
  }

  return (
    <>
      <View style={styles.container}>
        {/* ☰ Hamburguer no canto ESQUERDO */}
        <TouchableOpacity onPress={() => setMenuAberto(true)} style={styles.hamburger}>
          <View style={styles.linha} />
          <View style={styles.linha} />
          <View style={styles.linha} />
        </TouchableOpacity>

        <Text style={styles.skull}>💀</Text>
        <Text style={styles.brand}>Navalha</Text>

        {isAdm && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>ADM</Text>
          </View>
        )}
      </View>

      <Modal transparent visible={menuAberto} animationType="slide" onRequestClose={fechar}>
        <TouchableWithoutFeedback onPress={fechar}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              {/* Drawer abre pela ESQUERDA */}
              <View style={styles.drawer}>
                <Text style={styles.drawerTitle}>☰  Menu</Text>

                {isAdm ? (
                  <>
                    <MenuItem icone="📅" label="Agendamentos"     onPress={() => irPara('Home')} />
                    <MenuItem icone="👥" label="Clientes"          onPress={() => irPara('Clientes')} />
                    <View style={styles.divisor} />
                    <MenuItem icone="🚪" label="Sair"              onPress={() => irPara('__sair__')} vermelho />
                  </>
                ) : (
                  <>
                    <MenuItem icone="📅" label="Meus Agendamentos" onPress={() => irPara('Home')} />
                    <MenuItem icone="➕" label="Novo Agendamento"  onPress={() => irPara('NovoAgendamento')} />
                    <View style={styles.divisor} />
                    <MenuItem icone="🚪" label="Sair"              onPress={() => irPara('__sair__')} vermelho />
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}

function MenuItem({ icone, label, onPress, vermelho }) {
  return (
    <TouchableHighlight onPress={onPress} underlayColor="#f5f5f5" style={styles.menuItem}>
      <View style={styles.menuItemInner}>
        <Text style={styles.menuIcone}>{icone}</Text>
        <Text style={[styles.menuLabel, vermelho && styles.menuLabelVermelho]}>{label}</Text>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    gap: 10,
  },
  hamburger: { padding: 4, gap: 5 },
  linha: { width: 22, height: 2, backgroundColor: '#111', borderRadius: 2 },
  skull: { fontSize: 22 },
  brand: {
    fontSize: 20, fontWeight: '700', color: '#111',
    borderBottomWidth: 2, borderBottomColor: '#111', paddingBottom: 1,
  },
  badge: {
    marginLeft: 6, backgroundColor: '#e53935',
    borderRadius: 10, paddingHorizontal: 10, paddingVertical: 2,
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },

  // Modal
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', flexDirection: 'row' },
  drawer: {
    width: 230,
    backgroundColor: '#fff',
    paddingTop: 52,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  drawerTitle: {
    fontSize: 15, fontWeight: '700', color: '#111',
    paddingHorizontal: 20, marginBottom: 16,
  },
  divisor: { height: 1, backgroundColor: '#eee', marginVertical: 8 },
  menuItem: { paddingVertical: 14, paddingHorizontal: 20 },
  menuItemInner: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  menuIcone: { fontSize: 18 },
  menuLabel: { fontSize: 14, color: '#333', fontWeight: '500' },
  menuLabelVermelho: { color: '#e53935' },
})
