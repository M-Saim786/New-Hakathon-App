import React, { useState } from 'react'
import { Image, ImageBackground, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button, } from 'react-native-paper'
import { TextInput } from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
// import firestore from '@react-native-firebase/firestore';
// import database from '@react-native-firebase/database';
import auth from "@react-native-firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
// import {  } from 'react-native-gesture-handler';
import {
    GoogleSignin,
    // GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import OtherLogin from '../OtherLogin';
function Login({ navigation }) {


    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [secureText, setsecureText] = useState(true)
    const [loading, setloading] = useState(false)

    const LoginApp = async () => {
        console.log(Email, Password)
        console.log("Login")

        if (Email !== "" && Password !== "") {
            setloading(true)
            await auth().signInWithEmailAndPassword(Email, Password).then(async (res) => {
                console.log(res)
                Snackbar.show({
                    text: 'Login Success..!',
                    duration: Snackbar.LENGTH_SHORT,
                    action: {
                        text: 'Ok',
                        textColor: 'green',
                        onPress: () => { /* Do something. */ },
                    },
                });
                await AsyncStorage.setItem('userId', res.user.uid);
                // console.log("user", JSON.stringify(res.user))
                setloading(false)
                LoginCheck()

            }).catch((err) => {
                setloading(false)
                console.log(err)
                console.log(err.message)
                if (err.message.includes("auth/invalid-email")) {
                    Snackbar.show({
                        text: "Enter correct email format",
                        duration: Snackbar.LENGTH_SHORT,
                        action: {
                            text: 'Ok',
                            textColor: 'green',
                            onPress: () => { /* Do something. */ },
                        },
                    });
                }
                else if (err.message.includes("auth/weak-password")) {
                    Snackbar.show({
                        text: "Password should be at least 6 characters",
                        duration: Snackbar.LENGTH_SHORT,
                        action: {
                            text: 'Ok',
                            textColor: 'green',
                            onPress: () => { /* Do something. */ },
                        },
                    });
                }
                else if (err.message.includes("incorrect, malformed or has expired.")) {
                    Snackbar.show({
                        text: "The supplied auth credential is incorrect or expired",
                        duration: Snackbar.LENGTH_SHORT,
                        action: {
                            text: 'Ok',
                            textColor: 'green',
                            onPress: () => { /* Do something. */ },
                        },
                    });
                }
                else if (err.message.includes("auth/network-request-failed")) {
                    Snackbar.show({
                        text: "Network error check your Network connection",
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }
                else if (err.message.includes("auth/too-many-requests")) {
                    Snackbar.show({
                        text: "We have blocked all requests from this device due to unusual activity. Try again later.",
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }
                else {
                    Snackbar.show({
                        text: err.message,
                        duration: Snackbar.LENGTH_SHORT,
                        action: {
                            text: 'Ok',
                            textColor: 'green',
                            onPress: () => { /* Do something. */ },
                        },
                    });
                }
            })
        }
        else {
            Snackbar.show({
                text: "Email & Password can't be Null",
                duration: Snackbar.LENGTH_SHORT,
                action: {
                    text: 'Ok',
                    textColor: 'green',
                    onPress: () => { /* Do something. */ },
                },
            });
        }

    }

    React.useEffect(() => {
        LoginCheck()
    }, [])

    const LoginCheck = async () => {
        const userId = await AsyncStorage.getItem("userId")
        console.log("userId", userId)
        if (userId) {
            navigation.replace("Main")
        } else {
            navigation.navigate("login")
        }
    }

    // const GoogleRegister = async () => {
    //     console.log("google")

    //     GoogleSignin.configure({
    //         webClientId: '199722486764-paae0jedvochhv9tcoqgjpk3h1mc1853.apps.googleusercontent.com',
    //         offlineAccess: true,
    //         hostedDomain: '', // specifies a hosted domain restriction
    //         forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    //         accountName: '', // [Android] specifies an account name on the device that should be used
    //         googleServicePlistPath: '',
    //         openIdRealm: '',
    //         profileImageSize: 120,
    //     });
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         const { idToken } = await GoogleSignin.signIn();
    //         console.log("userInfo", userInfo)
    //         const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
    //         await auth().signInWithCredential(googleCredentials);
    //         navigation.navigate("Main")
    //         return userInfo;
    //         // setState({ userInfo });
    //     } catch (error) {
    //         console.log("error", error)
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             Snackbar.show({
    //                 text: "SignIn cancelled by user...",
    //                 duration: Snackbar.LENGTH_SHORT,
    //                 action: {
    //                     text: 'Ok',
    //                     textColor: 'green',
    //                     onPress: () => { /* Do something. */ },
    //                 },
    //             });
    //             // user cancelled the login flow
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             Snackbar.show({
    //                 text: "SignIn already in progress...",
    //                 duration: Snackbar.LENGTH_SHORT,
    //                 action: {
    //                     text: 'Ok',
    //                     textColor: 'green',
    //                     onPress: () => { /* Do something. */ },
    //                 },
    //             });
    //             // operation (e.g. sign in) is in progress already
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             Snackbar.show({
    //                 text: "Google play services outdated or not available",
    //                 duration: Snackbar.LENGTH_SHORT,
    //                 action: {
    //                     text: 'Ok',
    //                     textColor: 'green',
    //                     onPress: () => { /* Do something. */ },
    //                 },
    //             });
    //             // play services not available or outdated
    //         } else {
    //             Snackbar.show({
    //                 text: error.message,
    //                 duration: Snackbar.LENGTH_SHORT,
    //                 action: {
    //                     text: 'Ok',
    //                     textColor: 'green',
    //                     onPress: () => { /* Do something. */ },
    //                 },
    //             });
    //             // some other error happened
    //         }
    //     }
    // }

    return (
        <ImageBackground source={require("../../assets/Images/bgImg.png")} style={{ width: `100%`, height: `100%`, }} >
            <View style={styles.loginDiv}>
                <View style={styles.innerDiv}>
                    <View>
                        <Text style={styles.heading}>
                            Login Here..!
                        </Text>
                    </View>
                    <View style={styles.mainDiv}>

                        <TextInput
                            label="Email"
                            mode='outlined'
                            placeholder='Enter Your Email'
                            value={Email}
                            onChangeText={text => setEmail(text)}
                            right={<TextInput.Icon icon="email" />}
                        />
                        <TextInput
                            label="Password"
                            placeholder='Enter Your Password'
                            mode='outlined'
                            right={secureText ?
                                <TextInput.Icon icon="eye" onPress={() => setsecureText(false)} /> :
                                <TextInput.Icon icon="eye-off" onPress={() => setsecureText(true)} />
                            }
                            secureTextEntry={secureText}
                            style={{ marginTop: 20 }}
                            value={Password}
                            onChangeText={text => setPassword(text)}
                        />
                    </View>

                    <OtherLogin navigation={navigation} />
                    <View style={styles.signUpHere}>
                        <Text style={{ marginRight: 10, fontFamily: "Quicksand-Medium", color: "black" }}>
                            Don't have account
                        </Text>
                        <Pressable
                            onPress={() => navigation.replace("signUp")}
                        >
                            <Text style={{
                                color: "#8CC445",
                                // color: "red",
                                fontFamily: "Quicksand-Bold",
                                // fontWeight: "bold"
                            }}>
                                Sign Up here
                            </Text>
                        </Pressable>
                    </View>

                    <View>
                        <Button icon="login" mode="contained"
                            onPress={LoginApp}
                            contentStyle={{ flexDirection: "row-reverse" }}
                            loading={loading ? true : false}
                            style={styles.BtnStyle}>
                            Login
                        </Button>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Login


const styles = StyleSheet.create({
    loginDiv: {
        padding: 5,
        display: "flex",
        justifyContent: "center",
        fontFamily: "Outfit",
        // borderBlockColor: "black",
        // borderWidth: 1,
        height: `100%`,
        // fontFamily: "Outfit-VariableFont_wght"
    },
    innerDiv: {
        // borderBlockColor: "black",
        // borderWidth: 1,
        borderTopEndRadius: 20,
        borderBottomLeftRadius: 20,
        height: `70%`,
        // fontFamily: "Outfit-VariableFont_wght"
        // boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px`,
        // backgroundColor: "white",
        // zIndex:`-1px`
        // backgroundColor: "#ebc3d9"
    },
    heading: {
        fontSize: 25,
        textAlign: "center",
        fontFamily: "Quicksand-Medium",
        color: "black"
        // fontWeight: "bold"
    },
    mainDiv: {
        marginTop: `20%`
    },
    otherLogin: {
        // width: `10%`
        // borderBlockColor: "black",
        // borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: 20,

    },
    otherLoginImg: {
        width: 40,
        height: 40,
        display: "flex",
        margin: 15
    }
    , signUpHere: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        // borderBlockColor: "black",
        // borderWidth: 1,
    }, BtnStyle: {
        marginTop: 25,
        color: "white",
        backgroundColor: "#0574B9",
        alignItems: "center",
        fontFamily: "Quicksand-Medium",
    }

})