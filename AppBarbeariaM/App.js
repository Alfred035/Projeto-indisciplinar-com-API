import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from './src/context/AuthContext'
import CadastroScreen        from './src/screens/CadastroScreen'
import ClientesScreen        from './src/screens/ClientesScreen'
import HomeScreen            from './src/screens/HomeScreen'
import LoginBarbeiroScreen   from './src/screens/LoginBarbeiroScreen'
import LoginScreen           from './src/screens/LoginScreen'
import NovoAgendamentoScreen from './src/screens/NovoAgendamentoScreen'
import SplashScreen          from './src/screens/SplashScreen'
import WelcomeScreen         from './src/screens/WelcomeScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash"            component={SplashScreen} />
          <Stack.Screen name="Welcome"           component={WelcomeScreen} />
          <Stack.Screen name="Login"             component={LoginScreen} />
          <Stack.Screen name="LoginBarbeiro"     component={LoginBarbeiroScreen} />
          <Stack.Screen name="Cadastro"          component={CadastroScreen} />
          <Stack.Screen name="Home"              component={HomeScreen} />
          <Stack.Screen name="Clientes"          component={ClientesScreen} />
          <Stack.Screen name="NovoAgendamento"   component={NovoAgendamentoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}
