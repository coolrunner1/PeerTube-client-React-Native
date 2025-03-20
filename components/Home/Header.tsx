import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/Global/ThemedText";

export const Header = () => {
    return (
        <View style={styles.header}>
            <ThemedText style={{fontWeight: "bold", fontSize: 20,}}>Trending</ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 15,
        backgroundColor: "#f9526c",
        maxHeight: 80,
    }
});