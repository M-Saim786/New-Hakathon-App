import React, { useEffect, useState } from 'react'
import { View, Dimensions, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Avatar, Badge, Button, Text, TextInput, Modal, Portal, PaperProvider, RadioButton } from 'react-native-paper'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import SelectDropdown from 'react-native-select-dropdown'
import Snackbar from 'react-native-snackbar'
import firestore from "@react-native-firebase/firestore"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'
import * as Progress from 'react-native-progress';
import DropDownPicker from 'react-native-dropdown-picker';

const countries = ["Egypt", "Canada", "Australia", "Ireland"]
function MainForm({ navigation, type }) {
    // console.log(itemId)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Medical', value: 'medical' },
        { label: 'Money/Rupees', value: 'money' },
        { label: 'Cloths', value: 'cloths' },
        { label: 'Education', value: 'education' },
    ]);
    const [gender, setGender] = useState(null)
    const [openGender, setopenGender] = useState(false)
    const [selectGender, setselectGender] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'feMale' },

    ])
    // const itemId = itemId;
    // const { itemId } = route.params;
    // const [secureText, setsecureText] = useState(true)
    const [Name, setName] = useState("")
    const [Cnic, setCnic] = useState(null)
    const [PhoneNum, setPhoneNum] = useState(null)
    const [ImgFile, setImgFile] = useState(null)

    // const [Email, setEmail] = useState("")
    // const [Password, setPassword] = useState("")
    const [Title, setTitle] = useState("")
    const [Desc, setDesc] = useState("")
    // const [, set] = useState(second)
    const [loading, setloading] = useState(false)
    // const [secureText, setsecureText] = useState(true)
    // const [Profile, setProfile] = useState([])
    // const [UserId, setUserId] = useState("")
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
        if (!Name || !Cnic || !PhoneNum || !gender || !items) {
            Snackbar.show({
                text: 'Required Fields cannot be Null..',
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
                name: Name,
                // desc: Desc,
                status: "request",
                type: type,
                createdAt: new Date().toLocaleString(), // Corrected this line
                userId: userId,
                requestImg: ImgFile,
                Phone: PhoneNum,
                Cnic: Cnic,
                gender: gender,
                mainType: value,

            }).then(() => {
                Snackbar.show({
                    text: 'Request Submitted Successfully..!',
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
            <>
                {ShowProgress && <Progress.Bar progress={ProgressVal} width={screenWidth} />}
                <View style={styles.mainDiv}>

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        // borderBlockColor: "black",
                        // borderWidth: 1
                    }}>
                        <View style={{ textAlign: "center" }}>
                            <Text style={styles.heading}>
                                {type} Form
                            </Text>
                        </View>
                        <View style={{ position: "absolute", right: 0, padding: 20 }}>
                            <Icon color="#E75C62" name='close' style={{ fontSize: 25, }} onPress={() => navigation.navigate("Home")} />
                        </View>
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
                                right: 90,
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
                        <View>

                            <TextInput
                                label="Applicant Name"
                                mode='outlined'
                                placeholder='Applicant Name'
                                value={Name}
                                onChangeText={text => setName(text)}
                                right={<TextInput.Icon icon="account" />}
                                style={{ marginTop: 20 }}
                            />
                            <TextInput
                                label="Applicant CNIC"
                                mode='outlined'
                                placeholder='CNIC without "-"  xxxxxxxxxxxxx'
                                value={Cnic}
                                onChangeText={text => {
                                    if (text.length <= 13) {
                                        setCnic(text);
                                    }
                                }}
                                right={<TextInput.Icon icon="card-account-details-outline" />}
                                style={{ marginTop: 10, }}
                                keyboardType="numeric"
                            />
                            <TextInput
                                label="Applicant Phone"
                                mode='outlined'
                                placeholder='Applicant Phone'
                                value={PhoneNum}
                                onChangeText={text => {
                                    if (text.length <= 11) {
                                        setPhoneNum(text);
                                    }
                                }}
                                right={<TextInput.Icon icon="phone" />}
                                style={{ marginTop: 10, }}
                                keyboardType='numeric'
                            />
                            <View style={{ flexDirection: "row", display: "flex", justifyContent: "space-between" }}>
                                <View style={{ width: `48%` }}>
                                    <DropDownPicker
                                        open={openGender}
                                        value={gender}
                                        items={selectGender}
                                        setOpen={setopenGender}
                                        setValue={setGender}
                                        setItems={setselectGender}
                                        style={{
                                            marginTop: 10, zIndex: 1,
                                        }}
                                        placeholder="Select Gender"
                                    />
                                </View>
                                <View style={{ width: `48%` }}>
                                    <DropDownPicker
                                        open={open}
                                        value={value}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setValue}
                                        setItems={setItems}
                                        style={{ marginTop: 10, }}
                                        placeholder="Select Type"

                                    />
                                </View>
                            </View>
                        </View>


                        <View>
                            <Button
                                icon="hand-heart-outline" mode="contained"
                                style={{ marginTop: 110, color: "white", backgroundColor: "#0574B9", borderRadius: 5 }}
                                loading={loading ? true : false}
                                onPress={() => addRequest()}
                            >
                                Submit Request
                            </Button>
                        </View>
                    </View>
                </View>
            </>
        </ScrollView>
    )
}

export default MainForm


const styles = StyleSheet.create({
    heading: {
        textAlign: "center",
        fontSize: 25,
        margin: 0,
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
        margin: 30,
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

