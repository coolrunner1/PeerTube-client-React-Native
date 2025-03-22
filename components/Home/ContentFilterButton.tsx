import {Pressable, StyleSheet} from "react-native";
import {ThemedText} from "@/components/Global/ThemedText";
import {useTheme} from "@react-navigation/core";
import {Colors} from "@/constants/Colors";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {useEffect, useState} from "react";

export const ContentFilterButton = (
    props: {
        id: number;
        title: string;
        onPress: () => void;
    }
) => {
    const theme = useTheme();
    const selectedFilter = useSelector((state: RootState)=> state.filters.selectedFilter);
    const [selected, setSelected] = useState<boolean>(false);

    useEffect(() => {
        if (selectedFilter === props.id) {
            setSelected(true);
            return;
        }
        setSelected(false);
    }, [selectedFilter]);

    return (
        <Pressable
            style={[
                styles.button,
                theme.dark
                    ? {backgroundColor: Colors.light.backgroundColor}
                    : {backgroundColor: Colors.dark.backgroundColor},
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
        padding: 10,
        marginHorizontal: 5,
        minWidth: 70,
        width: "auto",
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 15,
        textAlign: "center",
    },
})
