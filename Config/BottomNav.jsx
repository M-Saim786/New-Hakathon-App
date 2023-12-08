
// ----------- STACK NAVIGATION -------------------

// import 'react-native-gesture-handler';
// import React from 'react';
// // import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Home from './Components/Home';
// import SplashScreen from './Components/SplashScreen';


// const Stack = createNativeStackNavigator();

// function App() {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator>
//                 <Stack.Screen
//                     name="splashScreen"
//                     component={SplashScreen}
//                     options={{ headerShown: false }}
//                 />
//                 <Stack.Screen
//                     name="Home"
//                     component={Home}
//                     options={{ title: 'Overview' }}
//                 />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }

// export default App;

// ----------- Bottom Drawer Navigatoin Start's here



import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
function HomeScreen({ navigation }) {
    const LoginCheck = async () => {
        const userId = await AsyncStorage.getItem("userId")
        if (userId) {
            navigation.navigate("Main")
        } else {
            navigation.navigate("login")
        }
    }
    const Logout = async () => {
        console.log("logout")
        await AsyncStorage.removeItem("userId")
        // props.navigation.navigate("login")
        LoginCheck()
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => Logout()}
                title="Go to notifications"
            />
        </View>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

// const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
export default function BottomNav() {
    return (
        // Drawer Navigation
        // <NavigationContainer>
        //     //     <Drawer.Navigator initialRouteName="Home">
        // //         <Drawer.Screen name="Home" component={HomeScreen} />
        // //         <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        // //     </Drawer.Navigator>
        // </NavigationContainer>
        // Bottom Navigation
        // <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={NotificationsScreen} />
        </Tab.Navigator>
        // </NavigationContainer>
    );
}