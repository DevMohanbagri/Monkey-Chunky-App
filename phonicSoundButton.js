import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import {Audio} from 'expo-av';
import db from '../localDb.js';

export default class PhonicSoundButton extends React.Component{
    constructor(props){
        super(props)
        this.state={
          pressedButtonIndex: ''
        }
      }
    playSound = async ()=>{
      var soundLink = 'https://s3-whitehatjrcontent.whjr.online/phones/' +   
         this.props.soundChunk + '.mp3';
      await Audio.Sound.createAsync(
        {uri: soundLink},
        {shouldPlay: true}
      )
    }

  render(){
    return(
      <TouchableOpacity 
      onPress={() => {
          this.setState({ pressedButtonIndex: this.props.buttonIndex });
          this.playSound();
        }}
      
      style = {
        this.props.buttonIndex  === this.state.pressedButtonIndex
        ?[styles.chunkButton, {backgroundColor: "red"}]
        :[styles.chunkButton,{backgroundColor:"white"}]} 
          >
         
        <Text style={
          this.props.buttonIndex === this.state.pressedButtonIndex
                        ? [styles.displayText, { color: "white" }]
                        : [styles.displayText, { color: "black" }]
        }>{this.props.wordChunk}</Text>
       </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({
  displayText: {
    textAlign: 'center',
    fontSize: 30,
  },
  chunkButton:{
    width: "60%",
    height: 50,
    justifyContent : 'center',
    alignSelf: 'center',
    borderRadius: 50,
    margin: 5,
    backgroundColor: '#fa3b'
  }
})
