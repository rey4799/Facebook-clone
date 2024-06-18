import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useQuery, useMutation, gql } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

const GET_USER_DETAILS = gql`
  query GetUserDetails($id: ID!) {
    getUserById(id: $id) {
      _id
      name
      username
      email
      avaUrl
    }
    findFollower(id: $id) {
      _id
    }
    findFollowing(id: $id) {
      _id
    }
  }
`;

const FOLLOW_USER = gql`
  mutation FollowUser($input: FollowInput!) {
    followUser(input: $input) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;

const UserDetail = ({ route, navigation }) => {
  const { userId } = route.params;
  const { loading, error, data, refetch } = useQuery(GET_USER_DETAILS, {
    variables: { id: userId },
  });

  const [followUser] = useMutation(FOLLOW_USER, {
    onCompleted: () => {
      refetch();
    },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const user = data.getUserById;
  const followersCount = data.findFollower.length;
  const followingCount = data.findFollowing.length;

  const handleFollow = async () => {
    const userLogin = await SecureStore.getItemAsync("_id");
    followUser({
      variables: {
        input: {
          followingId: userId,
          followerId: userLogin,
        },
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.avaUrl }} style={styles.coverImage} />
      </View>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.avaUrl }} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <View style={styles.followInfo}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FollowersList", { userId: user._id })
            }
          >
            <Text style={styles.followCount}>{followersCount} Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FollowingList", { userId: user._id })
            }
          >
            <Text style={styles.followCount}>{followingCount} Following</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.followButton} onPress={handleFollow}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  header: {
    height: 200,
    backgroundColor: "#4267B2",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: -50,
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  username: {
    fontSize: 18,
    color: "#888",
  },
  email: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  followInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 20,
  },
  followCount: {
    fontSize: 16,
    color: "#4267B2",
    fontWeight: "bold",
  },
  followButton: {
    backgroundColor: "#4267B2",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  followButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default UserDetail;
