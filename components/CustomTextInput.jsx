import React, { forwardRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';

export const CustomTextInput = forwardRef(
  ({ iconName, placeholder, ...props }, ref) => {
    return (
      <View style={styles.inputContainer}>
        <Icon name={iconName} size={24} color={colors.textPlaceholder} style={styles.icon} />
        <TextInput
          ref={ref} // Aquí pasamos la referencia al TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textPlaceholder}
          {...props} // Otros props como onChangeText, onSubmitEditing, etc.
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgTextInput,
    borderRadius: 10,
    height: 52,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPlaceholder,
    fontFamily: 'DMSans_Medium',
  },
});
