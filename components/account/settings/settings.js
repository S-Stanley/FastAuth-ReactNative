import React from 'react'
import { View, Text, SafeAreaView, Button } from 'react-native'

export default class Settings extends React.Component {

    render(){
        return(
            <View>
                <SafeAreaView>
                    <Text>Settings</Text>
                    <Button 
                        title='Go to Deco'
                        onPress={() => this.props.navigation.navigate('Deco')}
                    />
                </SafeAreaView>
            </View>
        )
    }
}