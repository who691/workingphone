import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Login';
import DetailScreen from './src/DetailScreen';
import Dashboard from './src/Dashboard';

const Stack=createStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
<Stack.Navigator initialRouteName='login'>
  <Stack.Screen name='login' options={{headerShown:false}} component={Login}/>
  <Stack.Screen name='detail' options={{headerShown:false}} component={DetailScreen}/>
  <Stack.Screen name='dash' options={{headerShown:false}} component={Dashboard}/>
</Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});