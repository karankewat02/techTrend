import { Dimensions, TouchableOpacity,StyleSheet, Text,Image,View,Linking} from 'react-native'
import React,{ useEffect ,useState} from 'react'
import axios from "axios";

const windowWidth = Dimensions.get('window').width;

const CarouselCard = (props) => {
    // const navigation = props.navigation;
  
    // const makeRequest = async () => {
    //     await axios.get('http://192.168.1.47:3000/')
    //     .then(response => {
    //       console.log(response.data);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }

    const [data, setdata] = useState([
        {
            id: 1,
            title: "News 1",
            image: "https://picsum.photos/200/300",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
        },
      ]);
    useEffect(() => {
        // makeRequest();
        setdata(props.data)
    }, []);
    const navi = () => {
        makeRequest();
        // navigation.navigate('NewsDetails', { newsId: props.newsId })
        console.log("Navigating to NewsDetails")
    }

    const handelRead = () => {
        Linking.openURL(data?.link?data.link:"https://www.google.com")
    }

    const handelMakeVideo = () => {
        console.log("Get short Video")
    }


    return (
      <View style={{marginBottom:16}}>
        <View style={styles.trendingImageContainer}>
          <Image source={{uri:`${data?.image_url?data.image_url:"https://picsum.photos/200/300"}`}} resizeMode='cover' style={styles.trendingImage} />
          <Text style={styles.trendingNewsText}>{data?.title?data.title:"News Headline"}</Text>
        </View>

        <View style={styles.Options}>
        {data?.content?(
          <TouchableOpacity style={{backgroundColor:"#0081C9", paddingHorizontal:16, paddingVertical:12,marginBottom:16}} onPress={handelMakeVideo}>
              <Text style={{fontSize:14, color:"#fff", fontWeight:"700"}}>Get short Video</Text>
          </TouchableOpacity>
          ):<></> 
        }
        <TouchableOpacity style={{backgroundColor:"#0081C9", paddingHorizontal:16, paddingVertical:12,marginBottom:16,marginHorizontal:'auto'}} onPress={handelRead}>
              <Text style={{fontSize:14, color:"#fff", fontWeight:"700"}}>Read Full Article</Text>
          </TouchableOpacity>
          
        </View>

      </View>
    )
  }
  
  export default CarouselCard
  
  const styles = StyleSheet.create({
      
        trendingImage:{
          width:'100%',
          height:'100%',
        },
        trendingImageContainer:{
          flexBasis: (windowWidth/2)-40,
          marginBottom:4,
          marginTop:16,
          marginHorizontal:12,
          position:'relative',
          overflow:'hidden',
          borderRadius:6,
        },
        trendingNewsText:{
          position:'absolute',
          bottom:0,
          left:0,
          width:'100%',
          padding:6,
          color:'#FFF',
          backgroundColor:'#00000080'
        },
        Options:{
          flexDirection:'row',
          justifyContent:'space-between',
          marginHorizontal:16,
          alignItems:'center',
          
        }
  })