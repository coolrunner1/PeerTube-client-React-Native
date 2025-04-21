import WebView from "react-native-webview";
import {Alert, Button, ScrollView, StyleSheet, View,} from 'react-native';
import {ThemedText} from "@/components/Global/ThemedText";
import {useVideoPlayer, VideoView} from "expo-video";
import {useEvent} from "expo";
import {useEffect, useState} from "react";
import {Video} from "@/types/Video";

export const VideoPlayer = (
    props: {
        videoUrl: string,
    }
) => {
    const [video, setVideo] = useState<Video | null>(null);
    const [videoSource, setVideoSource] = useState<string>("");

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
        if (video.isLive) {
            return;
        }
        /*if (video.files.length > 0) {
            setVideoSource(video.files[0].fileUrl);
            return;
        }*/
        setVideoSource(video.streamingPlaylists[0].playlistUrl);
        /*fetch(video.streamingPlaylists[0].files[0].metadataUrl)
            .then(data => data.json())
            .then(json => {
                setVideoSource(video.streamingPlaylists[0].files[0].fileUrl);
                player.currentTime = json.format.duration;
            })
            .catch(err => Alert.alert("error", err));
            */
    }, [video]);

    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
    });

    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    return (
        <>
            {video &&
                <ScrollView
                    style={styles.videoPlayerContainer}
                >
                    {video.isLive &&
                        <WebView
                            source={{
                                uri: `https://${video.channel.host}${video.embedPath}`
                            }}
                            style={{ marginTop: 20, minWidth: 100, minHeight: 300 }}
                        />
                    }

                    {!video.isLive &&
                        <>
                            <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
                            <View style={styles.controlsContainer}>
                                <Button
                                    title={isPlaying ? 'Pause' : 'Play'}
                                    onPress={() => {
                                        if (isPlaying) {
                                            player.pause();
                                        } else {
                                            player.play();
                                        }
                                    }}
                                />
                            </View>
                        </>
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