import WebView from "react-native-webview";
import {ActivityIndicator, Alert, Dimensions, Platform, ScrollView, StyleSheet, View,} from 'react-native';
import {ThemedText} from "@/components/Global/ThemedText";
import {useVideoPlayer, VideoView} from "expo-video";
import React, {useEffect, useState} from "react";
import {Video} from "@/types/Video";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {useKeepAwake} from "expo-keep-awake";
import formatPublishedDate from "@/utils/formatPublishedDate";
import {useTheme} from "@react-navigation/core";
import {Colors} from "@/constants/Colors";
import {FontAwesome6} from "@expo/vector-icons";

export const VideoPlayer = (
    props: {
        videoUrl: string,
        closeVideo: () => void,
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
        fetch(props.videoUrl)
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
            style={[styles.videoPlayerContainer, { backgroundColor: backgroundColor }]}
        >
            <FontAwesome6 name={"chevron-down"} size={35} color={textColor} onPress={props.closeVideo} />
            <FontAwesome6 name={"xmark"} size={35} color={textColor} onPress={props.closeVideo} />
            {!video ?
                <ActivityIndicator color={Colors.emphasised.backgroundColor} size={"large"}/> :
                <>
                    {preferredPlayer === "Web" ?
                        <WebView
                            allowsFullscreenVideo={true}
                            source={{
                                uri: `https://${video.channel.host}${video.embedPath}`
                            }}
                            style={video}
                        /> :
                        <VideoView
                            style={styles.video}
                            player={player}
                            allowsFullscreen
                            allowsPictureInPicture
                            startsPictureInPictureAutomatically
                        />
                    }
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
                </>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    videoPlayerContainer: {
        flex: 1,
        height: "100%",
    },
    video: {
        width: "100%",
        height: Dimensions.get("window").height / 3.5,
    },
    controlsContainer: {
        padding: 10,
    },
});