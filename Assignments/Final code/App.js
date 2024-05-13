import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './screens/LoginPage'; 
import RegistrationPage from './screens/RegistrationPage';
import HomePage from './screens/HomePage';
import { StyleSheet } from 'react-native';
import ProfilePage from './screens/ProfilePage';
import Profilenavigation from './Navigations/Profilenavigation';
import LocationPage from './src/component/Location';
import 'bootstrap/dist/css/bootstrap.min.css';
import CandyCards from './src/component/CandyCards';
import CandyReview from './src/component/CandyReview';
import Camera from './src/component/camera';
import { AuthProvider } from './src/component/AuthContext';
import Logout from './src/component/Logout';


const Stack = createStackNavigator();

function App() {
  return (
  <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage" screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="LoginPage" component={LoginPage}/>
        <Stack.Screen name="RegistrationPage" component={RegistrationPage} />     
        <Stack.Screen name="Profile" component={ProfilePage} /> 
        <Stack.Screen name="Profilenav" component={Profilenavigation} />
        <Stack.Screen name="Location" component={LocationPage} />
        <Stack.Screen name="Candies" component={CandyCards} />
        <Stack.Screen name="Review" component={CandyReview} options={{ title: 'Review Candy' }} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name= "Logout" component={Logout}/>
      </Stack.Navigator>
    </NavigationContainer>

  </AuthProvider>
    
    
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center'
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58
  },
  image: {
    width: 415,
    height: 830,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 2 / 3,
    alignItems: 'center',
  }

});


export default App;


