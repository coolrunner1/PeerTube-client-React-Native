import WebView from "react-native-webview";
import {ActivityIndicator, Alert, Dimensions, Platform, Pressable, ScrollView, StyleSheet, View, Text} from 'react-native';
import {ThemedText} from "@/components/Global/ThemedText";
import {useVideoPlayer, VideoView} from "expo-video";
import React, {useEffect, useState} from "react";
import {Video} from "@/types/Video";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {useKeepAwake} from "expo-keep-awake";
import formatPublishedDate from "@/utils/formatPublishedDate";
import {useTheme} from "@react-navigation/core";
import {Colors} from "@/constants/Colors";
import {FontAwesome6} from "@expo/vector-icons";
import shortenVideoTitle from "@/utils/shortenVideoTitle";
import {setCurrentVideo} from "@/slices/videoPlayerSlice";

export const VideoPlayer = (
    props: {
        videoUrl: string,
    }
) => {
    useKeepAwake();
    const theme = useTheme();

    const [video, setVideo] = useState<Video | null>(null);
    const [videoSource, setVideoSource] = useState<string>("");
    const [minimized, setMinimized] = useState(false);
    const dispatch = useDispatch();
    const preferredPlayer = useSelector((state: RootState) => state.userPreferences.preferredPlayer);

    const backgroundColor = theme.dark ?  Colors.dark.backgroundColor : Colors.light.backgroundColor;
    const textColor = theme.dark ?  Colors.dark.color : Colors.light.color;

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        setTimeout(() => {
            controller.abort();
        }, 5000);

        fetch(props.videoUrl, {signal})
            .then(data => {console.log(data); return data.json()})
            .then(json => setVideo(json))
            .catch(err => Alert.alert("error", err.toString()));
    }, [props.videoUrl]);

    const closeVideo = () => {
        dispatch(setCurrentVideo(""));
    };

    useEffect(() => {
        console.log(video);
        if (!video) {
            return;
        }
        if (preferredPlayer === "Web") {
            setVideoSource("");
            return;
        }
        if (Platform.OS !== "web" && typeof(video.streamingPlaylists[0]) !== "undefined") {
            setVideoSource(video.streamingPlaylists[0].playlistUrl);
            return;
        }
        if (video.files.length > 0) {
            setVideoSource(video.files[0].fileUrl);
            return;
        }
        setVideoSource(video.streamingPlaylists[0].files[0].fileUrl);
    }, [video, preferredPlayer]);

    const player = useVideoPlayer(videoSource, player => {
        player.play();
    });

    return (
        <View
            style={[!minimized ? styles.videoPlayerContainer : styles.videoPlayerContainerMinimized, { backgroundColor: backgroundColor }]}
        >
            {!minimized &&
                <View style={styles.buttonsContainer}>
                    <FontAwesome6 name={"chevron-down"} size={35} color={textColor} onPress={() => setMinimized(true)} />
                    {video &&
                        <View style={styles.topVideoTitleContainer} >
                            <Text style={styles.topVideoTitle}>{shortenVideoTitle(video.name)}</Text>
                        </View>
                    }
                    <FontAwesome6 name={"xmark"} size={35} color={textColor} onPress={closeVideo} />
                </View>
            }
            {!video
                ?
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color={Colors.emphasised.backgroundColor} style={{margin: 'auto'}} size={"large"}/>
                    {minimized && <FontAwesome6 name={"xmark"} size={35} color={textColor} onPress={closeVideo} />}
                </View>
                :
                <View style={minimized && {flexDirection: "row"}}>
                    {preferredPlayer === "Web" ?
                        <View style={!minimized ? styles.video : [styles.videoMinimized, styles.videoWebMinimized]}>
                            <WebView
                                allowsFullscreenVideo={true}
                                source={{
                                    uri: `https://${video.channel.host}${video.embedPath}`
                                }}
                            />
                        </View>
                        :
                        <VideoView
                            style={!minimized ? styles.video : styles.videoMinimized}
                            player={player}
                            allowsFullscreen
                            allowsPictureInPicture
                            startsPictureInPictureAutomatically
                        />
                    }
                    {!minimized
                        ?
                        <ScrollView>
                            <ThemedText>Work in progress</ThemedText>
                            <ThemedText>Published at: {formatPublishedDate(video.publishedAt)}</ThemedText>
                            <ThemedText>Title: {video.name}</ThemedText>
                            <ThemedText>Description: {video.truncatedDescription}</ThemedText>
                            <ThemedText>Views: {video.views}</ThemedText>
                            <ThemedText>Likes: {video.likes}</ThemedText>
                            <ThemedText>Dislikes: {video.dislikes}</ThemedText>
                            <ThemedText>Tags:</ThemedText>
                            {video.tags.map((tag: string, key) => <ThemedText key={key}>{tag}</ThemedText>)}
                            {video.language.label !== "Unknown" && <ThemedText>Language: {video.language.label}</ThemedText>}
                        </ScrollView>
                        :
                        <Pressable style={styles.minimizedDetailsContainer} onPress={() => setMinimized(false)}>
                            <View style={styles.minimizedVideoTitleContainer} >
                                <ThemedText style={styles.minimizedVideoTitle}>{shortenVideoTitle(video.name)}</ThemedText>
                            </View>
                            <FontAwesome6 name={"xmark"} size={35} color={textColor} onPress={closeVideo} />
                        </Pressable>
                    }
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    videoPlayerContainer: {
        flex: 1,
        height: "100%",
        width: "100%",
        position: "absolute"
    },
    videoPlayerContainerMinimized: {
        height: 70,
        position: "absolute",
        width: "100%",
        bottom: 70,
    },
    videoMinimized: {
        width: 140,
        height: 70,
        backgroundColor: "black"
    },
    videoWebMinimized: {
        maxWidth: 140,
        maxHeight: 70,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 28,
        paddingBottom: 3,
        backgroundColor: Colors.emphasised.backgroundColor,
    },
    minimizedDetailsContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 7,
        minHeight: 70
    },
    minimizedVideoTitleContainer: {
        maxWidth: Dimensions.get("window").width - 200,
        marginLeft: 8,
    },
    minimizedVideoTitle: {
        fontSize: 14,
        fontWeight: "bold"
    },
    video: {
        width: "100%",
        height: Dimensions.get("window").height / 3.5,
        backgroundColor: "black"
    },
    loadingContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    topVideoTitleContainer: {
        maxWidth: Dimensions.get("window").width - 100,
        margin: "auto",
        paddingHorizontal: 10,
    },
    topVideoTitle: {
        color: Colors.dark.color,
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    }
});