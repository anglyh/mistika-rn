import { Pressable, StyleSheet } from "react-native";
import { GlobalText } from "./GlobalText";
import colors from "../theme/colors";

export function Button(props) {
  const generatePressedColor = (color) => {
    if (!color) return;
    return color + "99";
  }

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: props.disabled
            ? "#ccc"
            : pressed
            ? generatePressedColor(props.color) || colors.secundarioMoradoPressed
            : props.color || colors.secundarioMorado,
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
    borderRadius: 50,
  },
  text: {
    fontSize: 16,
    color: "white",
    fontFamily: "DMSans_Bold",
  },
});
