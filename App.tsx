import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import DemoScreen from "./screens/DemoScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Upgrades: Add theme to handle responsive sizing, and light/dark mode support
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView>
        <DemoScreen />
        <StatusBar style="auto" />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
