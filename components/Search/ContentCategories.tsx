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
import {useQuery} from "@tanstack/react-query";
import {getCategories} from "@/api/categories";

export const ContentCategories = (
    props: {
        onFiltersMenuButtonPress: () => void;
        sepiaSearch?: boolean;
    }
) => {
    const [categories, setCategories] = useState<string[]>([]);
    const theme = useTheme();
    const dispatch = useDispatch();
    const currentInstance = useSelector((state: RootState) => state.instances.currentInstance);

    const {data, isLoading} = useQuery({
        queryKey: ['categories', currentInstance],
        queryFn: getCategories,
        enabled: currentInstance !== "" && !props.sepiaSearch
    });

    useEffect(() => {
        if (props.sepiaSearch) {
            setCategories(SepiaSearchCategories);
            return;
        }
    }, []);

    useEffect(() => {
        if (!data) return;
        setCategories(["All", ...Object.values(data) as string[]]);
    }, [data]);

    return (
        <ScrollView horizontal={true} style={[styles.container, theme.dark
            ? {backgroundColor: Colors.dark.backgroundColor}
            : {backgroundColor: Colors.light.backgroundColor}]}>
            {isLoading && !props.sepiaSearch
                ? <ActivityIndicator size="large" color={Colors.emphasised.backgroundColor}/>
                :
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