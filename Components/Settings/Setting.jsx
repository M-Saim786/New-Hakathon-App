import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

cosnt = [
    {
        title: "About",
        desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit culpa fugit ratione, nisi dolor libero consequuntur distinctio eius veniam officia praesentium, odio corporis! Eum nisi saepe rem adipisci atque quo nobis quod delectus quia aspernatur maxime optio, quidem reiciendis a?",

    },
    {
        title: "About",
        desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit culpa fugit ratione, nisi dolor libero consequuntur distinctio eius veniam officia praesentium, odio corporis! Eum nisi saepe rem adipisci atque quo nobis quod delectus quia aspernatur maxime optio, quidem reiciendis a?",

    },
    {
        title: "About",
        desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit culpa fugit ratione, nisi dolor libero consequuntur distinctio eius veniam officia praesentium, odio corporis! Eum nisi saepe rem adipisci atque quo nobis quod delectus quia aspernatur maxime optio, quidem reiciendis a?",

    },
]
function Setting() {
    return (
        <View>
            <Text>
                Setting
            </Text>

            <View>
                <View style={styles.settingBar}>
                    <View>
                        <Text>
                            Checl
                        </Text>
                    </View>
                    <View>
                        <Icon name="pencil" size={20} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    settingBar: {
        // borderBlockColor: "black",
        // borderWidth: 1,
        // display:"flex",
        flexDirection: "row",
        justifyContent: "space-between",

        padding: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 1,
    }
})