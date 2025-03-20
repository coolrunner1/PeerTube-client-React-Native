import {StyleSheet, View, Image, Pressable} from "react-native";
import {ThemedText} from "@/components/Global/ThemedText";


export const VideoEntry = (
    props: {
        title: string,
        thumbnail: string,
        publishedAt: string,
        views: number,
        channelDisplayName: string,
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
                source={{
                    uri: props.thumbnail,
                }}
            />
            <View style={{flexShrink: 1}}>
                <ThemedText style={{fontWeight: "bold", marginBottom: 2}}>{props.title.substring(0, 70)+(props.title.length > 70 ? "..." : "")}</ThemedText>
                <ThemedText>{props.channelDisplayName}</ThemedText>
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
    }
})