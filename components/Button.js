// ./components/Button.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Button = props => {
  return (
        <TouchableOpacity onPress={props.handleClick}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>
                    {props.label}
                </Text>
            </View>
        </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'red',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: "white",
        fontSize: 18
    }
});

export default Button;

/*
<button className={className} onClick={props.handleClick}>
        
        {props.label}
    </button>
    */