import React, { useEffect, useState } from 'react'
import { View, Dimensions, ScrollView, StyleSheet } from 'react-native'
import { Avatar, Badge, Button, Text, TextInput, Modal, Portal, PaperProvider, RadioButton, Menu } from 'react-native-paper'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
// import SelectDropdown from 'react-native-select-dropdown'
import MainForm from './MainForm'
// import Modal from "react-native-modal";
const Categories = [
    { name: "Food", icon: "food" },
    { name: "Cloths", icon: "food" },
    { name: "Food", icon: "food" },
]
// const countries = ["Egypt", "Canada", "Australia", "Ireland"]
function Form({ route, navigation }) {

    const { itemId } = route.params
    console.log("itemId", itemId)
    const [visible, setVisible] = React.useState(true);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', height: `50%`, justifyContent: "flex-start", paddingTop: 20, };
    const [filterCategory, setfilterCategory] = useState()

    const gotoForm = (id) => {
        console.log(id)
        const filterData = Categories.filter((Category, index) => index == id)
        setfilterCategory(filterData)
        setVisible(false)
        console.log("filterData", filterData[0].name)
    }


    return (
        // <ScrollView>
        <View style={{ height: `100%`, }}>

            {visible ?
                <PaperProvider >
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                            {/* <View> */}
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "center"
                            }}>
                                <View style={{ textAlign: "center" }}>
                                    <Text style={styles.heading}>
                                        Choose Category
                                    </Text>
                                </View>
                                <View style={{ position: "absolute", right: 0, }}>
                                    <Icon color="#E75C62" name='close' style={{ fontSize: 25, }} onPress={() => navigation.navigate("Home")} />
                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                {Categories.map((item, i) => {
                                    return (
                                        <Menu.Item leadingIcon={item.icon} onPress={() => gotoForm(i)} title={itemId == "Donation" ?
                                            `Donate ${item.name}` :
                                            `Request ${item.name}`} key={i} />
                                    )
                                })}
                            </View>
                            {/* </View> */}
                        </Modal>
                    </Portal>

                </PaperProvider> : <MainForm itemId={
                    itemId == "Donation" ?
                        `Donate ${filterCategory[0]?.name}` :
                        `Request ${filterCategory[0]?.name}`} type={itemId} 
                        navigation={navigation}
                        />}
        </View >
        // </ScrollView>
    )
}

export default Form


const styles = StyleSheet.create({
    modal: {
        display: "flex",
        flexDirection: "row"
    },
    heading: {
        textAlign: "center",
        fontSize: 20,
        // margin: 10,
        fontFamily: "Quicksand-Medium",
        // borderBlockColor: "black",
        // borderWidth: 1
    },
    mainDiv: {
        padding: 10,
        // position
        // borderBlockColor: "black",
        // borderWidth: 1
    },
    avatar: {
        // margin: 0,
        // padding: 0,
        // borderBlockColor: "black",
        // borderWidth: 1,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        position: "relative"
    },
    modal: { backgroundColor: 'white', width: 170, height: 100, zIndex: 2, borderRadius: 10, elevation: 3, }
})

