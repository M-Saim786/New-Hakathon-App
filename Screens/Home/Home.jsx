import React, { useEffect, useState } from 'react'
import { FlatList, View, RefreshControl } from 'react-native'
import { Text } from 'react-native-paper'
import PostCards from '../../Components/PostCard/PostCard'
import firestore from '@react-native-firebase/firestore';


function Home() {

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        getPosts()
    }, [refreshing]);



    const [data, setData] = useState([])
    useEffect(() => {
        getPosts()

    }, [])

    const getPosts = async () => {
        const allPosts = await firestore().collection("Posts").get()
        // console.log("allPosts", allPosts._docs)
        // allPosts?._docs?.map((post) => {
        //     console.log("posts", post?._data.postImg)
        //     // console.log("posts", post)
        // })
        const fitlerData = allPosts?._docs?.filter((post) => post?._data.imgType !== null && post?._data.imgType === "image/png")
        setData(fitlerData)
        setRefreshing(false)
    }

    return (

        <View style={{ padding: 2, backgroundColor: "#e6ede9", }}>
            <View style={{
                height: `95%`,
                // borderBlockColor: "blue", borderWidth: 1
            }}>

                {
                    data && data.length > 0 ?
                        (<FlatList
                            data={data}
                            keyExtractor={(item, index) => item.id} // Assuming you have an 'id' field in your data
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            renderItem={({ item }) =>
                            (
                                <PostCards
                                    title={item?._data?.title}
                                    desc={item?._data?.desc}
                                    img={item?._data?.postUrl} />
                            )}
                        />) : (

                            <View style={{ alignItems: "center", justifyContent: "center", height: `95%` }}>
                                <Text style={{ fontSize: 20 }}>
                                    No Posts Available
                                </Text>
                            </View>
                        )
                }
            </View>
            {/* </ScrollView> */}
        </View>
    )
}

export default Home