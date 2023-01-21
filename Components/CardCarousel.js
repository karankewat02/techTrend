import { StyleSheet,ScrollView, Text, View, Dimensions } from 'react-native'
import React from 'react'
import CarouselCard from './CarouselCard';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CardCarousel = () => {
  const data = [
    {id: 1, title: 'Card 1', image: '../assets/card1.jpeg'},
    {id: 2, title: 'Card 2', image: '../assets/card2.jpeg'},
    {id: 3, title: 'Card 3', image: '../assets/card3.jpeg'},
    {id: 4, title: 'Card 4', image: '../assets/card4.jpeg'},
    {id: 5, title: 'Card 5', image: '../assets/card5.jpeg'},
  ];
  return (
    <ScrollView horizontal={true} style={{height:Math.trunc(windowHeight)-100,paddingBottom:200,}}>               
      {
        data.map((e)=>{
          return(
            <CarouselCard
            title={e.title} 
            key={e.id}
            imgURL = {e.image} 
            />
            )
          })
        }

      </ScrollView>

  )
}

export default CardCarousel

const styles = StyleSheet.create({})