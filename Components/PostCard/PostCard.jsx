import React from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import Icon from "react-native-vector-icons/AntDesign"
// import Video from 'react-native-video';


function PostCards({ title, desc, img }) {
    return (
        // <ScrollView>
        <View style={styles.mainPost}>
            <View>

                <View style={styles.PostHeader}>
                    <View style={styles.subHeader}>
                        <View>
                            <Image source={{ uri: "https://firebasestorage.googleapis.com/v0/b/mini-hakathon-f16b3.appspot.com/o/Images%2F1704000558702.jpg?alt=media&token=e4872b14-f4ca-416b-a0f8-21f2861f2746" }}
                                style={styles.PostHeaderImg}
                            />
                        </View>
                        <View>
                            <Text>
                                Useerm
                            </Text>
                            <Text style={{ fontSize: 10 }}>
                                saim12321
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Icon color="gray" name='close' style={{ fontSize: 25, }} />
                    </View>
                </View>



                <View style={styles.postBody}>
                    {/* <View style={{ height: `${desc?.length < 6 ? `20%` : `60%`}`, }}> */}
                    <View>
                        <Text style={styles.heading}>
                            {title && title}
                        </Text>
                    </View>
                    <View style={{
                        // height: `${desc?.length < 4 ? 10 : 100}`,
                        borderBlockColor: "black",
                        borderWidth: 1
                    }}>
                        <Text style={styles.desc}>
                            {/* {desc && desc} */}
                            {desc?.length > 10 ? desc?.slice(0, 10) + " See More..." : desc}
                            {/* {desc?.length > 10 ? desc?.slice(0, 10) + "See More" : desc} */}
                        </Text>
                    </View>

                    <View>
                        <Image source={{ uri: `${img && img}` }} style={{ height: 200, width: 300 }} />
                    </View>


                </View>
            </View>


            <View style={styles.bottomBar}>

                <View>
                    <View>
                        {/* <Text> */}
                        <Icon color="gray" name='like2' style={{ fontSize: 20, textAlign: "center" }} />
                        {/* </Text> */}
                    </View>
                    <View>
                        <Text style={styles.bottomBtnsText}>
                            Like
                        </Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Icon color="gray" name='message1' style={{ fontSize: 20, textAlign: "center" }} />
                    </View>
                    <View>
                        <Text style={styles.bottomBtnsText}>
                            Comment
                        </Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Icon color="gray" name='sharealt' style={{ fontSize: 20, textAlign: "center" }} />
                    </View>
                    <View>
                        <Text style={styles.bottomBtnsText}>
                            Share
                        </Text>
                    </View>
                </View>
            </View>

        </View>
        // </ScrollView>

    )
}

export default PostCards


const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    PostHeader: {
        flexDirection: "row",
        alignItems: "center",
        // borderBottomWidth: 1,
        // borderBlockColor: "black",
        // borderWidth: 1,
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingTop: 10,
        backgroundColor: "#fff",
    },
    subHeader: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    PostHeaderImg: {
        width: 60,
        height: 60,
        borderRadius: 50,
        // borderBlockColor: "black",
        // borderWidth: 1
    },
    heading: {
        fontSize: 25,
        fontFamily: "Quicksand-Medium",
        marginTop: 10,
        padding: 10
    },
    desc: {
        fontSize: 14,
        fontFamily: "Quicksand-Medium",
        paddingLeft: 10
    },
    bottomBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        textAlign: "center",
        borderBlockColor: "#e6ede9",
        borderTopWidth: 1,
        width: `95%`,
        marginLeft: 10,
        // marginRight: 10,
        // borderBlockColor: "black",
        // borderWidth: 1

    },
    bottomBtnsText: {
        fontSize: 14,
        fontFamily: "Quicksand-Medium",

    },
    mainPost: {
        display: "flex",
        justifyContent: "space-between",
        // borderBlockColor: "red",
        // borderWidth: 1,
        // minHeight: 400,
        position: "relative",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        // marginTop: 5,
        marginBottom: 10,
        // marginBottom: -40,
        backgroundColor: "#fff"
    },
    postBody: {
        // justifyContent: "flex-start",
        // borderBlockColor: "green",
        // borderWidth: 1,
        // height: `40%`,
        // marginTop: -40,
        // marginBottom: -40
    }




});