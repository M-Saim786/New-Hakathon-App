import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
    Animated,
    Button,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Dimensions
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import Ionicons from "react-native-vector-icons/AntDesign";
import Home from '../Components/Home';
import About from '../Components/About';
import Setting from '../Components/Setting';
import Profile from '../Components/Profile';
import BottomModal from './BottomModal';
import RBSheet from "react-native-raw-bottom-sheet";
import { Modal, RadioButton } from 'react-native-paper';

// const Screen1 = () => {
//     return <View style={styles.screen1} />;
// };

// const Screen2 = () => {
//     return <View style={styles.screen2} />;
// };

export default function BottomNav() {
    const _renderIcon = (routeName, selectedTab) => {
        let icon = '';

        switch (routeName) {
            case 'Home':
                icon = 'home';
                break;
            case 'About':
                icon = 'profile';
                break;
            case 'Profile':
                icon = 'user';
                break;
            case 'Setting':
                icon = 'setting';
                break;
        }

        return (
            <Ionicons
                name={icon}
                size={25}
                color={routeName === selectedTab ? 'black' : 'gray'}
            />
        );
    };
    const renderTabBar = ({ routeName, selectedTab, navigate }) => {
        return (
            <TouchableOpacity
                onPress={() => navigate(routeName)}
                style={styles.tabbarItem}
            >
                {_renderIcon(routeName, selectedTab)}
            </TouchableOpacity>
        );
    };

    const [modalVisible, setmodalVisible] = useState(true)
    const openModal = () => {
        console.log("clock");
        // RBSheet.open()
        // Open the bottom sheet using your RBSheet reference

    };
    const width = Dimensions.get("window").width
    const refRBSheet = useRef();
    const handleChoice = (text) => {
        // setVisible(false)
        if (text == "camera") {
            // HandleCamera()
        } else if (text == "gallery") {
            console.log(text)
            // OpenGallery()
        }
    }


    return (
        // <NavigationContainer>
        <CurvedBottomBarExpo.Navigator
            type="DOWN"
            style={styles.bottomBar}
            shadowStyle={styles.shawdow}
            height={55}
            circleWidth={50}
            bgColor="white"
            initialRouteName="title1"
            borderTopLeftRight
            renderCircle={({ selectedTab, navigate }) => (
                <Animated.View style={styles.btnCircleUp}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => refRBSheet.current.open()}
                    >
                        <Ionicons name={'plus'} color="gray" size={25} />
                        <View
                        // style={{
                        //     flex: 1,
                        //     justifyContent: "center",
                        //     alignItems: "center",
                        //     backgroundColor: "#000"
                        // }}
                        >
                            {/* <Button title="OPEN BOTTOM SHEET" /> */}
                            <RBSheet
                                ref={refRBSheet}
                                height={200}
                                openDuration={250}
                                closeOnDragDown={true}
                                closeOnPressMask={true}
                                customStyles={{
                                    // container: {
                                    //     justifyContent: "center",
                                    //     alignItems: "center"
                                    // },
                                    // customStyles={{
                                    wrapper: {
                                        backgroundColor: "transparent"
                                    },
                                    draggableIcon: {
                                        backgroundColor: "#000"
                                    }
                                    // }}
                                }}
                            >
                                <View>
                                    <RadioButton.Group onValueChange={handleChoice} >
                                        <RadioButton.Item label="Donate Now" value="gallery"
                                        />
                                        <RadioButton.Item label="Request Help..!" value="camera" />
                                    </RadioButton.Group>
                                </View>
                            </RBSheet>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            )}
            tabBar={renderTabBar}
        >
            <CurvedBottomBarExpo.Screen
                name="Home"
                position="LEFT"
                component={() => <Home />}
            />
            <CurvedBottomBarExpo.Screen
                name="About"
                position="LEFT"
                component={() => <About />}
            />
            <CurvedBottomBarExpo.Screen
                name="Profile"
                position="RIGHT"
                component={() => <Profile />}
            />
            <CurvedBottomBarExpo.Screen
                name="Settings"
                position="RIGHT"
                component={() => <Setting />}
            />
        </CurvedBottomBarExpo.Navigator>
        // </NavigationContainer>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    shawdow: {
        shadowColor: '#DDDDDD',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
    },
    bottomBar: {},
    btnCircleUp: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8E8E8',
        bottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 1,
    },
    imgCircle: {
        width: 30,
        height: 30,
        tintColor: 'gray',
    },
    tabbarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 30,
        height: 30,
    },
    screen1: {
        flex: 1,
        backgroundColor: '#BFEFFF',
    },
    screen2: {
        flex: 1,
        backgroundColor: '#FFEBCD',
    },
});
