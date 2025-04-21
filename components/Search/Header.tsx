import {NativeSyntheticEvent, StyleSheet, TextInputKeyPressEventData, View} from "react-native";
import {ThemedText} from "@/components/Global/ThemedText";
import {Colors} from "@/constants/Colors";
import {FontAwesome6} from "@expo/vector-icons";
import {useState} from "react";
import {ThemedInput} from "@/components/Global/ThemedInput";

export const Header = (
    props: {
        title: string;
        setSearch: (value: string) => void;
    }
) => {
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    return (
        <View style={styles.header}>
            {showSearch ?
                <>
                    <FontAwesome6 name={"xmark"} size={25} color={"white"}
                                  onPress={() => {setShowSearch(false); props.setSearch("")}} />
                    <ThemedInput style={styles.searchBar} placeholder={"Search"} onChangeText={setSearch} value={search} onSubmitEditing={() => props.setSearch(search)}/>
                    <FontAwesome6 name={"magnifying-glass"} size={25} color={"white"}
                                  onPress={() => props.setSearch(search)}/>
                </> :
                <>
                    <View style={{padding: 10}}></View>
                    <ThemedText style={{fontWeight: "bold", fontSize: 20}}>{props.title}</ThemedText>
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
        paddingHorizontal: 12,
        paddingTop: 27,
        backgroundColor: Colors.emphasised.backgroundColor,
        maxHeight: 80,
    },
    searchBar: {
        marginHorizontal: 10,
    }
});