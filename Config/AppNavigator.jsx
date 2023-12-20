import 'react-native-gesture-handler';
import React from 'react';
// import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../Components/SplashScreen';
import Login from '../Components/Login';
import SignUp from '../Components/SignUp';
import GotoWhere from './GotoWhere';
import Form from '../Components/Form';

const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen
                    name="splashScreen"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                {/* <Stack.Screen
                    name="appIntro"
                    component={AppIntro}
                    options={{ headerShown: false }}
                /> */}
                <Stack.Screen
                    name="login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="signUp"
                    component={SignUp}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Main"
                    component={GotoWhere}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Form"
                    component={Form}
                    options={{ headerShown: false }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;