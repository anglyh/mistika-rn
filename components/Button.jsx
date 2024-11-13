import { Pressable, StyleSheet } from "react-native";
import { GlobalText } from "./GlobalText";
import colors from "../theme/colors";

export function Button({
  content = "Press Me",
  onPress,
  disabled,
  color,
  buttonStyles,
  textStyles,
  accessibilityLabel = "A Button",
  size = "default", // 'small', 'default', 'large'
  variant = "filled", // 'filled', 'outlined', 'text'
  children,
  fullWidth,
  ...props
}) {
  const generatePressedColor = (color) => {
    if (!color) return;
    return color + "99";
  };

  const getButtonSize = () => {
    switch (size) {
      case "small":
        return { height: 36 };
      case "large":
        return { height: 60 };
      default:
        return { height: 52 };
    }
  };

  const getVariantStyles = () => {
    const baseColor = color || colors.secundarioMorado;
    
    switch (variant) {
      case "outlined":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: baseColor,
        };
      case "text":
        return {
          backgroundColor: "transparent",
        };
      default:
        return {
          backgroundColor: baseColor,
        };
    }
  };

  const getTextColor = () => {
    if (disabled) return "#666";
    if (variant === "filled") return textStyles?.color || "white";
    return color || colors.secundarioMorado;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        getButtonSize(),
        getVariantStyles(),
        fullWidth && styles.fullWidth,
        {
          opacity: pressed ? 0.8 : 1,
          backgroundColor: disabled
            ? "#ccc"
            : pressed
            ? generatePressedColor(color) || colors.secundarioMoradoPressed
            : getVariantStyles().backgroundColor,
        },
        buttonStyles,
      ]}
      disabled={disabled}
      onPress={onPress}
      accessible
      accessibilityLabel={accessibilityLabel}
      {...props}
    >
      {children || (
        <GlobalText
          style={[
            styles.text,
            { color: getTextColor() },
            textStyles,
          ]}
        >
          {content}
        </GlobalText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  fullWidth: {
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontFamily: "DMSans_Bold",
  },
});