import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { DataTable, Text } from 'react-native-paper'
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
    // console.log("details", details[0])

    const [acceptedReq, setacceptedReq] = useState([])
    const [rejectedReq, setrejectedReq] = useState([])
    const [remainReq, setremainReq] = useState([])
    const [combinedReq, setcombinedReq] = useState([])
    useEffect(() => {
        const filterRemainReq = myRequest?.filter((req) => req?._data?.status == "request")
        // setremainReq(filterRemainReq)

        // myRequest?.map((req) => {
        //     console.log("deatails Req", req?._data)
        // })

        // myRequest?._data?.map((req) => {
        //     console.log("deatails Req _data", req)
        // })

        // const filterAcceptReq = myRequest?.filter((req) => req?._data?.status !== "request" && req?._data?.status == "approve")
        // console.log("filterAcceptReq", filterAcceptReq)

        // // setacceptedReq(filterAcceptReq)
        // const filterRejectReq = myRequest?.filter((req) => req?._data?.status !== "request" && req?._data?.status == "reject")
        // // setrejectedReq(filterRejectReq)


        // const combinedData = [
        //     { ...filterRemainReq, title: "Remaining Requests", desc: "These are your pending requests" },
        //     { ...filterAcceptReq, title: "Accpeted Requests", desc: "These are your accepted requests" },
        //     { ...filterRejectReq, title: "Rejected Requests", desc: "These are your rejected requests" },
        //     // { ...About._docs[0]._data, name: "About Saylani" },
        // ]
        // setcombinedReq(combinedData)


    }, [details])


    return (
        <View style={{ padding: 10, }}>
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
                <View style={{ position: "absolute", right: 0, padding: 0 }}>
                    <Icon color="#E75C62" name='close' style={{ fontSize: 25, }} onPress={() => navigation.navigate("Settings")} />
                </View>
            </View>

            {details?.length > 0 && (<View>
                <Text style={{ marginLeft: 15, marginTop: 30, fontFamily: "Quicksand-Medium", lineHeight: 20 }}>
                    {details[0]?.desc}
                </Text>
            </View>)}

            <View style={{ borderWidth: 1, borderBlockColor: "gray", borderRadius: 5, padding: 3 }}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>ID</DataTable.Title>
                        <DataTable.Title>Req Date</DataTable.Title>
                        <DataTable.Title>Status</DataTable.Title>
                        <DataTable.Title>Req Type</DataTable.Title>
                    </DataTable.Header>
                    {
                        myRequest?.map((req, index) => {
                            // console.log("req map ", req?._data)
                            return (
                                <>
                                    <DataTable.Row>
                                        <DataTable.Cell>{++index}</DataTable.Cell>
                                        <DataTable.Cell>
                                            {req?._data?.createdAt.slice(0, 8)}
                                        </DataTable.Cell>
                                        <DataTable.Cell>
                                            <Text style={{
                                                color: `${req?._data?.status == "request" ? "gray" : req?._data?.status == "approve" ? "green" : "red"}`,
                                                // borderBlockColor: "red",
                                                borderBlockColor: `${req?._data?.status == "request" ? "gray" : req?._data?.status == "approve" ? "green" : "red"}`,
                                                borderWidth: 1,
                                                borderRadius: 5,
                                                padding: 2,
                                                paddingLeft: 4,
                                                paddingRight: 4,

                                                fontFamily: "Quicksand-Medium"
                                            }}>
                                                {req?._data?.status}
                                            </Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell>{req?._data?.type}</DataTable.Cell>
                                    </DataTable.Row>
                                </>
                            )

                        })
                    }
                </DataTable>
            </View>


        </View>
    )
}

export default SettingDetails