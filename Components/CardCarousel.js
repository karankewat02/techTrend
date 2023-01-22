import { StyleSheet,ScrollView, Text, View, Dimensions } from 'react-native'
import React ,{ useState,useEffect }from 'react'
import CarouselCard from './CarouselCard';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import axios from 'axios';
import Loading from '../Screens/Loading';

const CardCarousel = (props) => {

  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    makeRequest();
  }, []);

  const makeRequest = async () => {
    setLoading(true);
    await axios.get('http://192.168.1.47:3000/topnews')
    .then(response => {
      // console.log(response.data);
      setdata(response.data);      
      setLoading(false);
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <>
    
    {loading ? (
      <Loading/>
    ) : (
    <ScrollView horizontal={true}>               
      {
        data.map((e,index)=>{
          return(
              <CarouselCard navigate={props.navigation} key={index} data={e} />
            )
          })
        }

      </ScrollView>
    )}
    </>
  )
}

export default CardCarousel

const styles = StyleSheet.create({})