import React, { useEffect, useState } from 'react'
import { View, Dimensions, ScrollView, StyleSheet } from 'react-native'
import { Avatar, Badge, Button, Text, TextInput, Modal, Portal, PaperProvider, RadioButton } from 'react-native-paper'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import SelectDropdown from 'react-native-select-dropdown'


const countries = ["Egypt", "Canada", "Australia", "Ireland"]
function Form({ route }) {
    const { itemId } = route.params;
    // const [secureText, setsecureText] = useState(true)
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [loading, setloading] = useState(false)
    const [secureText, setsecureText] = useState(true)
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

    const updateProfile = () => {
        console.log(ImgFile)
        if (Password.length > 5) {
            setloading(true)
            firestore().collection("Users").doc(UserId).update({
                Name: Name,
                Email: Email,
                Password: Password,
                Img: ImgFile
                // key: res.user.uid
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
        else {
            Snackbar.show({
                text: 'Password should be at least 6 characters',
                duration: Snackbar.LENGTH_SHORT,
                action: {
                    text: 'Ok',
                    textColor: 'green',
                    onPress: () => { /* Do something. */ },
                },
            })
        }
    }

    useEffect(() => {
        //   const dbref = 
        getData()
    }, [])
    const getData = async () => {
        const userId = await AsyncStorage.getItem("userId")
        setUserId(userId)
        // console.log(userId)
        // let ID =JSON.parse(userId)
        const userDocument = await firestore().collection('Users').doc((userId)).get().then((res) => {
            console.log("userDATA", res?._data?.Email)
            setProfile(res?._data)
            setName(res?._data?.Name)
            setEmail(res?._data?.Email)
            setPassword(res?._data?.Password)
            setImgFile(res?._data?.Img)
            console.log("Profile", Profile)
        }).catch((err) => {
            console.log(err)
        })

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
            <View>
                <View>

                    <View>
                        <Text style={styles.heading}>
                            {itemId} Form
                        </Text>
                    </View>
                    <View>
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
                        />
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
                            label="Name"
                            mode='outlined'
                            placeholder='Enter Your Name'
                            value={Name}
                            onChangeText={text => setName(text)}
                            right={<TextInput.Icon icon="account" />}
                            style={{ marginTop: 20 }}
                        />
                        <TextInput
                            label="Email"
                            mode='outlined'
                            placeholder='Enter Your Email'
                            value={Email}
                            onChangeText={text => setEmail(text)}
                            right={<TextInput.Icon icon="email" />}
                            style={{ marginTop: 20 }}
                        />
                        <TextInput
                            label="Password"
                            placeholder='Enter Your Password'
                            mode='outlined'
                            right={secureText ?
                                <TextInput.Icon icon="eye" onPress={() => setsecureText(false)} /> :
                                <TextInput.Icon icon="eye-off" onPress={() => setsecureText(true)} />
                            }
                            secureTextEntry={secureText}
                            style={{ marginTop: 20 }}
                            value={Password}
                            onChangeText={text => setPassword(text)}
                        />
                    </View>
                    <View>
                        <Button
                            icon="folder" mode="contained"
                            style={{ marginTop: 70, color: "white", backgroundColor: "#2B29A6" }}
                            loading={loading ? true : false}
                            onPress={() => updateProfile()}
                        >
                            Update Profile
                        </Button>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Form


const styles = StyleSheet.create({
    heading: {
        textAlign: "center",
        fontSize: 25,
        margin: 20,
        fontFamily: "Quicksand-Medium"
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

