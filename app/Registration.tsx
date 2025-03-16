import {Button} from "react-native";

export default function Registration({navigation}: {navigation: any}) {

    return (
        <>
            <Button title={"Back"} onPress={() => navigation.goBack()}/>
        </>
    );
};