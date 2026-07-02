import { StyleSheet, Text, TextInput, View } from 'react-native'

export default function CampoInput({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType }) {
  return (
    <View style={styles.grupo}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#bbb"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  grupo: { marginBottom: 16 },
  label: { fontSize: 12, color: '#555', marginBottom: 4 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    paddingVertical: 7,
    fontSize: 13,
    color: '#111',
  },
})
