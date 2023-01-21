import { Dimensions,Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const CategoryCard = (props) => {
  return (
    <TouchableOpacity style={[styles.categoryCard, {backgroundColor: `${props.bgclr}`}]}>
      <Image source={{uri: `${props.uri}`}} resizeMode="contain" style={styles.categoryImage} />
        <Text style={styles.categoryText}>{props.category}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard

const styles = StyleSheet.create({

    categoryCard:{
        flexBasis: (windowWidth/2)-40,
        marginBottom:16,
        marginHorizontal:8,
        position:'relative',
        overflow:'hidden',
        borderRadius:6,
        padding:8
    },
    categoryImage:{
        width: '100%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    categoryText:{
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        textAlign:"center"
    }
})