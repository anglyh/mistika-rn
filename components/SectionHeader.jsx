import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { GlobalText } from './GlobalText';
import React from 'react'
import colors from '../theme/colors';

export function SectionHeader({ title, onPress, style }) {
  return (
    <View style={[styles.sectionHeaderContainer, style]}>
      <GlobalText style={styles.sectionHeaderTitle}>{title}</GlobalText>
      <TouchableOpacity onPress={onPress}>
        <GlobalText style={styles.sectionHeaderButton}>Ver todos</GlobalText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  sectionHeaderTitle: {
    fontSize: 18,
    fontFamily: "DMSans_SemiBold",
    color: colors.secundario,
  },
  sectionHeaderButton: {
    color: colors.textPlaceholder,
  },
});