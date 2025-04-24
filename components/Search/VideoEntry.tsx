import {StyleSheet, View, Pressable, ImageBackground} from "react-native";
import {ThemedText} from "@/components/Global/ThemedText";
import {Colors} from "@/constants/Colors";
import {useTheme} from "@react-navigation/core";


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

    const theme = useTheme();

    const backgroundColor = theme.dark ? Colors.darkTransparent.backgroundColor : Colors.lightTransparent.backgroundColor;

    const formatDuration = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (!hrs) {
            return [
                mins.toString().padStart(2, '0'),
                secs.toString().padStart(2, '0')
            ].join(':');
        }

        return [
            hrs.toString().padStart(2, '0'),
            mins.toString().padStart(2, '0'),
            secs.toString().padStart(2, '0')
        ].join(':');
    }

    return (
        <Pressable
            onPress={props.onPress}
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
                        <ThemedText style={{fontWeight: "bold"}}>Live</ThemedText>
                    </View> :
                    <View style={[styles.videoDuration, {backgroundColor: backgroundColor}]}>
                        <ThemedText style={{fontWeight: "bold"}}>{(formatDuration(props.duration))}</ThemedText>
                    </View>
                }
            </ImageBackground>
            <View style={{flexShrink: 1}}>
                <ThemedText style={styles.title}>{props.title.substring(0, 60)+(props.title.length > 60 ? "..." : "")}</ThemedText>
                <ThemedText>{props.channelDisplayName.substring(0, 25)+(props.channelDisplayName.length > 25 ? "..." : "")}</ThemedText>
                <ThemedText>{new Date(props.publishedAt).toDateString().slice(4)} &#x2022; {props.views} views</ThemedText>
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
        borderRadius: 10,
        paddingHorizontal: 5,
        marginLeft: "auto",
        marginTop: "auto",
        marginRight: 3,
        marginBottom: 3,
        maxHeight: 20
    },
    live: {
        backgroundColor: Colors.emphasised.backgroundColor,
        maxWidth: 40,
    }
})