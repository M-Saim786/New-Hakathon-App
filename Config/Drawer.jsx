import 'react-native-gesture-handler';
import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Components/Home/Home';
// import About from '../Components/About';
import DrawerContent from './DrawerContent';
// import Contact from '../Components/Contact';
import Profile from '../Components/Profile/Profile';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
    return (
        <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={Home} />
            {/* <Drawer.Screen name="About" component={About} />
            <Drawer.Screen name="Contact" component={Contact} /> */}
            <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>);
}