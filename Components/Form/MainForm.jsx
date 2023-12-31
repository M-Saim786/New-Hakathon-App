import React, { useEffect, useState } from 'react'
import { View, Dimensions, ScrollView, StyleSheet } from 'react-native'
import { Avatar, Badge, Button, Text, TextInput, Modal, Portal, PaperProvider, RadioButton } from 'react-native-paper'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import SelectDropdown from 'react-native-select-dropdown'
import Snackbar from 'react-native-snackbar'
import firestore from "@react-native-firebase/firestore"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'
import * as Progress from 'react-native-progress';


const countries = ["Egypt", "Canada", "Australia", "Ireland"]
function MainForm({ itemId, navigation, type }) {
    console.log(itemId)
    // const itemId = itemId;
    // const { itemId } = route.params;
    // const [secureText, setsecureText] = useState(true)
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Title, setTitle] = useState("")
    const [Desc, setDesc] = useState("")
    // const [, set] = useState(second)
    const [loading, setloading] = useState(false)
    // const [secureText, setsecureText] = useState(true)
    const [Profile, setProfile] = useState([])
    const [UserId, setUserId] = useState("")
    const [ImgFile, setImgFile] = useState("")
    const [ShowProgress, setShowProgress] = useState(false)
    const [ProgressVal, setProgressVal] = useState(10)
    const OpenGallery = async () => {
        console.log("open Gallery")
        const options = {
            mediaType: 'photo',  // You can use 'photo' or 'video'
            quality: 1,       // Image quality (0 to 1)
        };
        // const result = await launchCamera(options, (response) => {
        await launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                // console.log(response?.assets)
                console.log(response?.assets[0].uri)
                // console.log({ uri: response.assets[0] })
                // console.log(response?.assets["uri"])
                setImgFile(response?.assets[0]?.uri)
                uploadImage(response?.assets[0]?.uri)
            }
        });
    }
    // For Camera
    const HandleCamera = async () => {
        const options = {
            mediaType: 'photo',  // You can use 'photo' or 'video'
            quality: 0.8,       // Image quality (0 to 1)
        };
        // const result = await launchCamera(options, (response) => {
        await launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                // console.log(response?.assets)
                console.log(response?.assets[0].uri)
                // console.log({ uri: response.assets[0] })
                // console.log(response?.assets["uri"])
                setImgFile(response?.assets[0]?.uri)
                uploadImage(response?.assets[0]?.uri)
            }
        });
    }
    const uploadImage = (imageurl) => {
        // const imageupload = (imageurl) => {
        const reference = storage().ref('Images/' + new Date().getTime() + '.jpg');
        setShowProgress(true)
        try {
            Snackbar.show({
                text: 'Uploading Image..!',
                duration: Snackbar.LENGTH_SHORT,
                action: {
                    text: 'Ok',
                    textColor: 'green',
                    onPress: () => { /* Do something. */ },
                },
            })
            const uploadTask = reference.putFile(imageurl);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgressVal(progress)
                    console.log(progress)

                },
                (error) => {
                    console.error('Error uploading image: ', error);
                    setShowProgress(false)
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        const img_url = downloadURL;
                        // setshowprogress(false)
                        setImgFile(downloadURL)
                        console.log('File available at', downloadURL);

                    });
                    setShowProgress(false)
                }
            );


        } catch (error) {
            console.error('Error uploading image: ', error);
        }
        // }
    }

    const addRequest = async () => {
        const userId = await AsyncStorage.getItem("userId")
        console.log(ImgFile)
        if (!Title || !Desc) {
            Snackbar.show({
                text: 'Title & Desc cannot be Null..',
                duration: Snackbar.LENGTH_SHORT,
                action: {
                    text: 'Ok',
                    textColor: 'green',
                    onPress: () => { /* Do something. */ },
                },
            })

        }
        else {
            setloading(true)
            firestore().collection("Requests").add({
                title: Title,
                 desc: Desc,
                  status: "request", 
                  type: type,
                createdAt: new Date().toLocaleString(), // Corrected this line
                userId: userId,
                requestImg :ImgFile,
                Phone:"",
                Cnic:"",
                gender:"",


            }).then(() => {
                Snackbar.show({
                    text: 'Updated Successfully..!',
                    duration: Snackbar.LENGTH_SHORT,
                    action: {
                        text: 'Ok',
                        textColor: 'green',
                        onPress: () => { /* Do something. */ },
                    },
                })
                setloading(false)
            }).catch((err) => {
                Snackbar.show({
                    text: err.message,
                    duration: Snackbar.LENGTH_SHORT,
                    action: {
                        text: 'Ok',
                        textColor: 'green',
                        onPress: () => { /* Do something. */ },
                    },
                })
            })
        }
    }



    // Modal Data
    const [visible, setVisible] = React.useState(false);
    // const [value, setValue] = React.useState('');
    // if (value) {
    //     setVisible(false)
    // }
    // console.log(value)
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    // const containerStyle = 
    const handleChoice = (text) => {
        setVisible(false)
        if (text == "camera") {
            HandleCamera()
        } else if (text == "gallery") {
            console.log(text)
            OpenGallery()
        }
    }
    const screenWidth = Dimensions.get("window").width
    return (
        <ScrollView>
            {ShowProgress && <Progress.Bar progress={ProgressVal} width={screenWidth} />}
            <View style={styles.mainDiv}>
                <View>

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",

                        justifyContent: "center"
                    }}>
                        <View style={{ textAlign: "center" }}>
                            <Text style={styles.heading}>
                                {itemId} Form
                            </Text>
                        </View>
                        <View style={{ position: "absolute", right: 0, padding: 20 }}>
                            <Icon color="#E75C62" name='close' style={{ fontSize: 25, }} onPress={() => navigation.navigate("Home")} />
                        </View>
                    </View>
                    {/* <View>
                        <SelectDropdown
                            data={countries}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                            }}
                            buttonStyle={{ borderBlockColor: "black", borderWidth: 1 }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem ? selectedItem : "Select Category"
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                            renderDropdownIcon={()=>{
                                return(
                                    <Icon name="chevron-up" size={20} />
                                )
                            }}
                        />
                    </View> */}
                </View>
                <View>
                    <View style={styles.avatar}>
                        <Avatar.Image
                            size={140}
                            color="white"
                            source={{
                                uri: `${!ImgFile ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbXlpRoY6yMdNaajjIrz4mhtkt2YTuXJhvYw&usqp=CAU" : ImgFile}`
                            }}
                            style={{
                                resizeMode: 'contain',
                                // marginLeft:`50%` 

                            }}
                        />
                        <Badge size={30} style={{
                            backgroundColor: "white", color: "black", borderColor: "black",
                            borderWidth: 1,
                            position: "absolute",
                            right: 110,
                            bottom: 0
                        }}
                            onPress={showModal}
                        >
                            <Icon name="pencil" size={20} />
                        </Badge>
                        <PaperProvider style={{ position: 'absolute', zIndex: 0 }}>
                            <Portal style={{ position: 'absolute', zIndex: 0 }}>
                                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                                    <RadioButton.Group onValueChange={handleChoice} >
                                        <RadioButton.Item label="Open Gallery" value="gallery"
                                        />
                                        <RadioButton.Item label="Open Camera" value="camera" />
                                    </RadioButton.Group>
                                </Modal>
                            </Portal>
                        </PaperProvider>

                    </View>
                    <View style={{ marginTop: 30 }}>

                        <TextInput
                            label="Title"
                            mode='outlined'
                            placeholder='Enter Your Title'
                            value={Title}
                            onChangeText={text => setTitle(text)}
                            right={<TextInput.Icon icon="account" />}
                            style={{ marginTop: 20 }}
                        />
                        <TextInput
                            label="Description"
                            mode='outlined'
                            placeholder='Enter Your Description'
                            value={Desc}
                            onChangeText={text => setDesc(text)}
                            right={<TextInput.Icon icon="order-bool-descending-variant" />}
                            style={{ marginTop: 20, }}
                            numberOfLines={5}
                            multiline={true}
                        />

                    </View>
                    <View>
                        <Button
                            icon="folder" mode="contained"
                            style={{ marginTop: 70, color: "white", backgroundColor: "#0574B9" }}
                            loading={loading ? true : false}
                            onPress={() => addRequest()}
                        >
                            Submit Request
                        </Button>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default MainForm


const styles = StyleSheet.create({
    heading: {
        textAlign: "center",
        fontSize: 25,
        margin: 20,
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
