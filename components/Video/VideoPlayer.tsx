import WebView from "react-native-webview";
import {
    ActivityIndicator,
    Dimensions,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
    Text,
    BackHandler,
} from 'react-native';
import {ThemedText} from "@/components/Global/ThemedText";
import {useVideoPlayer, VideoView} from "expo-video";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {useKeepAwake} from "expo-keep-awake";
import formatPublishedDate from "@/utils/formatPublishedDate";
import {Colors} from "@/constants/Colors";
import {FontAwesome6} from "@expo/vector-icons";
import shortenVideoTitle from "@/utils/shortenVideoTitle";
import {setCurrentVideo} from "@/slices/videoPlayerSlice";
import {useQuery} from "@tanstack/react-query";
import {getVideo} from "@/api/videos";
import {ErrorView} from "@/components/Global/ErrorView";
import {ThemedView} from "@/components/Global/ThemedView";
import {useTextColor} from "@/hooks/useTextColor";
import {useCheckLandscape} from "@/hooks/useCheckLandscape";

export const VideoPlayer = (
    props: {
        videoUrl: string,
    }
) => {
    useKeepAwake();
    const color = useTextColor();
    const isLandscape = useCheckLandscape();

    const [videoSource, setVideoSource] = useState<string>("");
    const [minimized, setMinimized] = useState(false);
    const dispatch = useDispatch();
    const preferredPlayer = useSelector((state: RootState) => state.userPreferences.preferredPlayer);

    const {data, isLoading, isError, error, refetch} = useQuery({
        queryKey: ["video", props.videoUrl],
        queryFn: getVideo,
    });

    const closeVideo = () => {
        dispatch(setCurrentVideo(""));
    };

    useEffect(() => {
        const backAction = () => {
            if (!minimized) {
                setMinimized(true);
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        //console.log(data);
        if (!data) {
            return;
        }
        if (preferredPlayer === "Web") {
            setVideoSource("");
            return;
        }
        if (Platform.OS !== "web" && typeof(data.streamingPlaylists[0]) !== "undefined") {
            setVideoSource(data.streamingPlaylists[0].playlistUrl);
            return;
        }
        if (data.files.length > 0) {
            setVideoSource(data.files[0].fileUrl);
            return;
        }
        setVideoSource(data.streamingPlaylists[0].files[0].fileUrl);
    }, [data, preferredPlayer]);

    const player = useVideoPlayer(videoSource, player => {
        player.play();
    });

    return (
        <ThemedView
            style={[!minimized ? styles.videoPlayerContainer : styles.videoPlayerContainerMinimized]}
        >
            {!minimized &&
                <View style={styles.buttonsContainer}>
                    <FontAwesome6 name={"chevron-down"} size={35} color={Colors.light.backgroundColor} onPress={() => setMinimized(true)} />
                    {data &&
                        <View style={styles.topVideoTitleContainer} >
                            <Text style={styles.topVideoTitle}>{shortenVideoTitle(data.name)}</Text>
                        </View>
                    }
                    <FontAwesome6 name={"xmark"} size={35} color={Colors.light.backgroundColor} onPress={closeVideo} />
                </View>
            }
            {isError && (!minimized
                    ? <ErrorView error={error.toString()} onReloadPress={refetch} />
                    : <Pressable onPress={closeVideo} style={{flex: 1}}>
                        <ThemedText style={{margin: 'auto'}}>{error.toString()}</ThemedText>
                    </Pressable>
            )
            }
            {isLoading &&
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color={Colors.emphasised.backgroundColor} style={{margin: 'auto'}} size={"large"}/>
                    {minimized && <FontAwesome6 name={"xmark"} size={35} color={color} onPress={closeVideo} />}
                </View>
            }
            {data && !isError &&
                <View style={minimized || isLandscape
                        ? {flexDirection: "row"}
                        : {flexDirection: "column"}
                }>
                    {preferredPlayer === "Web" ?
                        <View style={minimized ? [styles.videoMinimized, styles.videoWebMinimized]
                            : isLandscape ? styles.videoLandscape : styles.video}>
                            <WebView
                                allowsFullscreenVideo={true}
                                source={{
                                    uri: `https://${data.channel.host}${data.embedPath}`
                                }}
                            />
                        </View>
                        :
                        <VideoView
                            style={minimized ? styles.videoMinimized
                                : isLandscape ? styles.videoLandscape : styles.video}
                            player={player}
                            allowsFullscreen
                            allowsPictureInPicture
                            startsPictureInPictureAutomatically
                        />
                    }
                    {!minimized &&
                        <View style={{height: "100%"}}>
                            <ScrollView style={isLandscape ? {height: "80%"} : null}>
                                <ThemedText>Work in progress</ThemedText>
                                <ThemedText>Published at: {formatPublishedDate(data.publishedAt)}</ThemedText>
                                <ThemedText>Title: {data.name}</ThemedText>
                                <ThemedText>Description: {data.truncatedDescription}</ThemedText>
                                <ThemedText>Views: {data.views}</ThemedText>
                                <ThemedText>Likes: {data.likes}</ThemedText>
                                <ThemedText>Dislikes: {data.dislikes}</ThemedText>
                                <ThemedText>Tags:</ThemedText>
                                {data.tags.map((tag: string, key) => <ThemedText key={key}>{tag}</ThemedText>)}
                                {data.language.label !== "Unknown" && <ThemedText>Language: {data.language.label}</ThemedText>}
                            </ScrollView>
                        </View>
                    }
                    {minimized &&
                        <Pressable style={styles.minimizedDetailsContainer} onPress={() => setMinimized(false)}>
                            <View style={styles.minimizedVideoTitleContainer} >
                                <ThemedText style={styles.minimizedVideoTitle}>{shortenVideoTitle(data.name)}</ThemedText>
                            </View>
                            <FontAwesome6 name={"xmark"} size={35} color={color} onPress={closeVideo} />
                        </Pressable>
                    }
                </View>
            }
        </ThemedView>
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
    videoLandscape: {
        width: "55%",
        height: "70%",
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
        maxWidth: '78%',
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
        maxWidth: '78%',
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