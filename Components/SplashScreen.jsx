import React, { useState } from 'react'
import { Text } from 'react-native-paper'
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
        <ImageBackground source={require("../assets/Images/bgImg.png")} style={{ height: `100%`, width: `100%`, }}>
            <View style={{ height: `100%`, display: "flex", justifyContent: "space-around", position: "relative", alignItems: "center", }}>
                <View>
                    <View>
                        <Image source={require("../assets/Images/logo.png")} />
                        <View>
                            <Text style={{ color: "black", textAlign: "center", fontFamily: "Quicksand-Bold" }}>
                                Donation App
                            </Text>
                        </View>
                    </View>
                    <View style={styles.headingDiv}>
                        <Text style={styles.heading}>
                            Welc
                        </Text>
                        <Text style={styles.heading}>
                            ome..!
                        </Text>
                    </View>

                </View>
                {showLoader && <ActivityIndicator animating={true} color={"#8CC540"} size="large" />}
            </View>
        </ImageBackground >

    )
}

export default SplashScreen

const styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        fontFamily: "Quicksand-Bold",
        color: "#0574B9"
        // fontWeight: "bold"
    },
    headingDiv: {
        display: "flex",
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "center",
        // borderBlockColor: "black",
        // borderWidth: 1
    }
})