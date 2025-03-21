import {useEffect, useState} from "react";
import {ActivityIndicator, ScrollView, StyleSheet} from "react-native";
import {ThemedButton} from "@/components/Global/ThemedButton";
import {useTheme} from "@react-navigation/core";
import {Colors} from "@/constants/Colors";

export const ContentFilters = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [loaded, setLoaded] = useState(false);
    const theme = useTheme();

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
            {!loaded && <ActivityIndicator size="large" color={"#f9526c"}/>}
            {loaded &&
                categories.map((category, key) =>
                    <ThemedButton
                        key={key}
                        title={category}
                        onPress={() => {}}
                        style={styles.entry}
                        textStyle={styles.entryText}
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
    entry: {
        padding: 10,
        marginHorizontal: 5,
        minWidth: 70,
        width: "auto",
    },
    entryText: {
        fontSize: 15,
    }
})