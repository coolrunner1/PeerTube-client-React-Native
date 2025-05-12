import {StyleSheet, View, Pressable, ImageBackground, Alert} from "react-native";
import {ThemedText} from "@/components/Global/ThemedText";
import {Colors} from "@/constants/Colors";
import formatDuration from "@/utils/formatDuration"
import formatPublishedDate from "@/utils/formatPublishedDate";
import shortenVideoTitle from "@/utils/shortenVideoTitle";
import shortenChannelTitle from "@/utils/shortenChannelTitle";
import {useTransparentBackgroundColor} from "@/hooks/useTransparentBackgroundColor";


export const VideoEntry = (
    props: {
        title: string,
        thumbnail: string,
        publishedAt: string,
        views: number,
        channelDisplayName: string,
        duration: number,
        isLive?: boolean,
        nsfw?: boolean,
        onPress?: () => void,
    }
) => {
    const backgroundColor = useTransparentBackgroundColor();

    return (
        <Pressable
            onPress={props.onPress}
            onLongPress={() => {Alert.alert('Test', props.title)}}
            style={styles.entryContainer}
            >

            <ImageBackground
                style={styles.image}
                source={ !props.nsfw
                    ? { uri: props.thumbnail }
                    : require('@/assets/images/nsfw.png')
                }
            >
                {props.isLive ?
                    <View style={[styles.videoDuration, styles.live]}>
                        <ThemedText style={styles.durationText}>Live</ThemedText>
                    </View> :
                    <View style={[styles.videoDuration, {backgroundColor}]}>
                        <ThemedText style={styles.durationText}>{(formatDuration(props.duration))}</ThemedText>
                    </View>
                }
            </ImageBackground>
            <View style={{flexShrink: 1}}>
                <ThemedText style={styles.title}>{shortenVideoTitle(props.title)}</ThemedText>
                <ThemedText>{shortenChannelTitle(props.channelDisplayName)}</ThemedText>
                <ThemedText>{formatPublishedDate(props.publishedAt)} &#x2022; {props.views} views</ThemedText>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    entryContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "100%",
    },
    image: {
        width: 140,
        height: 80,
    },
    title: {
        fontWeight: "bold",
        marginBottom: 2
    },
    videoDuration: {
        flex: 1,
        alignItems: "center",
        borderRadius: 8,
        paddingHorizontal: 5,
        marginLeft: "auto",
        marginTop: "auto",
        marginRight: 3,
        marginBottom: 3,
        maxHeight: 20
    },
    durationText: {
        fontSize: 12,
        fontWeight: "bold",
        margin: "auto"
    },
    live: {
        backgroundColor: Colors.emphasised.backgroundColor,
        minWidth: 35,
    }
})