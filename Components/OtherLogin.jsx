// import React from 'react'
import React, { useState } from 'react'
import { Image, ImageBackground, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button, } from 'react-native-paper'
import { TextInput } from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
// import database from '@react-native-firebase/database';
import auth from "@react-native-firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
// import {  } from 'react-native-gesture-handler';
import {
    GoogleSignin,
    // GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';


function OtherLogin({ navigation }) {
    const GoogleRegister = async () => {
        console.log("google")

        GoogleSignin.configure({
            webClientId: '199722486764-paae0jedvochhv9tcoqgjpk3h1mc1853.apps.googleusercontent.com',
            offlineAccess: true,
            hostedDomain: '', // specifies a hosted domain restriction
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            accountName: '', // [Android] specifies an account name on the device that should be used
            googleServicePlistPath: '',
            openIdRealm: '',
            profileImageSize: 120,
        });
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const { idToken } = await GoogleSignin.signIn();
            console.log("userInfo", userInfo)
            const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredentials).then(async (user) => {
                console.log("google user", user)
                // console.log("google user uid", user.user.uid)
                // console.log("google user email", user.user.email)
                // console.log("google user name", user.user.displayName)
                // console.log("google user photoURL", user.user.photoURL)
                await AsyncStorage.setItem("userId", user.user.uid)

                await firestore().collection("Users").doc(user.user.uid).set({
                    Name: user.user.displayName,
                    Email: user.user.email,
                    key: user.user.uid,
                    ProfImg: user.user.photoURL,
                    role: "user",
                    emailVerified: user.user.emailVerified
                })
                navigation.navigate("Main")

            }).catch((err) => {
                console.log("Error", err.message)
            })
            return userInfo;
            // setState({ userInfo });
        } catch (error) {
            console.log("error", error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Snackbar.show({
                    text: "SignIn cancelled by user...",
                    duration: Snackbar.LENGTH_SHORT,
                    action: {
                        text: 'Ok',
                        textColor: 'green',
                        onPress: () => { /* Do something. */ },
                    },
                });
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Snackbar.show({
                    text: "SignIn already in progress...",
                    duration: Snackbar.LENGTH_SHORT,
                    action: {
                        text: 'Ok',
                        textColor: 'green',
                        onPress: () => { /* Do something. */ },
                    },
                });
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Snackbar.show({
                    text: "Google play services outdated or not available",
                    duration: Snackbar.LENGTH_SHORT,
                    action: {
                        text: 'Ok',
                        textColor: 'green',
                        onPress: () => { /* Do something. */ },
                    },
                });
                // play services not available or outdated
            } else {
                Snackbar.show({
                    text: error.message,
                    duration: Snackbar.LENGTH_SHORT,
                    action: {
                        text: 'Ok',
                        textColor: 'green',
                        onPress: () => { /* Do something. */ },
                    },
                });
                // some other error happened
            }
        }
    }

    return (
        <View style={styles.otherLogin}>
            <TouchableOpacity>

                <Pressable onPress={GoogleRegister}>
                    <Image source={require("../assets/Images/Google.png")} style={styles.otherLoginImg} />
                </Pressable>
            </TouchableOpacity>
            <Pressable>
                <Image source={require("../assets/Images/Facebook.png")} style={styles.otherLoginImg} />
            </Pressable>
            <Pressable>
                <Image source={require("../assets/Images/apple.png")} style={styles.otherLoginImg} />
            </Pressable>
        </View>
    )
}

export default OtherLogin

const styles = StyleSheet.create({
    otherLogin: {
        // width: `10%`
        // borderBlockColor: "black",
        // borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: 20,

    }, otherLoginImg: {
        width: 40,
        height: 40,
        display: "flex",
        margin: 15
    }
})