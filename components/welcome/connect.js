import React from 'react'
import { View, Text, SafeAreView } from 'react-native'

export default class Connect extends React.Component {

    state = {
        inscription: false,
        connexion: false,
        welcome: true,
        email: '',
        password: 'mdp',
        message: null,
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
    
    render(){
        return(
            <View>
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
            </View>
        )
    }
}