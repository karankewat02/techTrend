import { StyleSheet, Text, View, Image  } from 'react-native'
import React, {useEffect} from 'react'

const Entry = ({ navigation }) => {


  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home')
    }, 3000)
  }, [])

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logoNoBG.png')}
        resizeMode='cover'
        style={styles.bannerImg}
      />
    </View>
  )
}

export default Entry

const styles = StyleSheet.create({
  container:{
    flex:1,
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  bannerImg:{
    width:500,
    height:500,
    aspectRatio:1,
  }
})