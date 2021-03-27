import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js"
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import AdminAddEvent from '../components/AdminAddEvent'


export function AddEventAdmin({navigation}) {
    
    return (
        <View style={styles.container}>
            <AdminAddEvent/>
        </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
        flexDirection:'row',
    },
  });
