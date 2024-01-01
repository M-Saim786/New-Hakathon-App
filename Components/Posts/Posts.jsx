import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import { FlatList, View } from 'react-native'
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import video from '../../assets/mBaWAJWaFaTob9jZ.mp4';
import firestore from '@react-native-firebase/firestore';
import PostCards from '../PostCard/PostCard';




function Posts() {
    useEffect(() => {
        getPosts()
    }, [])

    const [data, setData] = useState([])

    const getPosts = async () => {
        const allPosts = await firestore().collection("Posts").get()
        // console.log("allPosts", allPosts._docs)
        allPosts?._docs?.map((post) => {
            // console.log("imgType", post?._data.imgType)
            // console.log("posts", post)
        })
        const fitlerData = allPosts?._docs?.filter((post) => post?._data.imgType !== "image/png" && post?._data.imgType !== undefined)
        console.log(fitlerData?._data)
        setData(fitlerData)
    }
    return (
        <View>
            <View style={{
                height: `95%`,
                // borderBlockColor: "blue", borderWidth: 1
                display: "flex"
            }}>


                {data && data.length > 0 ? (
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => item.id} // Assuming you have an 'id' field in your data
                        renderItem={({ item }) =>
                        (
                            <PostCards
                                title={item?._data?.title}
                                desc={item?._data?.desc}
                                videoUrl={item?._data?.postUrl}
                            // key={}
                            />
                        )}
                    />

                ) : (
                    <View style={{ alignItems: "center", justifyContent: "center", height: `95%` }}>

                        <Text style={{ fontSize: 20 }}>
                            No Posts Available
                        </Text>
                    </View>
                )}

            </View>
        </View >
    )
}

export default Posts