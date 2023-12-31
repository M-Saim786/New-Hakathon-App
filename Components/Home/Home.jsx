import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'
import PostCards from '../PostCard/PostCard'
import firestore from '@react-native-firebase/firestore';


const data = [
    {
        id: 1,
        title: "jdskljdksls",
        desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet dolore earum adipisci debitis ea maiores, optio quod dolor exercitationem consectetur architecto dicta maxime error tenetur neque! Nobis quibusdam commodi voluptatem aperiam? Corrupti, earum sequi, blanditiis cum numquam non officiis natus beatae inventore, veniam molestias mollitia tempora quasi a est minima."
    },
    {
        id: 2,
        title: "jdskljdksls",
        desc: "desc this  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet dolore earum adipisci debitis ea maiores, optio quod dolor exercitationem consectetur architecto dicta maxime error tenetur neque! Nobis quibusdam commodi voluptatem aperiam? Corrupti, earum sequi, blanditiis cum numquam non officiis natus beatae inventore, veniam molestias mollitia tempora quasi a est minima."
    },
    {
        id: 3,
        title: "jdskljdksls",
        desc: "desc this  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet dolore earum adipisci debitis ea maiores, optio quod dolor exercitationem consectetur architecto dicta maxime error tenetur neque! Nobis quibusdam commodi voluptatem aperiam? Corrupti, earum sequi, blanditiis cum numquam non officiis natus beatae inventore, veniam molestias mollitia tempora quasi a est minima.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet dolore earum adipisci debitis ea maiores, optio quod dolor exercitationem consectetur architecto dicta maxime error tenetur neque! Nobis quibusdam commodi voluptatem aperiam? Corrupti, earum sequi, blanditiis cum numquam non officiis natus beatae inventore, veniam molestias mollitia tempora quasi a est minima."
    },

]

function Home() {
    const [data, setData] = useState([])
    useEffect(() => {
        getPosts()

    }, [])

    const getPosts = async () => {
        const allPosts = await firestore().collection("Posts").get()
        console.log("allPosts", allPosts._docs)
        allPosts?._docs?.map((post) => {
            console.log("posts", post?._data.title)
            // console.log("posts", post)
        })
        const fitlerData = allPosts?._docs?.filter((post) => post?._data.title !== "" && post?._data.title !== undefined)
        setData(fitlerData)
    }

    return (

        <View style={{ padding: 2 }}>
            <View style={{ height: `95%`, backgroundColor: "#e6ede9", borderBlockColor: "blue", borderWidth: 1 }}>

                {
                    data &&
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => item.id} // Assuming you have an 'id' field in your data
                        renderItem={({ item }) =>
                        (
                            <PostCards title={item?._data?.title} desc={item?._data?.desc} img={item?._data?.PostImg} />
                        )}
                    />
                }
            </View>
            {/* </ScrollView> */}
        </View>
    )
}

export default Home