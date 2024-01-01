import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

function DetailsCard({ heading, remainReq, desc,reqCount }) {
    return (
        <>
            <View style={styles.main}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>

                        <Text style={styles.heading}>
                            {heading}
                        </Text>
                    </View>
                    <View>
                        <Text>
                            iconsF
                        </Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <View>
                        <Text >
                            {desc}
                        </Text>
                    </View>
                    <View>
                        <Text>
                            {reqCount}
                        </Text>
                    </View>
                </View>
            </View>
        </>
    )
}

export default DetailsCard

const styles = StyleSheet.create({
    main: {
        marginTop: 20,
        padding: 5,
        borderBlockColor: "gray",
        borderWidth: 1,
        borderRadius: 5
    },
    heading: {
        fontSize: 20,
        fontFamily: "Quicksand-Medium"
    },
    body: {
        fontSize: 16,
        fontFamily: "Quicksand-Medium",
        marginTop: 10

    }
})