import WebView from "react-native-webview";
import {ScrollView, StyleSheet,} from 'react-native';
import {ThemedText} from "@/components/Global/ThemedText";
import Video from "react-native-video";

export const VideoPlayer = (
    props : {
        embedPath: string,
    }
) => {
    return (
        <ScrollView
            style={styles.videoPlayerContainer}
        >
            <WebView
                source={{
                    uri: props.embedPath
                }}
                style={{ marginTop: 20, minWidth: 100, minHeight: 300 }}
            />
            {/*
            <Video
            source={{uri: ""}}/>
            */}


            <ThemedText>Work in progress</ThemedText>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    videoPlayerContainer: {
        flex: 1,
    }
});