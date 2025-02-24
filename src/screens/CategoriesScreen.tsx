import { View, Text } from 'react-native'
import React from 'react'

export default function CategoriesScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Categories</Text>
      </View>
      
    </View>

  )
}