// ./components/RadioButtons.js
import { useLinkProps } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import RadioGroup from 'react-native-radio-buttons-group';


const RadioBut = props => {
    const radioButtonsData = [{
        id: '1', 
        label: props.label1,
        value: 'option1',
    }, {
        id: '2',
        label: props.label2,
        value: 'option2',
    }]
    const [radioButtons, setRadioButtons] = useState(radioButtonsData)
    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
    }
    return (
        <RadioGroup 
            radioButtons={radioButtons} 
            onPress={onPressRadioButton} 
            layout={props.layout}
        />
    );
};

export default RadioBut;