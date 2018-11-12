import React from 'react'
import { Share, Alert, StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button, TouchableOpacity } from 'react-native'
import { getFilmDetailFromApi, getImageFromAPi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'

class FilmDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      })
    })
  }

  _toggleFavorite = () => {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
    this.props.dispatch(action)
  }

  _displayFavoriteImage() {
    var sourceImage = require('../Images/ic_favorite_border.png')
    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1){
      //favoris
      sourceImage = require('../Images/ic_favorite.png')
    }
    return (
      <Image 
        source={sourceImage}
        style={styles.favorite_image} />
    )
  }

  _displayFilm() {
    const film = this.state.film
    if(film != undefined) {
      return (
        <ScrollView style={styles.scollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFromAPi(film.backdrop_path)}}
          />
          <Text style={styles.title_text}>{film.title}</Text>
          <TouchableOpacity
            onPress={ this._toggleFavorite } 
            style={styles.favorite_container}>
              {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
          <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}
          </Text>
          <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
              return company.name;
            }).join(" / ")}
          </Text>
        </ScrollView>
      )
    }
  }

  _shareFilm = () => {
    const { film } = this.state
    Share.share({ title: film.title, message: film.overview })
    .then(
      Alert.alert(
        'Succès',
        'Film partagé',
        [
          {text: 'OK', onPress: () =>{}},
        ]
      )
    )
    .catch(
      Alert.alert(
        'Echec',
        'Film non partagé',
        [
          {text: 'OK', onPress: () =>{}},
        ]
      )
    )
  }

  _displayLoading() {
    if (this.state.isLoading){
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        { this._displayFilm() }
        { this._displayLoading() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_container: {
    alignItems: 'center'
  },
  favorite_image: {
    width: 40,
    height: 40
  },
})

// Add state globale to props
const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}
export default connect(mapStateToProps)(FilmDetail)