import { Dimensions, TouchableOpacity,StyleSheet, Text,Image,View,Linking} from 'react-native'
import React,{ useEffect ,useState} from 'react'
import axios from "axios";

const windowWidth = Dimensions.get('window').width;

const CarouselCard = (props) => {

    const [data, setdata] = useState([
        {
            id: 1,
            title: "News 1",
            image: "https://picsum.photos/200/300",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
        },
      ]);

    useEffect(() => {
        setdata(props.data)
    }, []);
    
    const handelMakeVideo = () => {
      props.navigate('VideoScreen', {data:data})
    }


    return (
      <TouchableOpacity onPress={handelMakeVideo}>
            <View style={styles.trendingImageContainer}>
              <Image source={{uri:`${data?.image_url?data.image_url:"https://picsum.photos/200/300"}`}} resizeMode='cover' style={styles.trendingImage} />
              <Text style={styles.trendingNewsText}>{data?.title?data.title:"News Title"}</Text>
            </View>
      </TouchableOpacity>
    )
  }
  
  export default CarouselCard
  
  const styles = StyleSheet.create({
      
      trendingImageContainer:{
        position:'relative',
        width:windowWidth-50,
        height:"100%",
        marginRight:10,
      },
        trendingImage:{
          width:"100%",
          height:"100%",
          zIndex:1,
        },
        trendingNewsText:{
          position:'absolute',
          bottom:0,
          left:0,
          right:0,
          backgroundColor:'rgba(0,0,0,0.5)',
          color:'white',
          padding:10,
          fontSize:16,
          fontWeight:'bold',
          zIndex:2,
        }
  })