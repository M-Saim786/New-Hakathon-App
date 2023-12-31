import React, { useEffect } from 'react'
import { Text } from 'react-native-paper'
import { View } from 'react-native'
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import video from '../../assets/mBaWAJWaFaTob9jZ.mp4';
function Posts() {
    useEffect(() => {

    }, [])
    const getPosts = async () => {

    }
    return (
        <View>


            <View>
                {/* <Video
                    source={video}
                    style={{ width: 300, height: 200 }} // Adjust video dimensions as needed
                    controls={true} // Show video controls
                    resizeMode="cover" // Other options: 'contain', 'stretch', 'repeat'
                    paused={false} // Start the video paused (optional)
                    onEnd={() => console.log('Video ended')} // Add event listeners (optional)
                /> */}


            </View>
            <View>
                <Text>

                    <VideoPlayer
                        source={require("../../assets/mBaWAJWaFaTob9jZ.mp4")}
                        navigator={null}
                        tapAnywhereToPause={true}
                    />;
                </Text>
            </View>
        </View>
    )
}

export default Posts