import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import {Header} from 'react-native-elements';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import db from '.localDb';
import PhonicSoundButton from './phonicSoundButton';

console.log(db["the"].chunks)

export default class App extends React.Component {
  constructor(){
    super()
    this.state={
      text: '',
      chunks: [],
      phonicSounds: []

    }
  }
  render() {
    return (
      <SafeAreaProvider>
      <View style={styles.container}>
        <Header 
          backgroundColor = '#f53b'
          centerComponent = {{text:'Monkey Chunky', style:{color: 'white', fontSize: 20}}}
        />
        <Image
        source={{uri:'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png'}}
        style= {{width: 150, height: 150, marginLeft: 90}}
        />
        

        <TextInput
          style= {styles.inputBox}
          onChangeText= { (text)=>{
            this.setState({text: text})
            console.log(this.state.text)


            }}
        />



        <TouchableOpacity style={styles.goButton} color= 'green' 
        onPress={()=> {
          var word = this.state.text.toLowerCase().trim()
            
          db[word]?( 
            this.setState({chunks : db[word].chunks}),
            this.setState({phonicSounds: db [word].phones})
          )
          : Alert.alert("The word is not existing in the database") 
          }}>
          
          <Text style={styles.buttonText}>GO!</Text>
        </TouchableOpacity>

       <View>
          {this.state.chunks.map((item, index)=>{
            return (
              <PhonicSoundButton wordChunk= {this.state.chunks[index]} 
            soundChunk= {this.state.phonicSounds[index]}
            buttonIndex = {index}/> 
            )
            
          })}

        </View>
       
      </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fb12',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none'
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },

});
