import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Loading = () => {
  return (
    <View style={{ position:"absolute", width:width,height:height, top:0,left:0, zIndex:100, backgroundColor:"#fae12"  }} >
      <Text>Loading</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})