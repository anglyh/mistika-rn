import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";

const Header = ({ title, placeholder }) => {
  const [search, setSearch] = useState('');

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={colors.textPlaceholder}
          value={search}
          onChangeText={text => setSearch(text)} 
        />
        <Ionicons name="search" size={24} color={colors.secundario} style={styles.searchIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'DMSans_Bold',
    color: colors.secundario,
    textAlign: 'center',
    marginBottom: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    borderColor: colors.secundario,
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
    fontFamily: 'DMSans_Regular',
  },
  searchIcon: {
    marginLeft: 10,
  },
});

export default Header;