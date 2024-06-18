import { useContext } from "react";
import AuthContext from "../context/auth";
import { Text, TouchableOpacity } from "react-native";
import * as SecureStore from 'expo-secure-store'

export default function LogOutButton() {
    const auth = useContext(AuthContext)
    return(
        <TouchableOpacity onPress={async () => {
            await SecureStore.deleteItemAsync("access_token")
            auth.setIsSignedIn(false)
            // console.log(auth.setIsSignedIn);
        }}>
            <Text style={{
                fontWeight: "bold",
                textAlign: "center"
            }}>Logout</Text>
        </TouchableOpacity>
    )
}