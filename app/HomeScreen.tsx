import {ActivityIndicator, Animated, Button, View} from "react-native";
import ScrollView = Animated.ScrollView;
import {useEffect, useState} from "react";
import {VideoEntry} from "@/components/VideoEntry";
import {VideoPlayer} from "@/components/VideoPlayer";
import {useTheme} from "@react-navigation/core";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";
import {Video} from "@/types/Video";

export default function HomeScreen () {
    const theme = useTheme();
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [watch, setWatch] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [endOfScreen, setEndOfScreen] = useState<boolean>(false);

    const loadVideos = async () => {
        await fetch(`https://tinkerbetter.tube/api/v1/videos?start=${videos.length}`)
            .then((res) => res.json())
            .then((json) => {setVideos([...videos, ...json.data]); setLoading(false)})
            .catch((err) => console.error(err));
        setEndOfScreen(false);
    }

    useEffect(() => {
        loadVideos();
    }, [endOfScreen])

    return (
        <>
            {loading &&
                <View style={[{flex: 1, justifyContent: "center", alignItems: "center"}, theme.dark
                    ? {backgroundColor: Colors.dark.backgroundColor}
                    : {backgroundColor: Colors.light.backgroundColor}]
                }>
                    <ActivityIndicator size="large" color={"#f9526c"}/>
                </View>
            }
            {watch &&
                <ScrollView
                style={{marginTop: 20 }}>
                    <Button
                        title="Back"
                        onPress={() => {setWatch("")}}
                    />
                    <VideoPlayer embedPath={watch} />
                </ScrollView>
            }
            {(!loading && !watch) &&
                <ScrollView
                    style={[{flex: 1,}, theme.dark
                        ? {backgroundColor: Colors.dark.backgroundColor}
                        : {backgroundColor: Colors.light.backgroundColor}]
                    }
                    onScroll={(e)=>{
                        let paddingToBottom = 10;
                        paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                        if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
                            setEndOfScreen(true);
                        }
                    }}
                >
                    <View style={styles.container}>
                        {videos.map((video) => (
                            <VideoEntry
                                key={video.uuid}
                                title={video.name}
                                thumbnail={`https://tinkerbetter.tube${video.thumbnailPath}`}
                                publishedAt={video.publishedAt}
                                views={video.views}
                                channelDisplayName={video.channel.displayName}
                                onPress={() => setWatch(`https://tinkerbetter.tube${video.embedPath}`)}
                            />
                        ))}
                        {endOfScreen && <ActivityIndicator color={"#f9526c"}/>}
                    </View>
                </ScrollView>
            }
        </>
    );
};

const styles = {
    container: {
        flex: 1,
        marginHorizontal: "auto",
        paddingHorizontal: 5,
        gap: 15,
        maxWidth: 900,
    }
}