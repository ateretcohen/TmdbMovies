import React, { useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import MovieCard from "./MovieCard";
import "react-native-gesture-handler";
import * as RootNavigation from "../RootNavigations.js";
import { DataStorage } from "../components/DataMoviesStorage";
import colors from "./Colors";
// import { AntDesign } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function ListOfMovies({ route, navigation }) {
  //   const { addMovieToFavorite, removeMovieFromFavorite } = route.params;
  const [favoriteList, setFavoriteList] = useContext(DataStorage);
  //   const [userData, setUserData] = useContext(DataStorage);

  const { movieList, type } = route.params;
  const movieStack = checkWitchPage();

  function checkWitchPage() {
    switch (type) {
      case "popular": {
        return movieList;
      }
      default: {
        return favoriteList;
      }
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <View style={styles.btnBack}>
        {/* <AntDesign name="left" size={25} color="white"/> */}
        <AntDesign name="arrowleft" size={24} color="white" 
        onPress={() => RootNavigation.navigate("Home")}/>
          {/* <TouchableOpacity
            onPress={() => RootNavigation.navigate("Home")}
            // style={[
            //   styles.btn,
            //   {
            //     borderTopStartRadius: 50,
            //     borderBottomStartRadius: 50,
            //   },
            // ]}
          >
            <Text style={{ color: colors.colorWhite248RGB }}>HOME</Text>
          </TouchableOpacity> */}
        </View>

        <Text style={styles.textHeader}>POPULAR MOVIES</Text>
        {/* back home btn */}
      </View>
      {/* list of movies */}
      {/* sss */}
      <ScrollView style={styles.container}>
        <View style={styles.listOfMovies}>
          {movieStack.length > 0 && movieStack ? (
            movieStack.map((movie, i) => {
              return (
                <MovieCard
                  key={i}
                  index={i}
                  movie={movie}

                  //   addMovieToFavorite={addMovieToFavorite}
                  //   removeMovieFromFavorite={removeMovieFromFavorite}
                />
              );
            })
          ) : (
            <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
              {/* in case of empty movies in favorite page */}
              {/* <ActivityIndicator size="large" color="blue" /> */}
              <Text style={{ fontSize: 17,color:'red' }}>
                There are no movies in favorite list
              </Text>
              {/* <Image
                style={{ width: "70%", height: 200 }}
                source={require("../assets/background/empty.jpg")}
              /> */}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  listOfMovies: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    alignItems: "center",
    backgroundColor:'#022C80',
    paddingBottom:10,
    opacity:0.7,
    paddingTop:10
  },
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color:'white',
  },

  btnBack: {
    width: "100%",
    justifyContent: "flex-start",
    paddingTop: "10%",
    paddingStart: "5%",
  },
  btn: {
    width: 80,
    height: 40,
    backgroundColor: colors.colorBlueLight,
    // color: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
     borderRadius: 10,
  },
});
