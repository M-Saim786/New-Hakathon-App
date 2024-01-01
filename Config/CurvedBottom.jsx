import React, { useRef, } from 'react';
import {
    Animated,
    Button,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import Ionicons from "react-native-vector-icons/AntDesign";
import Home from '../Components/Home/Home';
// import About from '../Components/About';
import Setting from '../Components/Settings/Setting';
import Profile from '../Components/Profile/Profile';
// import BottomModal from './BottomModal';
import RBSheet from "react-native-raw-bottom-sheet";
import { RadioButton } from 'react-native-paper';
import Posts from '../Components/Posts/Posts';

export default function BottomNav({ navigation }) {
    const _renderIcon = (routeName, selectedTab) => {
        let icon = '';

        switch (routeName) {
            case 'Home':
                icon = 'home';
                break;
            case 'Post':
                icon = 'profile';
                break;
            case 'Profile':
                icon = 'user';
                break;
            case 'Settings':
                icon = 'setting';
                break;
        }

        return (
            <Ionicons
                name={icon}
                size={25}
                color={routeName === selectedTab ? "#368FC7" : 'gray'}
                style={{ fontWeight: `${routeName == selectedTab ? "bolder" : 'light'}` }}
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

    const refRBSheet = useRef();
    const handleChoice = (text) => {
        if (text == "Donate") {
            // return Form
            navigation.navigate("Form", {
                itemId: "Donation",
                otherParam: 'anything you want here',
            })
            // HandleCamera()
        } else if (text == "Help") {
            navigation.navigate("Form", {
                itemId: "Help",
                otherParam: 'anything you want here',
            })
        }
    }


    return (
        // <NavigationContainer>
        <CurvedBottomBarExpo.Navigator
            type="DOWN"
            style={styles.bottomBar}
            shadowStyle={styles.shawdow}
            height={60}
            circleWidth={50}
            bgColor="white"
            // initialRouteName="title1"
            borderTopLeftRight
            renderCircle={({ selectedTab, navigate }) => (
                <Animated.View style={styles.btnCircleUp}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => refRBSheet.current.open()}
                    >
                        <Ionicons name={'plus'} color="white" size={25} />
                        <View
                        >
                            {/* <Button title="OPEN BOTTOM SHEET" /> */}
                            <RBSheet
                                ref={refRBSheet}
                                height={150}
                                openDuration={250}
                                closeOnDragDown={true}
                                closeOnPressMask={true}
                                customStyles={{
                                    wrapper: {
                                        backgroundColor: "transparent"
                                    },
                                    draggableIcon: {
                                        backgroundColor: "#000"
                                    }
                                }}
                            >
                                <View>
                                    <RadioButton.Group onValueChange={handleChoice} >
                                        <RadioButton.Item label="Donate Now" value="Donate"
                                        />
                                        <RadioButton.Item label="Request Help..!" value="Help" />
                                    </RadioButton.Group>
                                </View>
                            </RBSheet>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            )}
            tabBar={renderTabBar}
            screenOptions={{
                headerShown: false
            }}
        // shadowStyle={{

        // }}
        >
            <CurvedBottomBarExpo.Screen
                name="Home"
                position="LEFT"
                component={() => <Home />}
            />
            <CurvedBottomBarExpo.Screen
                name="Post"
                position="LEFT"
                component={() => <Posts />}
            />
            <CurvedBottomBarExpo.Screen
                name="Profile"
                position="RIGHT"
                component={() => <Profile />}
            />
            <CurvedBottomBarExpo.Screen
                name="Settings"
                position="RIGHT"
                component={() => <Setting navigation={navigation} />}
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
        shadowColor: '#000',
        shadowOpacity: 6,
        shadowOffset: {
            width: 5,
            height: 10
        },
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
        backgroundColor: '#8DC63F',
        bottom: 33,
        // position:"absolute",
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
});
