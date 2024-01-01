import React, { useState } from 'react'
import { ImageBackground, StyleSheet, View, Pressable, Image } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { TextInput } from 'react-native-paper';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { GoogleSignin, statusCodes, } from '@react-native-google-signin/google-signin';
import OtherLogin from '../OtherLogin';
// import { AsyncStorage } from "react-native"
function SignUp({ navigation }) {


    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [loading, setloading] = useState(false)
    const [secureText, setsecureText] = useState(true)

    const Sign_Up = async () => {
        console.log("Sign Up")
        if (Email !== "" && Password !== "" && Name !== "") {
            setloading(true)
            await auth().createUserWithEmailAndPassword(Email, Password).then(async (res) => {
                console.log(res)
                console.log(res.user.uid)
                // const key = firestore().collection("User").doc().id
                await AsyncStorage.setItem("userId", res.user.uid)
                firestore().collection("Users").doc(res.user.uid).set({
                    Name: Name,
                    Email: Email,
                    Password: Password,
                    key: res.user.uid,
                    role: "user"
                })
                Snackbar.show({
                    text: 'SignUp Success..!',
                    duration: Snackbar.LENGTH_SHORT,
                    action: {
                        text: 'Ok',
                        textColor: 'green',
                        onPress: () => { /* Do something. */ },
                    },
                });
                setloading(false)
                LoginCheck()
            }).catch((err) => {
                console.log(err.message)
                setloading(false)
                if (err.message == "[auth/invalid-email] The email address is badly formatted.") {
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
                else if (err.message == "[auth/weak-password] The given password is invalid. [ Password should be at least 6 characters ]") {
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
                else if (err.message == "[auth/email-already-in-use] The email address is already in use by another account.") {
                    Snackbar.show({
                        text: "The email address is already in use by another account.",
                        duration: Snackbar.LENGTH_SHORT,
                        action: {
                            text: 'Ok',
                            textColor: 'green',
                            onPress: () => { /* Do something. */ },
                        },
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
                text: "Required Fields can't be Null",
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
        if (userId) {
            navigation.replace("Main")
        } else {
            navigation.navigate("signUp")
        }
    }


    return (
        <ImageBackground source={require("../../assets/Images/bgImg.png")} style={{ width: `100%`, height: `100%`, }} >

            <View style={styles.loginDiv} >
                <View style={styles.innerDiv}>
                    <View>
                        <Text style={styles.heading}>
                            Sign Up..!
                        </Text>
                    </View>
                    <View style={styles.mainDiv}>
                        <TextInput
                            label="Name"
                            mode='outlined'
                            placeholder='Enter Your Name'
                            value={Name}
                            onChangeText={text => setName(text)}
                            right={<TextInput.Icon icon="account" />}

                        />
                        <TextInput
                            label="Email"
                            mode='outlined'
                            placeholder='Enter Your Email'
                            value={Email}
                            onChangeText={text => setEmail(text)}
                            right={<TextInput.Icon icon="email" />}
                            style={{ marginTop: 20 }}
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
                        <Text style={{ marginRight: 10, fontFamily: "Quicksand-Medium" }}>
                            Don't have account
                        </Text>
                        <Pressable
                            onPress={() => navigation.navigate("login")}
                        >
                            <Text style={{
                                color: "#8EC647",
                                fontFamily: "Quicksand-Bold"
                            }}>
                                Login here
                            </Text>
                        </Pressable>
                    </View>

                    <View>
                        <Button icon="login" mode="contained"
                            onPress={() => Sign_Up()}
                            loading={loading ? true : false}
                            style={{ marginTop: 25, color: "white", backgroundColor: "#0574B9" }}>
                            Sign Up
                        </Button>
                    </View>
                </View>
            </View>
        </ImageBackground>

    )
}

export default SignUp

const styles = StyleSheet.create({
    loginDiv: {
        padding: 5,
        display: "flex",
        justifyContent: "center",
        fontFamily: "Outfit",
        // borderBlockColor: "black",
        // borderWidth: 1,
        height: `100%`
    },
    innerDiv: {
        // borderBlockColor: "black",
        // borderWidth: 1,
        borderTopEndRadius: 20,
        borderBottomLeftRadius: 20,
        height: `80%`,
    },
    heading: {
        fontSize: 25,
        textAlign: "center",
        fontFamily: "Quicksand-Medium",
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
    }

})