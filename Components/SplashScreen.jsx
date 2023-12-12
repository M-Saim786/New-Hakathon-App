import React, { useState } from 'react'
import { Button, Text } from 'react-native-paper'
import { Image, ImageBackground, StyleSheet, View, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, MD2Colors } from 'react-native-paper'; function SplashScreen({ navigation }) {
    const [showLoader, setShowLoader] = useState(false)
    React.useEffect(() => {
        setTimeout(async () => {
            setShowLoader(true)
            setTimeout(() => {
                navigateTo()
            }, 1000);
        }, 1000)
    }, [])

    const navigateTo = async () => {
        let data = await AsyncStorage.getItem("user")
        console.log(data)
        if (data == "true") {
            navigation.replace("login")
        }
        else {
            await AsyncStorage.setItem("user", "true")
            navigation.replace("login")
            // navigation.replace("appIntro")
        }
    }


    return (
        // <ImageBackground source={require("../assets/Images/signUpImg.png")} style={{ height: `100%`, width: `100%` }}>
        <View style={{ height: `100%`, display: "flex", justifyContent: "space-around", position: "relative", alignItems: "center", }}>
            <View>
                <View>
                    <Image source={require("../assets/Images/logo.png")} />
                </View>
                <View>
                    <Text style={styles.heading}>
                        Welcome..!
                    </Text>
                </View>

            </View>
            {/* <View style={{ width: "100%" }}> */}


            {showLoader && <ActivityIndicator animating={true} color={"#007FFF"} size="large" />}
            {/* <View style={{ width: `100%`, padding: 10 }}>
                    <Button icon="chevron-right"
                        textColor='white'
                        contentStyle={{ flexDirection: 'row-reverse' }}
                        style={{
                            backgroundColor: "#2B29A6", color: "white",
                            alignItems: "center"
                         }} onPress={() => navigation.replace("login")}>
                        Get Started
                    </Button>

                </View> */}
            {/* </View> */}
        </View>
        // {/* </ImageBackground > */}

    )
}

export default SplashScreen

const styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        textAlign: "center",
        fontFamily: "DancingScript-Bold",
        marginTop: 20
        // fontWeight: "bold"
    },
})