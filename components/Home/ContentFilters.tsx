import {useEffect, useState} from "react";
import {ActivityIndicator, ScrollView, StyleSheet} from "react-native";
import {ThemedButton} from "@/components/Global/ThemedButton";
import {useTheme} from "@react-navigation/core";
import {Colors} from "@/constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedFilter} from "@/slices/filtersSlice";
import {ContentFilterButton} from "@/components/Home/ContentFilterButton";
import {RootState} from "@/state/store";

export const ContentFilters = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [loaded, setLoaded] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();
    const currentInstance = useSelector((state: RootState) => state.instances.currentInstance);

    useEffect(() => {
        fetch(`${currentInstance}/api/v1/videos/categories`)
            .then((res) => res.json())
            .then((json) => {setCategories(["All", ...Object.values(json) as string[]]); setLoaded(true);})
            .catch((error) => console.error(error));
    }, []);

    return (
        <ScrollView horizontal={true} style={[styles.container, theme.dark
            ? {backgroundColor: Colors.dark.backgroundColor}
            : {backgroundColor: Colors.light.backgroundColor}]}>
            {!loaded && <ActivityIndicator size="large" color={Colors.emphasised.backgroundColor}/>}
            {loaded &&
                categories.map((category, key) =>
                    <ContentFilterButton
                        key={key}
                        id={key}
                        title={category}
                        onPress={() => {dispatch(setSelectedFilter(key))}}
                    />)}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        maxHeight: 53,
        padding: 5,
        paddingTop: 8
    },
})