import {StyleSheet, ActivityIndicator, Animated, Button, View, RefreshControl, FlatList, Alert} from "react-native";
import ScrollView = Animated.ScrollView;
import React, {useEffect, useRef, useState} from "react";
import {VideoEntry} from "@/components/Search/VideoEntry";
import {VideoPlayer} from "@/components/Search/VideoPlayer";
import {useTheme} from "@react-navigation/core";
import {Colors} from "@/constants/Colors";
import {SepiaSearchVideo} from "@/types/SepiaSearchVideo";
import {Header} from "@/components/Search/Header";
import {ContentCategories} from "@/components/Search/ContentCategories";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {SearchError} from "@/components/Search/SearchError";
import {BlockedInstances} from "@/constants/BlockedInstances";

const SepiaSearch = (navigation: any) => {
    const theme = useTheme();
    const [videos, setVideos] = useState<SepiaSearchVideo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [video, setVideo] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [endOfScreen, setEndOfScreen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const selectedCategory = useSelector((state: RootState) => state.filters.selectedCategory);
    const blockedInstances = useRef<string>(BlockedInstances.join("&blockedHosts[]="));

    const backgroundColor = theme.dark ?  Colors.dark.backgroundColor : Colors.light.backgroundColor;

    const loadVideos = async (clearVideos: boolean) => {
        await fetch(`https://sepiasearch.org/api/v1/search/videos?${search ? `search=${search}&` : ""}start=${clearVideos ? 0 : videos.length}${selectedCategory ? `&categoryOneOf=${selectedCategory}` : ""}&blockedHosts[]=${blockedInstances.current}&blockedAccounts=equiphile`)
            .then((res) => res.json())
            .then((json) => {
                setVideos(clearVideos ? json.data : [...videos, ...json.data]);
                setLoading(false);
            })
            .catch((err) => {console.error(err); setError(err.toString())});
        setEndOfScreen(false);
        console.log(videos);
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
    }, [selectedCategory, search]);

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
            {video &&
                <ScrollView
                    style={{marginTop: 20 }}>
                    <Button
                        title="Back"
                        onPress={() => {setVideo("")}}
                    />
                    <VideoPlayer videoUrl={video} />
                </ScrollView>
            }
            {!video && !error &&
                <>
                    <Header setSearch={setSearch} title={"Sepia Search"} />
                    <ContentCategories
                        onFiltersMenuButtonPress={() => {}}
                        sepiaSearch={true}
                    />
                    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
                        {loading &&
                            <ActivityIndicator color={Colors.emphasised.backgroundColor} size={"large"}/>
                        }
                        {!loading &&
                            <View style={styles.flatListContainer}>
                                <FlatList
                                    data={videos.filter((video: SepiaSearchVideo) => !(video.embedUrl.includes("pony") && video.nsfw))}
                                    keyExtractor={(item) => item.uuid}
                                    renderItem={({ item }) => (
                                        <VideoEntry
                                            title={item.name}
                                            thumbnail={item.thumbnailUrl}
                                            publishedAt={item.publishedAt}
                                            views={item.views}
                                            channelDisplayName={item.channel.displayName}
                                            onPress={() => setVideo(`https://${item.channel.host}/api/v1/videos/${item.uuid}`)}
                                            isLive={item.isLive}
                                            nsfw={item.nsfw}
                                        />
                                    )}
                                    ItemSeparatorComponent={() => <View style={{height: 10}} />}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={loading}
                                            onRefresh={onRefresh}
                                            colors={[Colors.emphasised.color]}
                                            tintColor={Colors.emphasised.color}
                                        />
                                    }
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