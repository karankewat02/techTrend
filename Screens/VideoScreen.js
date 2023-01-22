import { StyleSheet, Text, View ,ScrollView} from "react-native";
import React, { useState, useEffect } from "react";
import Loading from "../Screens/Loading";
import axios from "axios";
import Video from "react-native-video";

const VideoScreen = ({ navigation, route }) => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
   const [video, setVideo] = useState("https://player.vimeo.com/external/357563488.sd.mp4?s=b1cfbc7c4eb11d8a10dc5dfe36ed63466cb3da61&profile_id=164&oauth2_token_id=57447761");


  const text = `Heading - ${data.title} | Description - ${data.description} | Contemt -  ${data.content}`;

  const make_video = async () => {
    setLoading(true);
    const text = `Heading - ${data.title} | Description - ${data.description} | Contemt -  ${data.content}`;
    console.log(text);
    await axios
      .post("http://192.168.1.43:8000/make_video/", {
        text: text,
      })
      .then((response) => {
        console.log(response.data);
        setVideo("http://192.168.1.43:8000/get_video/")
        setLoading(false);
        // getVideo();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    setdata(route.params.data);
    make_video();
  }, [video]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <Video
            source={{
              uri: "http://192.168.1.43:8000/get_video/",
            }}
            style={styles.backgroundVideo}
          />
          <Text>{text}</Text>
        </ScrollView>
      )}
    </>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width:300,
      height:300
    },
  });
