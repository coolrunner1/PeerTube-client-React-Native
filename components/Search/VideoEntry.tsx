import {StyleSheet, View, Image, Pressable} from "react-native";
import {ThemedText} from "@/components/Global/ThemedText";
import {Colors} from "@/constants/Colors";


export const VideoEntry = (
    props: {
        title: string,
        thumbnail: string,
        publishedAt: string,
        views: number,
        channelDisplayName: string,
        isLive?: boolean,
        nsfw?: boolean,
        onPress?: () => void,
    }
) => {

    return (
        <Pressable
            onPress={props.onPress}
            style={styles.entryContainer}
            >

            <Image
                style={styles.image}
                source={ !props.nsfw
                    ? { uri: props.thumbnail }
                    : require('@/assets/images/nsfw.png')
                }
            />
            <View style={{flexShrink: 1}}>
                {props.isLive &&
                    <View style={styles.live}>
                        <ThemedText style={{fontWeight: "bold"}}>Live</ThemedText>
                    </View>
                }
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
    live: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.emphasised.backgroundColor,
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 5,
        marginRight: 2,
        maxWidth: 40
    }
})