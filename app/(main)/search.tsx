import {StyleSheet, ActivityIndicator, Animated, Button, View, RefreshControl, FlatList, Alert} from "react-native";
import ScrollView = Animated.ScrollView;
import {useEffect, useState} from "react";
import {VideoEntry} from "@/components/Search/VideoEntry";
import {VideoPlayer} from "@/components/Search/VideoPlayer";
import {useTheme} from "@react-navigation/core";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/Global/ThemedText";
import {SepiaSearchVideo} from "@/types/SepiaSearchVideo";
import {Header} from "@/components/Search/Header";
import {ContentFilters} from "@/components/Search/ContentFilters";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {ThemedButton} from "@/components/Global/ThemedButton";
import {SearchError} from "@/components/Search/SearchError";

const SepiaSearch = (navigation: any) => {
    const theme = useTheme();
    const [videos, setVideos] = useState<SepiaSearchVideo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [watch, setWatch] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [endOfScreen, setEndOfScreen] = useState<boolean>(false);
    const selectedFilter = useSelector((state: RootState) => state.filters.selectedFilter);

    const backgroundColor = theme.dark ?  Colors.dark.backgroundColor : Colors.light.backgroundColor;

    const loadVideos = async (clearVideos: boolean) => {
        await fetch(`https://sepiasearch.org/api/v1/search/videos?start=${clearVideos ? 0 : videos.length}${selectedFilter ? `&categoryOneOf=${selectedFilter}` : ""}`)
            .then((res) => res.json())
            .then((json) => {
                setVideos(clearVideos ? json.data : [...videos, ...json.data]);
                setLoading(false);
            })
            .catch((err) => {console.error(err); setError(err.toString())});
        setEndOfScreen(false);
    };

    const onRefresh = async () => {
        setLoading(true);
        await loadVideos(true);
    };

    const onReloadPress = async () => {
        setError("");
        await loadVideos(true);
    };

    useEffect(() => {
        setLoading(true);
        loadVideos(true);
    }, [selectedFilter]);

    useEffect(() => {
        loadVideos(false);
    }, [endOfScreen]);

    useEffect(() => {
        Alert.alert('Warning', 'Sepia search is a global search utility that gathers videos from hundreds of instances. You might come across illegal content, nsfw content and insane conspiracy theories. Proceed with discretion.', [
            {text: 'OK'},
        ]);
    }, []);

    return (
        <>
            {loading && error &&
                <SearchError error={error} onReloadPress={onReloadPress}/>
            }
            {watch &&
                <ScrollView
                    style={{marginTop: 20 }}>
                    <Button
                        title="Back"
                        onPress={() => {setWatch("")}}
                    />
                    <VideoPlayer embedPath={watch} />
                </ScrollView>
            }
            {!watch && !error &&
                <>
                    <Header />
                    <ContentFilters
                        onFiltersMenuButtonPress={() => {}}
                    />
                    {/*
                    <FontAwesome name={"search"} size={50} color={"white"}/>
                    <FontAwesome name={"compass"} size={50} color={"white"}/>
                    */}
                    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
                        {loading &&
                            <ActivityIndicator color={Colors.emphasised.backgroundColor} size={"large"}/>
                        }
                        {!loading &&
                            <View style={styles.flatListContainer}>
                                <FlatList
                                    data={videos.filter((video: SepiaSearchVideo) => !video.embedUrl.includes("pocketnet.app") && !video.embedUrl.includes("pony"))}
                                    keyExtractor={(item) => item.uuid}
                                    renderItem={({ item }) => (
                                        <VideoEntry
                                            title={item.name}
                                            thumbnail={item.thumbnailUrl}
                                            publishedAt={item.publishedAt}
                                            views={item.views}
                                            channelDisplayName={item.channel.displayName}
                                            onPress={() => setWatch(item.embedUrl)}
                                            isLive={item.isLive}
                                            nsfw={item.nsfw}
                                        />
                                    )}
                                    ItemSeparatorComponent={() => <View style={{height: 10}} />}
                                    style={{flex:1}}
                                    onScroll={(e)=>{
                                        let paddingToBottom = 10;
                                        paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                                        if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
                                            setEndOfScreen(true);
                                        }
                                    }}
                                    ListFooterComponent={endOfScreen ? <ActivityIndicator color={Colors.emphasised.backgroundColor}/> : <></>}
                                />
                            </View>
                        }
                    </View>
                </>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    flatListContainer: {
        flex: 1,
        marginHorizontal: "auto",
        marginTop: 5,
        paddingHorizontal: 10,
        gap: 15,
        maxWidth: 900,
    }
});

export default SepiaSearch;