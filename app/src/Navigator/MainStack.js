import { useEffect, useState, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

import Login from "../screens/Login";
import Home from "../screens/Home";
import AuthContext from "../context/auth";
import Register from "../screens/Register";
import PostDetail from "../screens/PostDetail";
import LogOutButton from "../components/LogoutButton";
import AddPost from "../screens/AddPost";
import SearchUser from "../screens/SearchUser";
import UserDetail from "../screens/UserDetail";
import FollowersList from "../screens/FollowerList";
import FollowingList from "../screens/FollowingList";
import Reels from "../components/Reels";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={({ navigation }) => ({
          headerTitle: "",
          headerLeft: () => (
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 24,
                  color: "blue",
                }}
              >
                Facebook
              </Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 15 }}>
              <TouchableOpacity onPress={() => navigation.navigate("AddPost")}>
                <FontAwesome6 name="circle-plus" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("SearchUser")}
              >
                <FontAwesome6 name="magnifying-glass" size={24} color="black" />
              </TouchableOpacity>
              <LogOutButton />
            </View>
          ),
        })}
        component={Home}
      />
      <Stack.Screen
        name="PostDetail"
        options={{ headerTitle: "Posts" }}
        component={PostDetail}
      />
      <Stack.Screen
        name="AddPost"
        options={{ headerTitle: "Create Post" }}
        component={AddPost}
      />
      <Stack.Screen
        name="SearchUser"
        options={{ headerTitle: "Search" }}
        component={SearchUser}
      />
      <Stack.Screen
        name="UserDetail"
        options={{ headerTitle: "" }}
        component={UserDetail}
      />
      <Stack.Screen
        name="FollowersList"
        options={{ headerTitle: "Follower" }}
        component={FollowersList}
      />
      <Stack.Screen
        name="FollowingList"
        options={{ headerTitle: "Following" }}
        component={FollowingList}
      />
    </Stack.Navigator>
  );
}

async function ProfileScreen() {
  const userId = await SecureStore.getItemAsync("_id");
  return <UserDetail route={{ params: userId }} />;
}

function ReelsScreen() {
  return <Reels />;
}

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="house" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchUser}
        options={{
          tabBarLabel: "Search",
          headerTitle: "Search",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="magnifying-glass" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ReelsTab"
        component={ReelsScreen}
        options={{
          tabBarLabel: "Reels",
          headerTitle: "Reels",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="square-caret-right" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Mainstack() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function checkToken() {
      const token = await SecureStore.getItemAsync("access_token");
      const user = await SecureStore.getItemAsync("_id"); // Assuming you store user id in secure store
      if (token) {
        setIsSignedIn(true);
        setUserId(user);
      }
    }
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, userId }}>
      <Stack.Navigator>
        {isSignedIn ? (
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={Login}
            />
            <Stack.Screen
              name="Register"
              options={{ headerShown: false }}
              component={Register}
            />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}

export default Mainstack;
