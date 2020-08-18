import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { makeHTTPRequest } from "../../Services/http";
import Icon from "react-native-vector-icons/Feather";

import { connect } from "react-redux";
import { updateData } from "../../actions/updatedata";
import { bindActionCreators } from "redux";

class Inbox extends Component {
  componentDidMount() {
    let { articles, actions } = this.props;
    let uri = "http://firstmed.azurewebsites.net/api/GetArticles";
    let payload = {
      CustomerId: 5879,
      LastUpdatedTimeTicks: 0,
    };

    makeHTTPRequest(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      articles = response.Response.articles;
      actions.updateData(articles);
    });
  }

  render() {
    const articles = this.props.articles.articles;

    return (
      <View style={styles.container}>
        <FlatList
          initialNumToRender={51}
          data={articles}
          keyExtractor={(object, index) => index.toString()}
          renderItem={(article) => (
            <ListItem navigation={this.props.navigation} data={article} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    height: 300,
    margin: 10,
    shadowColor: "grey",
    borderRadius: 20,
    borderWidth: 0.125,
    elevation: 1,
    overflow: "hidden",
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
    padding: "5%",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowRadius: 10,
    color: "white",
  },
  cardButton: {
    width: "33%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  cardButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    marginLeft: 5,
  },
  cardButtonsContainer: {
    height: 50,
    backgroundColor: "white",
    flexDirection: "row",
  },
});

class ListItem extends Component {
  render() {
    let article = this.props.data.item;

    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.goToDetailsScreen(article)}
        >
          <ImageBackground
            source={{ uri: article.Image }}
            style={styles.imageBackground}
          >
            <Text style={styles.cardTitle}>{article.Title}</Text>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.cardButtonsContainer}>
          <TouchableOpacity style={styles.cardButton}>
            <Icon name={"heart"} size={25} />

            <Text style={styles.cardButtonText}>
              {article.LikesCount} Likes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardButton}>
            <Icon name={"calendar"} size={25} />

            <Text style={styles.cardButtonText}>
              {new Date(article.CreatedOnUtc).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardButton}>
            <Icon name={"bookmark"} size={25} />

            <Text style={styles.cardButtonText}>Bookmark</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  goToDetailsScreen(article) {
    this.props.navigation.push("Chat", article);
  }
}

const mapStateToProps = (state) => ({
  articles: state.articles,
});

const ActionCreators = Object.assign({}, { updateData });
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
