import WebView from "react-native-webview";
import {Alert, Button, Platform, ScrollView, StyleSheet, View,} from 'react-native';
import {ThemedText} from "@/components/Global/ThemedText";
import {useVideoPlayer, VideoView} from "expo-video";
import {useEvent} from "expo";
import {useEffect, useState} from "react";
import {Video} from "@/types/Video";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";

export const VideoPlayer = (
    props: {
        videoUrl: string,
    }
) => {
    const [video, setVideo] = useState<Video | null>(null);
    const [videoSource, setVideoSource] = useState<string>("");
    const preferredPlayer = useSelector((state: RootState) => state.userPreferences.preferredPlayer);

    useEffect(() => {
        console.log(preferredPlayer);
    }, [preferredPlayer]);

    useEffect(() => {
        fetch(props.videoUrl)
            .then(data => data.json())
            .then(json => setVideo(json))
            .catch(err => Alert.alert("error", err));
    }, [props.videoUrl]);

    useEffect(() => {
        console.log(video);
        if (!video) {
            return;
        }
        if (video.isLive || preferredPlayer === "Web") {
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
    }, [video]);

    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
    });

    return (
        <>
            {video &&
                <ScrollView
                    style={styles.videoPlayerContainer}
                >
                    {video.isLive || preferredPlayer === "Web" ?
                        <WebView
                            allowsFullscreenVideo={true}
                            source={{
                                uri: `https://${video.channel.host}${video.embedPath}`
                            }}
                            style={{ marginTop: 20, minWidth: 100, minHeight: 300 }}
                        /> :
                        <VideoView
                            style={styles.video}
                            player={player}
                            allowsFullscreen
                            allowsPictureInPicture
                            startsPictureInPictureAutomatically
                        />
                    }
                    <ThemedText>Work in progress</ThemedText>
                </ScrollView>
            }
        </>
    );
};

const styles = StyleSheet.create({
    videoPlayerContainer: {
        flex: 1,
    },
    video: {
        width: 350,
        height: 275,
    },
    controlsContainer: {
        padding: 10,
    },
});