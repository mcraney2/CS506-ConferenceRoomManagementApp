// ./components/TextBox.js
import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TextBox = props => {
  return (
        <TextInput 
            style={{height: props.height,
                    width:  props.width, 
                    borderColor: props.borderColor,
                    margin: props.margin,
                    borderWidth: props.borderWidth}}
            placeholder={props.placeholder}
        />
        /*
            <TouchableOpacity onPress={props.handleClick}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>
                    {props.label}
                </Text>
            </View>
        </TouchableOpacity>
        */
  );
};

export default TextBox;