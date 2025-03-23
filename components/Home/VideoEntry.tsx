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
                source={ !props.nsfw ? {
                    uri: props.thumbnail,
                } : require('@/assets/images/nsfw.png')
                }
            />
            <View style={{flexShrink: 1}}>
                <ThemedText style={styles.title}>{props.title.substring(0, 60)+(props.title.length > 60 ? "..." : "")}</ThemedText>
                <ThemedText>
                    {props.isLive &&
                        <ThemedText style={{color: Colors.emphasised.color}}>Live </ThemedText>}{props.channelDisplayName}</ThemedText>
                <ThemedText>{new Date(props.publishedAt).toDateString().slice(4)} &#x2022; {props.views} views</ThemedText>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    entryContainer: {
        flex: 1,
        flexDirection: "row",
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
    }
})