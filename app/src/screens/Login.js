import { useContext, useState } from "react";
import { View, Image, Text, TextInput, Button, StyleSheet } from "react-native";
import { useMutation, gql } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../context/auth";

const LOGIN_MUTATION = gql`
  mutation Mutation($credentials: LoginInput) {
    login(credentials: $credentials) {
      token
      _id
    }
  }
`;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN_MUTATION);
  const auth = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const { data } = await login({
        variables: {
          credentials: {
            email,
            password,
          },
        },
      });
      await SecureStore.setItemAsync("access_token", data.login.token);
      await SecureStore.setItemAsync("_id", data.login._id);
     
      auth.setIsSignedIn(true);
    } catch (error) {
      console.error(error.graphQLErrors[0].message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          style={styles.image}
          source={require("../../assets/FacebookName.png")}
        />
      </View>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.registerContainer}>
        <Text>Don't have an account? </Text>
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  image: {
    width: 325,
    height: 100,
    justifyContent: "center",
    textAlign: "center",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});

export default Login;
