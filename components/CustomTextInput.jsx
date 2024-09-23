import React, { forwardRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const CustomTextInput = forwardRef(
  ({ iconName, placeholder, ...props }, ref) => {
    return (
      <View style={styles.inputContainer}>
        <Icon name={iconName} size={24} color="#9EA8B9" style={styles.icon} />
        <TextInput
          ref={ref} // Aquí pasamos la referencia al TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9EA8B9"
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
    backgroundColor: '#F5F9FE',
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
    color: '#9EA8B9',
    fontFamily: 'DMSans_Medium',
  },
});
