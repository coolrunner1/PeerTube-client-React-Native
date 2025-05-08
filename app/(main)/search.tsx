import {
    StyleSheet,
    ActivityIndicator,
    Animated,
    View,
    Alert
} from "react-native";
import ScrollView = Animated.ScrollView;
import React, {useEffect, useRef, useState} from "react";
import {VideoPlayer} from "@/components/Video/VideoPlayer";
import {useTheme} from "@react-navigation/core";
import {Colors} from "@/constants/Colors";
import {Header} from "@/components/Search/Header";
import {ContentCategories} from "@/components/Search/ContentCategories";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {SearchError} from "@/components/Search/SearchError";
import {BlockedInstances} from "@/constants/BlockedInstances";
import {VideoListEntry} from "@/types/VideoListEntry";
import {VideosList} from "@/components/Video/VideosList";

const SepiaSearch = () => {
    const theme = useTheme();
    const [videos, setVideos] = useState<VideoListEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentVideo, setCurrentVideo] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [endOfScreen, setEndOfScreen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [minimized, setMinimized] = useState<boolean>(false);
    const selectedCategory = useSelector((state: RootState) => state.filters.selectedSepiaCategory);
    const blockedInstances = useRef<string>(BlockedInstances.join("&blockedHosts[]="));

    const backgroundColor = theme.dark ?  Colors.dark.backgroundColor : Colors.light.backgroundColor;

    const loadVideos = async (clearVideos: boolean) => {
        await fetch(`https://sepiasearch.org/api/v1/search/videos?${search ? `search=${search}&` : ""}start=${clearVideos ? 0 : videos.length}${selectedCategory ? `&categoryOneOf=${selectedCategory}` : ""}&blockedHosts[]=${blockedInstances.current}`)
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
            {(!currentVideo || minimized) && !error &&
                <>
                    <Header setSearch={setSearch} search={search} title={"Sepia Search"} />
                    <ContentCategories
                        onFiltersMenuButtonPress={() => {}}
                        sepiaSearch={true}
                    />
                    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
                        {loading &&
                            <ActivityIndicator color={Colors.emphasised.backgroundColor} size={"large"}/>
                        }
                        {!loading &&
                            <VideosList
                                videos={videos}
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