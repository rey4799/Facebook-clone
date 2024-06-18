import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useQuery, gql } from "@apollo/client";

const GET_FOLLOWING = gql`
  query GetFollowing($findFollowingId: ID!) {
    findFollowing(id: $findFollowingId) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
      following {
        _id
        name
        username
        email
        avaUrl
      }
    }
  }
`;

const FollowingList = ({ route, navigation }) => {
  const { userId, refetchUserDetails } = route.params;
  const { loading, error, data, refetch } = useQuery(GET_FOLLOWING, {
    variables: { findFollowingId: userId },
  });

  const handleNavigateToUserDetail = (followingId) => {
    navigation.navigate("UserDetail", { userId: followingId });
    refetchUserDetails();
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data.findFollowing}
        keyExtractor={(item) => item.following._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleNavigateToUserDetail(item.following._id)}
          >
            <View style={styles.userContainer}>
              {item.following.avaUrl && (
                <Image
                  source={{ uri: item.following.avaUrl }}
                  style={styles.avatar}
                />
              )}
              <Text style={styles.username}>{item.following.username}</Text>
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


export default FollowingList;
