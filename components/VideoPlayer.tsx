import WebView from "react-native-webview";
import {ScrollView, StyleSheet,} from 'react-native';

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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    videoPlayerContainer: {
        flex: 1,
    }
});