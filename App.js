import { StatusBar } from "expo-status-bar";
import { RootSiblingParent } from "react-native-root-siblings";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import TrackParcel from "./screens/TrackParcel";
import { AppProvider } from "./context/appContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }}/>
            <Stack.Screen name="TrackParcel" component={TrackParcel}  options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </RootSiblingParent>
    </AppProvider>
  );
}
