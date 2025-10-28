import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Animated,
  Keyboard,
} from "react-native";
import React, { useRef } from "react";

interface SearchBarProps {
  focused: boolean;
  value: string;
  onFocus: () => void;
  onSearchChange: (text: string) => void;
  onSearchReset: () => void;
  onClose: () => void;
}

// Upgrades: Would jazz this up with some re-animated
const SearchBar = ({
  focused,
  value,
  onFocus,
  onSearchChange,
  onSearchReset,
  onClose,
}: SearchBarProps) => {
  const inputRef = useRef<TextInput>(null);

  const handleClose = () => {
    inputRef.current?.blur();
    Keyboard.dismiss();
    onClose();
  };

  return (
    <Animated.View style={styles.searchBarContainer}>
      {focused && (
        <Pressable onPress={handleClose} style={styles.searchBackButton}>
          <Text style={styles.searchBackIcon}>←</Text>
        </Pressable>
      )}
      <TextInput
        ref={inputRef}
        style={styles.valueActive}
        placeholder="Search"
        value={value}
        onChangeText={onSearchChange}
        onFocus={onFocus}
      />
      {focused && (
        <Pressable onPress={onSearchReset} style={styles.searchCloseButton}>
          <Text style={styles.searchCloseIcon}>✕</Text>
        </Pressable>
      )}
    </Animated.View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    justifyContent: "space-between",
  },
  searchBackButton: {
    padding: 4,
  },
  searchBackIcon: {
    fontSize: 24,
    color: "#333",
  },
  valueActive: {
    flex: 1,
    height: 44,
    fontSize: 16,
    paddingHorizontal: 12,
  },
  searchCloseButton: {
    padding: 4,
  },
  searchCloseIcon: {
    fontSize: 20,
    color: "#666",
  },
});
