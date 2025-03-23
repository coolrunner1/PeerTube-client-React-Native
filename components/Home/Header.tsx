import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/Global/ThemedText";
import {Colors} from "@/constants/Colors";
import {FontAwesome} from "@expo/vector-icons";

export const Header = () => {
    return (
        <View style={styles.header}>
            <FontAwesome name={"compass"} size={40} color={"white"}/>
            <ThemedText style={{fontWeight: "bold", fontSize: 20,}}>Trending</ThemedText>
            <FontAwesome name={"search"} size={30} color={"white"}/>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 15,
        backgroundColor: Colors.emphasised.backgroundColor,
        maxHeight: 80,
    }
});