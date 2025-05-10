import {ThemedText} from "@/components/Global/ThemedText";
import {ThemedButton} from "@/components/Global/ThemedButton";
import {StyleSheet} from "react-native";
import {ThemedView} from "@/components/Global/ThemedView";

export const ErrorView = (
    props: {
        error: string;
        onReloadPress: () => void;
    }
) => {

    return (
        <ThemedView style={styles.container}>
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
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});