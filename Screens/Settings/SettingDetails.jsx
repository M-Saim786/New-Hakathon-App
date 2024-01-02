import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { DataTable, Text } from 'react-native-paper'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
// import DetailsCard from './DetailsCard'


function SettingDetails({ navigation, details, myRequest, showTable }) {

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

            {showTable && (<View style={{ borderWidth: 1, borderBlockColor: "gray", borderRadius: 5, padding: 3 }}>
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
                                    <DataTable.Row style={{ marginTop: 5, marginBottom: 5 }}>
                                        <DataTable.Cell>{++index}</DataTable.Cell>
                                        <DataTable.Cell>
                                            <Text style={{ width: "40px" }}>

                                                {req?._data?.createdAt.slice(0, 8) + req?._data?.createdAt.slice(9, 18)}
                                            </Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell>
                                            <Text style={{
                                                color: `${req?._data?.status == "request" ? "gray" : req?._data?.status == "approve" ? "green" : "red"}`,
                                                // borderBlockColor: "red",

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
            </View>)}


        </View>
    )
}

export default SettingDetails