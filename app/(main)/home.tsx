import {
    StyleSheet,
    ActivityIndicator,
    Animated,
    Button,
    View,
    FlatList, RefreshControl,
} from "react-native";
import ScrollView = Animated.ScrollView;
import React, {useEffect, useState} from "react";
import {VideoEntry} from "@/components/Search/VideoEntry";
import {VideoPlayer} from "@/components/Search/VideoPlayer";
import {useTheme} from "@react-navigation/core";
import {Colors} from "@/constants/Colors";
import {VideoListEntry} from "@/types/VideoListEntry";
import {Header} from "@/components/Search/Header";
import {ContentCategories} from "@/components/Search/ContentCategories";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {SearchError} from "@/components/Search/SearchError";
import {HomeFiltersMenu} from "@/components/Search/HomeFiltersMenu";

const HomeScreen = () => {
    const theme = useTheme();
    const [videos, setVideos] = useState<VideoListEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentVideo, setCurrentVideo] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [endOfScreen, setEndOfScreen] = useState<boolean>(false);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const selectedCategory = useSelector((state: RootState) => state.filters.selectedCategory);
    const currentInstance = useSelector((state: RootState) => state.instances.currentInstance);

    const backgroundColor = theme.dark ?  Colors.dark.backgroundColor : Colors.light.backgroundColor;

    const loadVideos = async (clearVideos: boolean) => {
        await fetch(`${currentInstance}/api/v1/${search ? `search/` : ""}videos?${search ? `search=${search}` : ""}&start=${clearVideos ? 0 : videos.length}${selectedCategory ? `&categoryOneOf=${selectedCategory}` : ""}`)
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
        if (!currentInstance) return;
        if (error) setError("");
        setLoading(true);
        loadVideos(true);
    }, [selectedCategory, search, currentInstance]);

    useEffect(() => {
        if (!currentInstance) return;
        loadVideos(false);
    }, [endOfScreen]);

    return (
        <>
            {loading && error &&
                <SearchError error={error} onReloadPress={onReloadPress}/>
            }
            {currentVideo &&
                <ScrollView
                style={{marginTop: 20 }}>
                    <Button
                        title="Back"
                        onPress={() => {setCurrentVideo("")}}
                    />
                    <VideoPlayer videoUrl={currentVideo} />
                </ScrollView>
            }
            {!currentVideo && !error &&
                <>
                    <Header setSearch={setSearch} search={search} title={"Trending"}/>
                    <ContentCategories
                        onFiltersMenuButtonPress={() => setShowFilters(true)}
                    />
                    <HomeFiltersMenu
                        showFilters={showFilters}
                        onCloseButtonPress={() => setShowFilters(false)}
                    />
                    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
                        {loading
                            ? <ActivityIndicator color={Colors.emphasised.backgroundColor} size={"large"}/>
                            : <View style={styles.flatListContainer}>
                                <FlatList
                                    data={videos}
                                    keyExtractor={(item) => item.uuid}
                                    renderItem={({ item }) => (
                                        <VideoEntry
                                            title={item.name}
                                            thumbnail={`${currentInstance}${item.thumbnailPath}`}
                                            publishedAt={item.publishedAt}
                                            views={item.views}
                                            channelDisplayName={item.channel.displayName}
                                            duration={item.duration}
                                            onPress={() => setCurrentVideo(`${currentInstance}/api/v1/videos/${item.uuid}`)}
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
    },
});

export default HomeScreen;