import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../theme/colors'
import { Ionicons } from '@expo/vector-icons'

export function SearchBar({ item, onFilter }) {
  const [search, setSearch] = useState('');

  // Manejar cambios de texto
  const handleSearchChange = (text) => {
    setSearch(text);
    const filtered = item.filter((itemFiltered) => 
      itemFiltered.name.toLowerCase().includes(text.toLowerCase())
    );
    onFilter(filtered)
  }

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar"
        placeholderTextColor={colors.textPlaceholder}
        value={search}
        onChangeText={handleSearchChange}
      />
      <Ionicons name="search" size={24} color={colors.secundarioMorado} style={{ marginLeft: 10 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    borderRadius: 50,
    backgroundColor: colors.primarioGris ,
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: colors.textPlaceholder,
    fontSize: 16,
    fontFamily: 'DMSans_Regular',
  },
});