import {useEffect, useState} from "react";
import {ActivityIndicator, ScrollView, StyleSheet} from "react-native";
import {ThemedButton} from "@/components/Global/ThemedButton";
import {useTheme} from "@react-navigation/core";
import {Colors} from "@/constants/Colors";
import {useDispatch} from "react-redux";
import {setSelectedFilter} from "@/slices/filtersSlice";
import {ContentFilterButton} from "@/components/Home/ContentFilterButton";

export const ContentFilters = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [loaded, setLoaded] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();

    useEffect(() => {
        fetch("https://tinkerbetter.tube/api/v1/videos/categories")
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
        marginTop: 5,
        maxHeight: 50,
        padding: 5,
    },
})