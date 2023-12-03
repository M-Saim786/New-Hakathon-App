import React, { useEffect } from 'react'
import { View, StyleSheet, Image, ImageBackground } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import Icon1 from 'react-native-vector-icons/AntDesign'
// import { DrawerContentScrollView } from '@react-navigation/drawer'
import firestore from '@react-native-firebase/firestore';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
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
        await AsyncStorage.removeItem("userId")
        // props.navigation.navigate("login")
        LoginCheck()
    }

    const [Profile, setProfile] = React.useState([])
    const [ProfImg, setProfImg] = React.useState(null)
    useEffect(() => {
        //   const dbref = 
        getData()
    }, [])
    const getData = async () => {
        const userId = await AsyncStorage.getItem("userId")
        // setUserId(userId)
        // console.log(userId)
        // let ID =JSON.parse(userId)
        // const userDocument = 
        await firestore().collection('User').doc((userId)).get().then((res) => {
            console.log("userDATA", res?._data?.Email)
            setProfile(res?._data)
            setProfImg(res?._data?.Img)
            // setName(res?._data?.Name)
            // setEmail(res?._data?.Email)
            // setPassword(res?._data?.Password)
            console.log("Profile", Profile)
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
                                            <Title style={styles.title}>{Profile ? Profile?.Name : "Name"}  </Title>
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
                                    ++i < 5 && <Drawer.Item
                                        key={i}
                                        icon={v.name}
                                        label={v.title}
                                        onPress={() => { props.navigation.navigate(v.path) }}
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
                            ++i > 4 &&
                            // <Drawer.Item
                            //  
                            //     style={{ color: "red" }}
                            //     icon="gear"

                            // // 
                            // />
                            <Drawer.Item
                                // style={{ color: "red" }}
                                icon="logout"
                                title={() => (
                                    <Text style={{ color: "white" }}>
                                        v.title
                                    </Text>
                                )}
                                // label={() => {
                                //     return (
                                //         <Text style={{ color: "white" }}>
                                //             Llogut
                                //         </Text>
                                //     )
                                // }}
                                label={v.title}
                                key={i}
                                onPress={() => Logout()}
                                // theme={{ colors: { primary: "green" } }}
                                style={{
                                    backgroundColor: "#97c0fc",
                                    padding: "0px 10px",
                                    height: 40,
                                    // color: "white"
                                }}
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
        fontWeight: 'bold',
        color: 'white',
        marginTop: '-5%',
        marginLeft: '10%'
    },
    caption: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: '10%'
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
});