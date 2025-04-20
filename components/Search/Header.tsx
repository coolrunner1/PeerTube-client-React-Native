import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/Global/ThemedText";
import {Colors} from "@/constants/Colors";
import {FontAwesome6} from "@expo/vector-icons";
import {useState} from "react";
import {ThemedInput} from "@/components/Global/ThemedInput";

export const Header = (
    props: {
        setSearch: (value: string) => void;
    }
) => {
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    const onSearchButtonPress = () => {
        props.setSearch(search);
    }

    return (
        <View style={styles.header}>
            {showSearch ?
                <>
                    <FontAwesome6 name={"xmark"} size={25} color={"white"} onPress={() => setShowSearch(false)} />
                    <ThemedInput style={styles.searchBar} placeholder={"Search"} onChangeText={setSearch} value={search}/>
                    <FontAwesome6 name={"magnifying-glass"} size={25} color={"white"} onPress={onSearchButtonPress} />
                </> :
                <>
                    <View style={{padding: 10}}></View>
                    <ThemedText style={{fontWeight: "bold", fontSize: 20}}>Trending</ThemedText>
                    <FontAwesome6 name={"magnifying-glass"} size={25} color={"white"} onPress={() => setShowSearch(true)} />
                </>
                }
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
        paddingTop: 25,
        backgroundColor: Colors.emphasised.backgroundColor,
        maxHeight: 80,
    },
    searchBar: {
        marginHorizontal: 7,
    }
});