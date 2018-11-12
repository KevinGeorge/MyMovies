import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

class FilmList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { films: [] }
  }

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetailView", { idFilm: idFilm})
  }

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.props.films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => 
          <FilmItem 
            film={item} 
            isAFavoriteFilm={ (this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false }
            displayDetailForFilm={this._displayDetailForFilm} 
          />
        }
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if(!this.props.favoritesFilm && this.props.films.length >0 && this.props.page < this.props.totalPages) {
            this.props.loadFilms()
          }
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

// Add state globale to props
const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}
export default connect(mapStateToProps)(FilmList)