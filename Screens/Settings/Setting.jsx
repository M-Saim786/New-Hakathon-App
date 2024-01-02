import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, Text } from 'react-native-paper'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import auth from '@react-native-firebase/auth';
import SettingDetails from './SettingDetails'
import firestore from '@react-native-firebase/firestore';


function Setting({ navigation }) {

    const [showDetail, setshowDetail] = useState(false)
    const [combinedData, setcombinedData] = useState([])
    const [fiterDetails, setfiterDetails] = useState([])
    // const [allRquests, setallRquests] = useState([])
    const [myRequest, setmyRequest] = useState([])
    useEffect(() => {
        allDetails()

    }, [showDetail])

    const allDetails = async () => {
        const userId = await AsyncStorage.getItem("userId")

        console.log("userId", userId)

        const message = await firestore().collection('Chairman_Message').get();
        const policy = await firestore().collection('Privacy_Policy').get();
        const terms = await firestore().collection('Terms_Condition').get();
        const About = await firestore().collection('About').get();
        const Requests = await firestore().collection('Requests').get();
        // console.log("allPosts", allPosts._docs)


        const filterMyReq = Requests?._docs.filter((doc) => doc?._data?.userId == userId)


        setmyRequest(filterMyReq)
        const combinedDatas = [
            { ...filterMyReq, name: "All Requests" },
            { ...message?._docs[0]?._data, name: "Chairman Message" },
            { ...policy?._docs[0]?._data, name: "Privacy Policy" },
            { ...terms?._docs[0]?._data, name: "Terms & Conditions" },
            { ...About?._docs[0]?._data, name: "About Saylani" },
        ]
        setcombinedData(combinedDatas)


        // console.log("policy._docs", policy._docs[0]._data)
        // console.log("terms._docs", terms._docs[0]._data)
        // console.log("About._docs", About._docs[0]._data)
    }
    const [showTable, setshowTable] = useState(false)
    const gotoSettingDetail = (name) => {
        // console.log("lcikde")
        setshowDetail(true)
        const filter = combinedData.filter((item) => item.name === name)
        // console.log("daa", filter[0].name);
        if (filter[0].name == "All Requests") {
            setshowTable(true)
        }
        else {
            setfiterDetails(filter)
            console.log("filter", filter)
        }

        // setfiterDetails(filter)
    }


    const LogoutApp = async () => {

        await auth()
            .signOut()
            .then(async () => {
                console.log('User signed out!')
                await AsyncStorage.removeItem("userId")
                console.log('Navigation:', navigation); // Add this line
                navigation.replace('login');
            });
    }
    return (
        <View style={{
            padding: 10,
            // borderBlockColor: "black",
            // borderWidth: 1,
            height: `90%`,
            display: "flex",
            justifyContent: "space-between"
        }}>
            {!showDetail &&
                <View >

                    <View>
                        <Text style={styles.heading}>
                            Settings
                        </Text>
                    </View>

                    <View>
                        {combinedData.length > 0 ? combinedData?.map((item, index) => {
                            // console.log("item", item)
                            return (
                                <Pressable onPress={() => gotoSettingDetail(item.name)} key={index}>
                                    <View style={styles.settingBar} >
                                        <View>
                                            <Text style={{ fontSize: 16 }}>
                                                {item?.name}
                                            </Text>
                                        </View>
                                        <View >
                                            <Icon name="chevron-right" size={25} />
                                        </View>
                                    </View>
                                </Pressable>
                            )
                        }) : <>
                            <View style={{ marginTop: 30 }}>
                                <ActivityIndicator animating={true} color={"#8CC540"} size="large" />
                            </View>
                        </>
                        }
                    </View>

                    <View style={{
                        // position: "absolute",
                        // bottom: 60,
                        // left: 10,
                        marginTop: 150,
                        width: `100%`,
                        // borderBlockColor: "black",
                        // borderWidth: 1,
                    }}>
                        <Button icon="login" mode="contained"
                            onPress={LogoutApp}
                            contentStyle={{ flexDirection: "row" }}
                            // loading={loading ? true : false}
                            style={styles.btnStyle}>
                            Logout
                        </Button>
                    </View>
                </View>
            }
            <ScrollView style={{ height: `90%` }}>
                {showDetail &&
                    <SettingDetails
                        details={fiterDetails}
                        myRequest={myRequest}
                        navigation={navigation}
                        showTable={showTable}
                    />}
            </ScrollView>
        </View>

    )
}

export default Setting

const styles = StyleSheet.create({
    settingBar: {
        // borderBlockColor: "black",
        // borderWidth: 1,
        // display:"flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        // shadowColor: 'red',
        shadowColor: '#000',
        shadowOpacity: 16,
        shadowOffset: {
            width: 50,
            height: 50
        },
        elevation: 2,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 5
    },
    heading: {
        fontSize: 25,
        fontFamily: "Quicksand-Bold",
        margin: 10,
        textAlign: "center"

    },
    btnStyle: {
        backgroundColor: "#0574B9",
        color: "white",
        width: `100%`,
    }
})