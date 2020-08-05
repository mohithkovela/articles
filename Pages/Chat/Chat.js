import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import WebView from "react-native-webview";

import Icon from "react-native-vector-icons/Feather";

export default class Chat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { route, navigation } = this.props;
    const article = route.params;
    const image = { uri: article.Image };
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.imageBackground}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.pop()}
          >
            <Icon name={"chevron-left"} size={30} color={"white"} />
          </TouchableOpacity>
          <Text style={styles.articleTitle}>{article.Title}</Text>
        </ImageBackground>
        <View style={styles.articleContainer}>
          <WebView
            textZoom={300}
            originWhitelist={["*"]}
            source={{ html: article.Description }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    height: 50,
    width: 50,
    backgroundColor: "grey",
    opacity: 0.65,
    position: "absolute",
    top: 25,
    left: 25,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  container: { flex: 1, backgroundColor: "white" },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    padding: "5%",
  },
  articleTitle: {
    bottom: 50,
    fontSize: 25,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowRadius: 5,
    color: "white",
  },
  articleContainer: {
    flexGrow: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 25,
    backgroundColor: "white",
    bottom: 50,
    marginBottom: -50,
  },
});
