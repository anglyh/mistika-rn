import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { GlobalText } from '../../components/GlobalText';
import avatar from '../../assets/images/avatar.png';

export function ProfileScreen() {
  const { user } = useAuthContext();

  return (
    <View className="flex-1 bg-primario items-center gap-2 pt-2">
      <Image source={avatar} style={{ width: 100, height: 100, borderRadius: 50 }} />
      <GlobalText>{user.name}</GlobalText>
      <GlobalText>{user.email}</GlobalText>
    </View>
  )
}

const styles = StyleSheet.create({

})