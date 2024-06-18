import { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useQuery, gql } from "@apollo/client";

const SEARCH_USERS = gql`
  query SearchUsers($query: String!) {
    searchUsers(query: $query) {
      _id
      name
      username
      email
      avaUrl
    }
  }
`;

const SearchUser = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const { loading, error, data, refetch } = useQuery(SEARCH_USERS, {
    variables: { query: search },
    skip: !search,
  });

  const handleSearch = () => {
    if (search) {
      refetch();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search users..."
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={handleSearch}
      />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      <FlatList
        data={data ? data.searchUsers : []}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UserDetail", { userId: item._id })
            }
          >
            <View style={styles.userContainer}>
              <Image source={{ uri: item.avaUrl }} style={styles.avatar} />
              <Text style={styles.username}>{item.username}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
  },
});

export default SearchUser;
