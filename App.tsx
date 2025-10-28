import { useState, useEffect, useMemo, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DemoScreen from "./screens/DemoScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Next sprint: Add theme to handle responsive sizing , and light/dark mode support
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
