import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from './Drawer';
import BottomNav from './BottomNav';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator()
function GotoWhere() {
    const [Role, setRole] = useState("")
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        const userId = await AsyncStorage.getItem("userId")
        await firestore().collection('User').doc((userId)).get().then(async (res) => {
            await AsyncStorage.setItem("role", res?._data?.role)
            setRole(res?._data?.role)
            console.log("Role", Role)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <Stack.Navigator>
            {Role == "admin" ?
                <>
                    <Stack.Screen
                        name="Drawer"
                        component={DrawerNavigation}
                        options={{ headerShown: false }}
                    />
                </>
                :
                <>
                    <Stack.Screen
                        name="Bottom"
                        component={BottomNav}
                        options={{ headerShown: false }}
                    />
                </>
            }
        </Stack.Navigator>
    )
}

export default GotoWhere