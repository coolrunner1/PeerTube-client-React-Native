import {ThemedText} from "@/components/Global/ThemedText";
import {ThemedButton} from "@/components/Global/ThemedButton";
import {StyleSheet, View} from "react-native";
import {Colors} from "@/constants/Colors";
import {useTheme} from "@react-navigation/core";

export const SearchError = (
    props: {
        error: string;
        onReloadPress: () => void;
    }
) => {
    const theme = useTheme();

    const backgroundColor = theme.dark ?  Colors.dark.backgroundColor : Colors.light.backgroundColor;

    return (
        <View style={[styles.container, {backgroundColor: backgroundColor}]}>
                <ThemedText
                    style={{fontSize: 18, fontWeight: "bold", marginBottom: 5}}
                >Selected PeerTube instance might be down</ThemedText>
                <ThemedText style={{fontWeight: "bold"}}>Error message:</ThemedText>
                <ThemedText style={{color: "red"}}>{props.error}</ThemedText>
                <ThemedButton
                    title={"Reload"}
                    style={{marginTop: 10}}
                    onPress={props.onReloadPress}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});