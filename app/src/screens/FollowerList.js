import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useQuery, gql } from "@apollo/client";

const GET_FOLLOWERS = gql`
  query GetFollowers($findFollowerId: ID!) {
    findFollower(id: $findFollowerId) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
      follower {
        _id
        name
        username
        email
        avaUrl
      }
    }
  }
`;

const FollowersList = ({ route, navigation }) => {
  const { userId } = route.params;
  const { loading, error, data } = useQuery(GET_FOLLOWERS, {
    variables: { findFollowerId: userId },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data.findFollower}
        keyExtractor={(item) => item.follower._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UserDetail", { userId: item.follower._id })
            }
          >
            <View style={styles.userContainer}>
              {item.follower.avaUrl && (
                <Image
                  source={{ uri: item.follower.avaUrl }}
                  style={styles.avatar}
                />
              )}
              <Text style={styles.username}>{item.follower.username}</Text>
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

export default FollowersList;
