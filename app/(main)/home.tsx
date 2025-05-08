import {
    StyleSheet,
    ActivityIndicator,
    Animated,
    View,
} from "react-native";
import ScrollView = Animated.ScrollView;
import React, {useEffect, useState} from "react";
import {VideoPlayer} from "@/components/Video/VideoPlayer";
import {useTheme} from "@react-navigation/core";
import {Colors} from "@/constants/Colors";
import {VideoListEntry} from "@/types/VideoListEntry";
import {Header} from "@/components/Search/Header";
import {ContentCategories} from "@/components/Search/ContentCategories";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {SearchError} from "@/components/Search/SearchError";
import {HomeFiltersMenu} from "@/components/Search/HomeFiltersMenu";
import {VideosList} from "@/components/Video/VideosList";
import {getVideos} from "@/api/videos";

const HomeScreen = () => {
    const theme = useTheme();
    const [videos, setVideos] = useState<VideoListEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentVideo, setCurrentVideo] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [endOfScreen, setEndOfScreen] = useState<boolean>(false);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [minimized, setMinimized] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const selectedCategory = useSelector((state: RootState) => state.filters.selectedCategory);
    const currentInstance = useSelector((state: RootState) => state.instances.currentInstance);

    const backgroundColor = theme.dark ?  Colors.dark.backgroundColor : Colors.light.backgroundColor;

    const loadVideos = async (clearVideos: boolean) => {
        //getVideos()
        const controller = new AbortController();
        const signal = controller.signal;

        setTimeout(() => {
            controller.abort();
        }, 5000);

        await fetch(`${currentInstance}/api/v1/${search ? `search/` : ""}videos?${search ? `search=${search}` : ""}&start=${clearVideos ? 0 : videos.length}${selectedCategory ? `&categoryOneOf=${selectedCategory}` : ""}`, {signal})
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

    const closeVideo = () => setCurrentVideo("");

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
            {(!currentVideo || minimized) && !error &&
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
                            : <VideosList
                                videos={videos}
                                currentInstance={currentInstance}
                                onRefresh={onRefresh}
                                setCurrentVideo={setCurrentVideo}
                                loading={loading}
                                endOfScreen={endOfScreen}
                                setEndOfScreen={setEndOfScreen}
                            />
                        }
                    </View>
                </>
            }
            {currentVideo &&
                <VideoPlayer
                    videoUrl={currentVideo}
                    closeVideo={closeVideo}
                    minimized={minimized}
                    setMinimized={setMinimized}
                />
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
});

export default HomeScreen;