import WebView from "react-native-webview";
import {ActivityIndicator, Alert, Dimensions, Platform, Pressable, ScrollView, StyleSheet, View,} from 'react-native';
import {ThemedText} from "@/components/Global/ThemedText";
import {useVideoPlayer, VideoView} from "expo-video";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Video} from "@/types/Video";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {useKeepAwake} from "expo-keep-awake";
import formatPublishedDate from "@/utils/formatPublishedDate";
import {useTheme} from "@react-navigation/core";
import {Colors} from "@/constants/Colors";
import {FontAwesome6} from "@expo/vector-icons";
import shortenVideoTitle from "@/utils/shortenVideoTitle";

export const VideoPlayer = (
    props: {
        videoUrl: string,
        closeVideo: () => void,
        minimized: boolean,
        setMinimized: Dispatch<SetStateAction<boolean>> ,
    }
) => {
    useKeepAwake();
    const theme = useTheme();

    const [video, setVideo] = useState<Video | null>(null);
    const [videoSource, setVideoSource] = useState<string>("");
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
        player.loop = true;
        player.play();
    });

    return (
        <View
            style={[!props.minimized ? styles.videoPlayerContainer : styles.videoPlayerContainerMinimized, { backgroundColor: backgroundColor }]}
        >
            {!props.minimized &&
                <View style={styles.buttonsContainer}>
                    <FontAwesome6 name={"chevron-down"} size={35} color={textColor} onPress={() => props.setMinimized(true)} />
                    <FontAwesome6 name={"xmark"} size={35} color={textColor} onPress={props.closeVideo} />
                </View>
            }
            {!video
                ? <ActivityIndicator color={Colors.emphasised.backgroundColor} size={"large"}/>
                :
                <View style={props.minimized && {flexDirection: "row"}}>
                    {preferredPlayer === "Web" ?
                        <View style={!props.minimized ? styles.video : styles.videoWebMinimized}>
                            <WebView
                                allowsFullscreenVideo={true}
                                source={{
                                    uri: `https://${video.channel.host}${video.embedPath}`
                                }}
                            />
                        </View>
                        :
                        <VideoView
                            style={!props.minimized ? styles.video : styles.videoNativeMinimized}
                            player={player}
                            allowsFullscreen
                            allowsPictureInPicture
                            startsPictureInPictureAutomatically
                        />
                    }
                    {!props.minimized
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
                        <View style={styles.minimizedDetailsContainer}>
                            <Pressable style={styles.minimizedVideoTitleContainer} onPress={() => props.setMinimized(false)}>
                                <ThemedText style={styles.minimizedVideoTitle}>{shortenVideoTitle(video.name)}</ThemedText>
                            </Pressable>
                            <FontAwesome6 name={"xmark"} size={35} color={textColor} onPress={props.closeVideo} />
                        </View>
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
        paddingTop: 25
    },
    videoPlayerContainerMinimized: {
        maxHeight: 200,
        minHeight: 80
    },
    videoNativeMinimized: {
        width: 150,
        height: 80,
    },
    videoWebMinimized: {
        width: 150,
        height: 80,
        maxWidth: 150,
        maxHeight: 80,
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 5
    },
    minimizedDetailsContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 7,
        minHeight: 80
    },
    minimizedVideoTitleContainer: {
        maxWidth: Dimensions.get("window").width - 190,
        marginLeft: 6,
    },
    minimizedVideoTitle: {
        fontSize: 14,
        fontWeight: "bold"
    },
    video: {
        width: "100%",
        height: Dimensions.get("window").height / 3.5,
    },
});