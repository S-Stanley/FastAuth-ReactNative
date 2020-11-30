import React from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, TextInput, AsyncStorage } from 'react-native';
import axios from 'axios'
import api from '../../config/api'
import bcrypt from 'react-native-bcrypt'

export default class App extends React.Component {

  render(){
    return (
      <View>
        <SafeAreaView>
          <Text>Home</Text>
        </SafeAreaView>
      </View>
    )
  }
}