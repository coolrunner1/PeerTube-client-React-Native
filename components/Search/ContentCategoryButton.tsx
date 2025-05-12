import {Pressable, StyleSheet} from "react-native";
import {ThemedText} from "@/components/Global/ThemedText";
import {Colors} from "@/constants/Colors";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {useEffect, useState} from "react";
import {useBackgroundColor} from "@/hooks/useBackgroundColor";

export const ContentCategoryButton = (
    props: {
        id: number;
        title: string;
        sepiaSearch?: boolean;
        onPress: () => void;
    }
) => {
    const backgroundColor = useBackgroundColor({invert: true});
    const selectedCategory = useSelector((state: RootState)=> state.filters.selectedCategory);
    const selectedSepiaCategory = useSelector((state: RootState)=> state.filters.selectedSepiaCategory);
    const [selected, setSelected] = useState<boolean>(false);

    useEffect(() => {
        if (props.sepiaSearch) {
            return;
        }
        if (selectedCategory === props.id) {
            setSelected(true);
            return;
        }
        setSelected(false);
    }, [selectedCategory]);

    useEffect(() => {
        if (!props.sepiaSearch) {
            return;
        }
        if (selectedSepiaCategory === props.id) {
            setSelected(true);
            return;
        }
        setSelected(false);
    }, [selectedSepiaCategory]);

    return (
        <Pressable
            style={[
                styles.button,
                {backgroundColor},
                selected && {backgroundColor: Colors.emphasised.backgroundColor}
            ]}
            onPress={props.onPress}>
            <ThemedText style={styles.buttonText} inverseColor={true}>{props.title}</ThemedText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        minWidth: 70,
        width: "auto",
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 15,
        textAlign: "center",
        margin: 'auto'
    },
})
