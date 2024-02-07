import { StatusBar } from "expo-status-bar";
import { RootSiblingParent } from "react-native-root-siblings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppProvider } from "./context/appContext";
import { Router } from "./routes/Router";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <RootSiblingParent>
        <Router/>
        <StatusBar style="auto" />
      </RootSiblingParent>
    </AppProvider>
  );
}
