import * as React from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableHighlight } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import api from './components/config/api'
import bcrypt from 'react-native-bcrypt'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './components/account/home/home'
import Settings from './components/account/settings/settings'
import Deco from './components/account/settings/deconnexion'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export default class App extends React.Component {

  state = {
    logged: false,
    inscription: false,
    connexion: false,
    welcome: true,
    email: 'stanleyserbin@gmail.com',
    password: 'mdp',
    message: null,
  }

  componentDidMount = () => {
    this.isLogged()
  }

  async connexion(email, password){
    this.setState({message: ''})
    const that = this
    const send = await axios.post(`${api}/auth/connexion`, {
      email: email,
    })
    bcrypt.compare(password, send.data.password, async function(err, res) {
      if (res === true){
        await axios.post(`${api}/auth/connect`, {
          email: email,
          moment: new Date(),
        })
        await AsyncStorage.setItem('email', email)
        that.setState({logged: true})
      }
      else {
        that.setState({message: 'Error in loggin'})
      }
    })
  }

  async inscription(email, password){
    const that = this
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
          const send = await axios.post(`${api}/auth/inscription`, {
            email: email,
            password: hash,
            moment: new Date(),
          })
          if (send.data.result === 'ok'){
            console.log('Correcly subscribed')
          }
          else {
            that.setState({message: send.data.message})
          }
        })
    })
  }

  async isLogged(){
    const email = await AsyncStorage.getItem('email')
    if (email != null){
      this.setState({logged: true})
    }
  }

  render(){

    createSettingStack = () =>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={Settings}/>
      <Stack.Screen name="Deco" component={Deco}/>
    </Stack.Navigator>


    return (
      <NavigationContainer>
          {this.state.logged === true ? (
            <Tab.Navigator>
              <Tab.Screen name="Home" component={Home}/>
              <Tab.Screen name="Settings" component={createSettingStack}/>
            </Tab.Navigator>
          ) : (
            <View>
              <SafeAreaView>
              {this.state.welcome === true &&
                <View>
                  <View style={{padding: '5%'}}>
                    <Text style={{textAlign: 'center', fontSize: 20}}>Welcome</Text>
                  </View>

                  <View style={{padding: '5%'}}>
                    <TouchableHighlight style={{backgroundColor: 'grey', alignItems: "center", padding: 10, borderRadius: 10}} onPress={() => this.setState({connexion: false, inscription: true, welcome: false})}>
                      <Text style={{color: 'white'}}>Inscription</Text>
                    </TouchableHighlight>
                  </View>

                  <View style={{padding: '5%'}}>
                    <TouchableHighlight style={{backgroundColor: 'grey', alignItems: "center", padding: 10, borderRadius: 10}} onPress={() => this.setState({connexion: true, inscription: false, welcome: false})}>
                      <Text style={{color: 'white'}}>Connexion</Text>
                    </TouchableHighlight>
                  </View>
                </View>
             }

              {this.state.connexion === true &&
                <View>
                  <View style={{padding: '5%'}}>
                    <Text style={{textAlign: 'center', fontSize: 20}}>Connexion</Text>
                    <Text style={{textAlign: 'center'}}>{this.state.message}</Text>
                  </View>

                  <View style={{padding: '5%'}}>
                    <Text>Email</Text>
                    <TextInput style={{borderWidth: 0.5, height: 40}} onChangeText={text => this.setState({email: text})} value={this.state.email}/>
                  </View>

                  <View style={{padding: '5%'}}>
                    <Text>Password</Text>
                    <TextInput style={{borderWidth: 0.5, height: 40}} onChangeText={text => this.setState({password: text})} value={this.state.password} secureTextEntry={true}/>
                  </View>

                  <View style={{padding: '5%'}}>
                    <TouchableHighlight style={{backgroundColor: 'green', alignItems: "center", padding: 10, borderRadius: 10}} onPress={() => this.connexion(this.state.email, this.state.password)}>
                      <Text style={{color: 'white'}}>OK</Text>
                    </TouchableHighlight>
                  </View>

                  <View style={{padding: '5%'}}>
                    <TouchableHighlight style={{backgroundColor: 'red', alignItems: "center", padding: 10, borderRadius: 10}} onPress={() => this.setState({connexion: false, inscription: false, welcome: true})}>
                      <Text style={{color: 'white'}}>Go Back</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              }

              {this.state.inscription === true &&
                <View>
                  <View style={{padding: '5%'}}>
                    <Text style={{textAlign: 'center', fontSize: 20}}>Inscription</Text>
                    <Text style={{textAlign: 'center'}}>{this.state.message}</Text>
                  </View>

                  <View style={{padding: '5%'}}>
                    <Text>Email</Text>
                    <TextInput style={{borderWidth: 0.5, height: 40}} onChangeText={text => this.setState({email: text})} value={this.state.email}/>
                  </View>

                  <View style={{padding: '5%'}}>
                    <Text>Password</Text>
                    <TextInput style={{borderWidth: 0.5, height: 40}} onChangeText={text => this.setState({password: text})} value={this.state.password} secureTextEntry={true}/>
                  </View>

                  <View style={{padding: '5%'}}>
                    <TouchableHighlight style={{backgroundColor: 'green', alignItems: "center", padding: 10, borderRadius: 10}} onPress={() => this.inscription(this.state.email, this.state.password)}>
                      <Text style={{color: 'white'}}>OK</Text>
                    </TouchableHighlight>
                  </View>

                  <View style={{padding: '5%'}}>
                    <TouchableHighlight style={{backgroundColor: 'red', alignItems: "center", padding: 10, borderRadius: 10}} onPress={() => this.setState({connexion: false, inscription: false, welcome: true})}>
                      <Text style={{color: 'white'}}>Go Back</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              }
              </SafeAreaView>
            </View>
          )}
        </NavigationContainer>
    )
  }
}
