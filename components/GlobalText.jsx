import React from "react";
import { Text, StyleSheet } from "react-native";

export const GlobalText = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "DMSans_Regular",
  },
});
