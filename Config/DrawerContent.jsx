import React, { useEffect } from 'react'
import { View, StyleSheet, Image, ImageBackground } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import firestore from '@react-native-firebase/firestore';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Drawer,
    Text,
} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'
const DrawerContentMain = [
    {
        name: "home",
        title: "Home",
        color: "gray",
        path: "Home"
    },
    {
        name: "gamepad-down",
        // name: "",
        title: "About",
        color: "gray",
        path: "About"
    },
    {
        name: "phone",
        // name: "",
        title: "Contact",
        color: "gray",
        path: "Contact"
    },
    // {
    //     name: "wheel-barrow",
    //     title: "Setting",
    //     color: "gray",
    //     path: "Home"
    // },
    {
        name: "account",
        title: "Profile",
        color: "gray",
        path: "Profile"
    },
    {
        name: "login",
        title: "Logout",
        color: "gray",
        path: "Home"
    }
]
function DrawerContent(props) {

    useEffect(() => {
        LoginCheck()
    }, [])

    const LoginCheck = async () => {
        const userId = await AsyncStorage.getItem("userId")
        if (userId) {
            props.navigation.navigate("Main")
        } else {
            props.navigation.navigate("login")
        }
    }
    const Logout = async () => {
        // console.log("logout")
        await auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        await AsyncStorage.removeItem("userId")
        // props.navigation.navigate("login")
        LoginCheck()
    }

    const [Profile, setProfile] = React.useState([])
    const [ProfImg, setProfImg] = React.useState(null)
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const userId = await AsyncStorage.getItem("userId")
        await firestore().collection('Users').doc((userId)).get().then(async (res) => {
            await AsyncStorage.setItem("role", res?._data?.role)
            console.log("userDATA", res?._data?.role)
            setProfile(res?._data)
            setProfImg(res?._data?.Img)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <View style={{
            flex: 1,
        }}>
            <DrawerContentScrollView {...props}>
                <View>
                    <View>
                        <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMGxfpI1Xx_KApN8u-gOQg91QOV5tcgUa25w&usqp=CAU' }} style={{ width: '100%', height: 230, marginTop: '-2%' }}>
                            <Avatar.Image
                                size={80}
                                color="white"
                                source={{
                                    uri: `${!ProfImg ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRspS_ukYMLvsWX4vPkC7PcTiCqJYIASaWapw&usqp=CAU" : ProfImg}`
                                }}
                                style={{ resizeMode: 'contain', marginTop: '12%', marginLeft: "10%" }} />

                            <View style={styles.drawerContent}>
                                <View style={styles.userInfoSection}>

                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                            <Title style={styles.title}>{Profile ? Profile?.Name : "Name"}</Title>
                                            <Caption style={styles.caption}>{Profile ? Profile?.Email : "Email"}</Caption>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>

                    <Drawer.Section style={styles.drawerSection} >
                        {
                            DrawerContentMain.map((v, i) => {
                                return (
                                    v.title !== "Logout" && <Drawer.Item
                                        key={i}
                                        icon={v.name}
                                        label={v.title}
                                        onPress={() => { props.navigation.navigate(v.path) }}
                                        style={styles.DrawerItem}
                                    />
                                )
                            })
                        }
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                {
                    DrawerContentMain.map((v, i) => {
                        return (
                            v.title === "Logout" &&
                            <Drawer.Item
                                icon="logout"
                                label={v.title}
                                key={i}
                                onPress={() => Logout()}
                                style={styles.logoutBtn}
                            />
                        )
                    })
                }
            </Drawer.Section>
        </View>
    )
}

export default DrawerContent


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 10,
    },
    Text: {
        fontWeight: 'bold',
        color: 'red'
    },
    title: {
        fontSize: 20,
        // fontWeight: 'bold',
        color: 'white',
        marginTop: '0%',
        // marginLeft: '10%',
        fontFamily: "Quicksand-Bold"
    },
    caption: {
        fontSize: 15,
        marginTop: '-3%',
        // fontWeight: 'bold',
        color: 'white',
        marginLeft: '0%',
        fontFamily: "Quicksand-Bold"
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 10,
        fontFamily: "Quicksand-Bold"
        // borderBlockColor: "black",
        // borderWidth: 1,
        // height: `100%`

    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    DrawerItem: {
        fontFamily: "Quicksand-Bold"
    },
    logoutBtn: {
        borderBlockColor: "#99FFFF",
        borderWidth: 3,
        padding: "0px 10px",
        height: 40,
    }
});