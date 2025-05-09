import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, View} from "react-native";
import {VideoEntry} from "@/components/Video/VideoEntry";
import {Colors} from "@/constants/Colors";
import {VideoListEntry} from "@/types/VideoListEntry";

/**
 * Component with a list of videos
 * @param props.videos - An array of objects with type VideoListEntry
 * @param props.currentInstance - If not provided component assumes that it's used for Sepia Search
 * @param props.onRefresh - Calls the function that reacts to video list refresh
 * @param props.setCurrentVideo - Used to set currentVideo state to empty quotes
 * @param props.loading
 * @param props.endOfScreen
 * @param props.setEndOfScreen
 */
export const VideosList = (
    props: {
        videos: VideoListEntry[];
        currentInstance?: string;
        onRefresh: () => void;
        setCurrentVideo: (video: string) => void;
        loading: boolean;
        isFetchingNextPage: boolean;
        setEndOfScreen: () => void;
    }
) => {

    return (
        <View style={styles.flatListContainer}>
            <FlatList
                data={props.videos}
                keyExtractor={(item) => item.uuid}
                renderItem={({ item }) => (
                    <VideoEntry
                        title={item.name}
                        publishedAt={item.publishedAt}
                        views={item.views}
                        channelDisplayName={item.channel.displayName}
                        duration={item.duration}
                        isLive={item.isLive}
                        nsfw={item.nsfw}
                        thumbnail={props.currentInstance ?
                            `${props.currentInstance}${item.thumbnailPath}` : item.thumbnailUrl}
                        onPress={() => props.setCurrentVideo(props.currentInstance ?
                            `${props.currentInstance}/api/v1/videos/${item.uuid}` : `https://${item.channel.host}/api/v1/videos/${item.uuid}`)}
                    />
                )}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
                refreshControl={
                    <RefreshControl
                        refreshing={props.loading}
                        onRefresh={props.onRefresh}
                        colors={[Colors.emphasised.color]}
                        tintColor={Colors.emphasised.color}
                    />
                }
                style={{flex:1}}
                onScroll={(e)=>{
                    let paddingToBottom = 10;
                    paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                    if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
                        props.setEndOfScreen();
                    }
                }}
                ListFooterComponent={props.isFetchingNextPage ?
                    <ActivityIndicator color={Colors.emphasised.backgroundColor}/> : null}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    flatListContainer: {
        flex: 1,
        marginHorizontal: "auto",
        marginTop: 5,
        paddingHorizontal: 10,
        gap: 15,
        maxWidth: 900,
    },
});