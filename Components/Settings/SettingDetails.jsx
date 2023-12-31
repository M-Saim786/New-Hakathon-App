import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

function SettingDetails({ navigation, details }) {
    return (
        <View style={{ padding: 20 }}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",

            }}>
                <View style={{ textAlign: "center" }}>
                    <Text style={{ fontSize: 25, fontFamily: "Quicksand-Bold" }}>
                        {details?.name}
                    </Text>
                </View>
                <View style={{ position: "absolute", right: 0, padding: 10 }}>
                    <Icon color="#E75C62" name='close' style={{ fontSize: 25, }} onPress={() => navigation.navigate("Settings")} />
                </View>
            </View>

            <View>
                <Text style={{ marginLeft: 15, marginTop: 30, fontFamily: "Quicksand-Medium" }}>
                    {details?.desc}
                </Text>
            </View>
        </View>
    )
}

export default SettingDetails