import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import DetailsCard from './DetailsCard'

const detailsCards = [
    {
        title: "Remaining Requests",
        desc: "these are ytour pending requwetd"
    },
    {
        title: "Responded Requests",
        desc: "these are ytour pending requwetd"
    },
    {
        title: "Rejected Requests",
        desc: "these are ytour pending requwetd"
    },

]


function SettingDetails({ navigation, details, myRequest }) {
    // console.log("myRequest", myRequest)
    console.log("details", details[0])

    const [acceptedReq, setacceptedReq] = useState([])
    const [rejectedReq, setrejectedReq] = useState([])
    const [remainReq, setremainReq] = useState([])
    const [combinedReq, setcombinedReq] = useState([])
    useEffect(() => {
        const filterRemainReq = myRequest?.filter((req) => req?._data?.status == "request")
        // setremainReq(filterRemainReq)

        myRequest?.map((req) => {
            console.log("deatails Req", req?._data)
        })

        const filterAcceptReq = myRequest?.filter((req) => req?._data?.status !== "request" && req?._data?.status == "approve")
        console.log("filterAcceptReq", filterAcceptReq)

        // setacceptedReq(filterAcceptReq)
        const filterRejectReq = myRequest?.filter((req) => req?._data?.status !== "request" && req?._data?.status == "reject")
        // setrejectedReq(filterRejectReq)


        const combinedData = [
            { ...filterRemainReq, title: "Remaining Requests", desc: "These are your pending requests" },
            { ...filterAcceptReq, title: "Accpeted Requests", desc: "These are your accepted requests" },
            { ...filterRejectReq, title: "Rejected Requests", desc: "These are your rejected requests" },
            // { ...About._docs[0]._data, name: "About Saylani" },
        ]
        setcombinedReq(combinedData)


    }, [details])


    return (
        <View style={{ padding: 20, }}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",

            }}>
                <View style={{ textAlign: "center" }}>
                    <Text style={{ fontSize: 25, fontFamily: "Quicksand-Bold" }}>
                        {details[0]?.name}
                    </Text>
                </View>
                <View style={{ position: "absolute", right: 0, padding: 10 }}>
                    <Icon color="#E75C62" name='close' style={{ fontSize: 25, }} onPress={() => navigation.navigate("Settings")} />
                </View>
            </View>

            {details?.length > 0 && (<View>
                <Text style={{ marginLeft: 15, marginTop: 30, fontFamily: "Quicksand-Medium" }}>
                    {details[0]?.desc}
                </Text>
            </View>)}

            {/* {} */}
            {/* {combinedReq.length > 0 ? combinedReq?.map((card) => {
                console.log("card", card[0])
                console.log("card", card?._data)
                return (
                    <DetailsCard heading={card.title} remainReq={remainReq.length} desc={card?.desc}
                        reqCount={card?._data?.length}
                    />
                )
            }) : (
                <View>
                    <Text style={{ marginLeft: 15, marginTop: 30, fontFamily: "Quicksand-Medium" }}>
                        {details?.desc}
                    </Text>
                </View>
            )} */}
        </View>
    )
}

export default SettingDetails