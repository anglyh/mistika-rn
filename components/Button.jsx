import { Pressable, StyleSheet } from "react-native";
import { GlobalText } from "./GlobalText";

export function Button(props) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: props.disabled
            ? "#ccc"
            : pressed
            ? props.colorPressed || "#ECE1A1DD"
            : props.color || "#ECE1A1",
          height: 52,
          justifyContent: "center",
        },
        styles.container,
        props.buttonStyles,
      ]}
      disabled={props.disabled}
      onPress={props.onPress}
      accessible
      accessibilityLabel={props.accessibilityLabel || "A Button"}
    >
      <GlobalText style={ props.textStyles || styles.text }>
        {props.content || "Press Me"}
      </GlobalText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    color: "white",
    fontFamily: "DMSans_Bold",
  },
});
