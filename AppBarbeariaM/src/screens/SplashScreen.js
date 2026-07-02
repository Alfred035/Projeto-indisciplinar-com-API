import { useEffect } from 'react'
import { Animated, Easing, StyleSheet, Text, View } from 'react-native'

export default function SplashScreen({ navigation }) {
  const largura = new Animated.Value(0)

  useEffect(() => {
    Animated.timing(largura, {
      toValue: 1,
      duration: 2200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      navigation.replace('Welcome')
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Text style={styles.skull}>💀</Text>
        <Text style={styles.brand}>Navalha</Text>
      </View>
      <View style={styles.barraFundo}>
        <Animated.View
          style={[
            styles.barraFill,
            { width: largura.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) },
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  skull: { fontSize: 36 },
  brand: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111',
    borderBottomWidth: 2,
    borderBottomColor: '#111',
    paddingBottom: 2,
    letterSpacing: 1,
  },
  barraFundo: {
    width: 180,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    marginTop: 28,
    overflow: 'hidden',
  },
  barraFill: { height: '100%', backgroundColor: '#111', borderRadius: 2 },
})
