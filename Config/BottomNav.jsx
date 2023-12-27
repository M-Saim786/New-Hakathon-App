
// // ----------- STACK NAVIGATION -------------------

// // import 'react-native-gesture-handler';
// // import React from 'react';
// // // import { View, Text } from 'react-native';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import Home from './Components/Home';
// // import SplashScreen from './Components/SplashScreen';


// // const Stack = createNativeStackNavigator();

// // function App() {
// //     return (
// //         <NavigationContainer>
// //             <Stack.Navigator>
// //                 <Stack.Screen
// //                     name="splashScreen"
// //                     component={SplashScreen}
// //                     options={{ headerShown: false }}
// //                 />
// //                 <Stack.Screen
// //                     name="Home"
// //                     component={Home}
// //                     options={{ title: 'Overview' }}
// //                 />
// //             </Stack.Navigator>
// //         </NavigationContainer>
// //     );
// // }

// // export default App;

// // ----------- Bottom Drawer Navigatoin Start's here



// import 'react-native-gesture-handler';
// import * as React from 'react';
// import { Button, Pressable, View } from 'react-native';
// // import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import AntDesign from "react-native-vector-icons/AntDesign"
// // import { Animated, Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
// // import 'react-native-gesture-handler';
// // import { useRef } from 'react';
// import Home from '../Components/Home';
// import About from '../Components/About';
// import Contact from '../Components/Contact';
// import Profile from '../Components/Profile';
// import Setting from '../Components/Setting';


// // function HomeScreen({ navigation }) {
// //     const LoginCheck = async () => {
// //         const userId = await AsyncStorage.getItem("userId")
// //         if (userId) {
// //             navigation.navigate("Main")
// //         } else {
// //             navigation.navigate("login")
// //         }
// //     }
// //     const Logout = async () => {
// //         console.log("logout")
// //         await AsyncStorage.removeItem("userId")
// //         // props.navigation.navigate("login")
// //         LoginCheck()
// //     }
// //     return (
// //         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// //             <Button
// //                 onPress={() => Logout()}
// //                 title="Go to notifications"
// //             />
// //         </View>
// //     );
// // }

// // function NotificationsScreen({ navigation }) {
// //     return (
// //         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// //             <Button onPress={() => navigation.goBack()} title="Go back home" />
// //         </View>
// //     );
// // }

// // const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();

// export const NavItems = [
//     {
//         icon: "home",
//         name: "Home",
//         value: "Home",
//         path: "home",
//         component: Home
//     },
//     {
//         icon: "profile",
//         name: "About",
//         value: "About",
//         path: "home",
//         component: About
//     },
//     {
//         icon: "phone",
//         name: "Contact",
//         value: "Contact",
//         path: "home",
//         component: Contact
//     },
//     {
//         icon: "user",
//         name: "Profile",
//         value: "Profile",
//         path: "home",
//         component: Profile
//     },
//     {
//         icon: "key",
//         name: "Setting",
//         value: "Setting",
//         path: "home",
//         component: Setting
//     },
// ]

// export default function BottomNavSimple() {
//     return (

//         <Tab.Navigator
//             screenOptions={{
//                 showLabel: false,
//                 // Floating Tab Bar...
//                 tabBarStyle: {
//                     backgroundColor: 'white',
//                     position: 'absolute',
//                     bottom: 20,
//                     marginHorizontal: 10,
//                     // Max Height...
//                     height: 60,
//                     borderRadius: 10,
//                     // Shadow...
//                     shadowColor: '#000',
//                     shadowOpacity: 0.06,
//                     shadowOffset: {
//                         width: 5,
//                         height: 10
//                     },
//                     paddingHorizontal: 10,
//                 },
//                 // tabBarActiveBackgroundColor: "red"
//             }}
//             tabBarButton={true}     >
//             {items.map((item) => {
//                 return (

//                     <Tab.Screen options={{
//                         tabBarIcon: ({ focused }) =>
//                             <AntDesign name={item.icon} size={25} color={focused ? "#007FFF" : "gray"} />,

//                         tabBarLabel: ({ focused }) =>
//                             <Text style={{
//                                 display: `${focused ? "flex" : "none"}`, marginTop: -10,
//                                 color: `${focused ? "#007FFF" : "gray"}`,
//                                 fontSize: 12
//                             }}
//                             >
//                                 {focused ? item.name : ""}
//                                 {/* Hoome */}
//                             </Text>,
//                         headerShown: false
//                     }}
//                         name={item.name} component={item.component}

//                     />
//                 )
//             })

//             }
//             {/* <Tab.Screen name="Settings"
//                 // component={NotificationsScreen}
//                 options={{ tabBarBadge: 3 }}

//             /> */}

//         </Tab.Navigator>

//         // </NavigationContainer>
//     );
// }

// // function getWidth() {
// //     let width = Dimensions.get("window").width

// //     // Horizontal Padding = 20...
// //     width = width - 80

// //     // Total five Tabs...
// //     return width / 5
// // }

