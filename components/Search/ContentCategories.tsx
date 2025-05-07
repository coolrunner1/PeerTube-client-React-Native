import {useEffect, useState} from "react";
import {ActivityIndicator, ScrollView, StyleSheet} from "react-native";
import {useTheme} from "@react-navigation/core";
import {Colors} from "@/constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedCategory, setSelectedSepiaCategory} from "@/slices/filtersSlice";
import {ContentCategoryButton} from "@/components/Search/ContentCategoryButton";
import {RootState} from "@/state/store";
import {IconButton} from "@/components/Global/IconButton";
import {SepiaSearchCategories} from "@/constants/SepiaSearchCategories";

export const ContentCategories = (
    props: {
        onFiltersMenuButtonPress: () => void;
        sepiaSearch?: boolean;
    }
) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [loaded, setLoaded] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();
    const currentInstance = useSelector((state: RootState) => state.instances.currentInstance);

    useEffect(() => {
        if (props.sepiaSearch) {
            setCategories(SepiaSearchCategories);
            setLoaded(true);
            return;
        }
        if (!currentInstance) return;
        fetch(`${currentInstance}/api/v1/videos/categories`)
            .then((res) => res.json())
            .then((json) => {setCategories(["All", ...Object.values(json) as string[]]); setLoaded(true);})
            .catch((error) => console.error(error));
    }, [currentInstance]);

    return (
        <ScrollView horizontal={true} style={[styles.container, theme.dark
            ? {backgroundColor: Colors.dark.backgroundColor}
            : {backgroundColor: Colors.light.backgroundColor}]}>
            {!loaded && <ActivityIndicator size="large" color={Colors.emphasised.backgroundColor}/>}
            {loaded &&
                <>
                    <IconButton
                        name={"filter"}
                        onPress={props.onFiltersMenuButtonPress}
                    />
                    {categories.map((category, key) =>
                        <ContentCategoryButton
                            key={key}
                            id={key}
                            title={category}
                            sepiaSearch={props.sepiaSearch}
                            onPress={() => {
                                props.sepiaSearch
                                    ? dispatch(setSelectedSepiaCategory(key))
                                    : dispatch(setSelectedCategory(key))
                            }
                            }
                        />)
                    }
                </>
            }
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