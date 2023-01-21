import { StyleSheet, Text, View, Dimensions, ScrollView ,TouchableOpacity} from 'react-native'
import NewsCard from '../Components/NewsCard'
import CardCarousel from '../Components/CardCarousel'
import CarouselCard from '../Components/CarouselCard'
import CategoryCard from '../Components/CategoryCard'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const localData = require('./data.json')

const Home = ({ navigation }) => {
  return (
    <View>
      <View style={{ position:"relative", height: 50, backgroundColor: '#aaa3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Text>TechTrends</Text>
        <TouchableOpacity style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 50,aspectRatio:1, display: 'flex', alignItems: 'center', justifyContent: 'center'}} onPress={() => {}}>
          <Text style={{ borderWidth: 2, borderColor:"blue",textAlign:"center",textAlignVertical:'center',fontWeight:"700",fontSize:16 ,borderRadius:100 ,width:30, aspectRatio:1,}}>?</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{height:height - 50}}>

        <Text>Top Tech News</Text>
        <View style={{ height: 200, backgroundColor: '#aaa3' }}>
          <CardCarousel />
        </View>

        <Text>Top Categoires</Text>

        <View style={styles.categoryContainer}>
          <CategoryCard uri="https://cdn.iconscout.com/icon/premium/png-256-thumb/business-report-chart-pie-analysis-statics-graph-4-6051.png" bgclr="#FD8A8A" category="Business" />
          <CategoryCard uri="https://cdn.iconscout.com/icon/premium/png-256-thumb/tv-1717483-1461243.png" bgclr='#F1F7B5' category="Entertainment" />
          <CategoryCard uri="https://cdn.iconscout.com/icon/premium/png-256-thumb/sports-2631488-2179552.png" bgclr="#A8D1D1"  category="Sport" />
          <CategoryCard uri="https://cdn.iconscout.com/icon/premium/png-256-thumb/technology-136-972886.png" bgclr="#9EA1D4"  category="Tech & Science" />
        </View>

        <Text>Top Trending News</Text>


        {
          localData.results.map((item, index) => {
            return (
              <View key={index} style={{ height: 200, backgroundColor: '#aaa3' }}>
                  <CarouselCard data={item} />
              </View>
            )
          })
        }
      </ScrollView>

      



    </View>

    )
}

export default Home

const styles = StyleSheet.create({

  categoryContainer:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',

  }

})