import React from "react";
import { Text, StyleSheet } from "react-native";

export const GlobalText = (props) => {
  return <Text {...props} style={[styles.text, props.style]} />;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "DMSans_Regular",
  },
});
