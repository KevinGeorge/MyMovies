import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites';
import NewFilm from '../Components/NewFilm';

const SearchStackNavigator = createStackNavigator({
  SearchView: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetailView: {
    screen: FilmDetail,
    navigationOptions: {
      title: 'Details'
    }
  }
})

const FavoriteStackNavigator = createStackNavigator({
  FavoriteView: {
    screen: Favorites,
    navigationOptions: {
      title: 'Favoris'
    }
  },
  FilmDetailView: {
    screen: FilmDetail,
    navigationOptions: {
      title: 'Details'
    }
  }
})

const NewStackNavigator = createStackNavigator({
  NewFilmsView: {
    screen: NewFilm,
    navigationOptions: {
      title: 'Nouveautés'
    }
  },
  FilmDetailView: {
    screen: FilmDetail,
    navigationOptions: {
      title: 'Details'
    }
  }
})

const MoviesTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image 
        source={require('../Images/ic_search.png')}
        style={styles.icon}/>
      }
    }
  },
  Favorites: {
    screen: FavoriteStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image 
        source={require('../Images/ic_favorite.png')}
        style={styles.icon}/>
      }
    }
  },
  NewFilm: {
    screen: NewStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image 
        source={require('../Images/ic_fiber_new.png')}
        style={styles.icon}/>
      }
    }
  }
},{
  tabBarOptions: {
    activeBackgroundColor: '#DDDDDD',
    inactiveBackgroundColor: '#FFFFFF',
    showLabel: false,
    showIcon: true
  }
})

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})
export default MoviesTabNavigator