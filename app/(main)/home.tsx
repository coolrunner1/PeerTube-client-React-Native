import {
    StyleSheet,
    ActivityIndicator,
    View,
} from "react-native";
import React, {useEffect, useMemo, useState} from "react";
import {useTheme} from "@react-navigation/core";
import {Colors} from "@/constants/Colors";
import {VideoListEntry} from "@/types/VideoListEntry";
import {Header} from "@/components/Search/Header";
import {ContentCategories} from "@/components/Search/ContentCategories";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {ErrorView} from "@/components/Global/ErrorView";
import {HomeFiltersMenu} from "@/components/Search/HomeFiltersMenu";
import {VideosList} from "@/components/Video/VideosList";
import {fetchVideos} from "@/api/videos";
import { setCurrentVideo } from "@/slices/videoPlayerSlice";
import {useInfiniteQuery} from "@tanstack/react-query";
import {queryClient} from "@/api/queryClient";

const HomeScreen = () => {
    const theme = useTheme();
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const dispatch = useDispatch();
    const selectedCategory = useSelector((state: RootState) => state.filters.selectedCategory);
    const currentInstance = useSelector((state: RootState) => state.instances.currentInstance);

    const backgroundColor = theme.dark ?  Colors.dark.backgroundColor : Colors.light.backgroundColor;

    const queryKey = useMemo(() =>
        ['videos', currentInstance, selectedCategory, search],
        [currentInstance, selectedCategory, search]);

    const {
        data,
        isLoading,
        error,
        isError,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        refetch
    } = useInfiniteQuery({
        queryKey,
        queryFn: fetchVideos,
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.data.length === 0) return undefined;
            return pages.flatMap(p => p.data).length;
        },
        //gcTime: 60000,
        enabled: currentInstance !== "",
    });

    const videos:Map<string, VideoListEntry> = useMemo(() => {
        return new Map(
            data?.pages.flatMap(page =>
                page.data.map(video => [video.uuid, video])
            ) ?? []
        );
    }, [data?.pages]);

    const onRefresh = () => {
        queryClient.removeQueries({queryKey});
        refetch();
    }

    useEffect(() => {
        refetch()
    }, [selectedCategory, search, currentInstance]);

    return (
        <>
            {!isLoading && isError &&
                <ErrorView error={error.toString()} onReloadPress={onRefresh} />
            }
            {!isError &&
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
                        {isLoading
                            ? <ActivityIndicator color={Colors.emphasised.backgroundColor} size={"large"}/>
                            : <VideosList
                                videos={[...videos.values()]}
                                currentInstance={currentInstance}
                                onRefresh={onRefresh}
                                setCurrentVideo={(e) => dispatch(setCurrentVideo(e))}
                                loading={isLoading}
                                isFetchingNextPage={isFetchingNextPage}
                                setEndOfScreen={() => {
                                    if (hasNextPage && !isFetchingNextPage) {
                                        fetchNextPage();
                                    }
                                }}
                            />
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
});

export default HomeScreen;