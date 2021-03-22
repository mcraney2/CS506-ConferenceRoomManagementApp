import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js";

export function FirstLogInUser({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.textSty}>Hello! Enter the code for your conference room group to proceed:</Text>
            <View style={styles.container2}>
                <TextBox
                    height={30}
                    width={240}
                    borderColor={"grey"}
                    borderWidth={1}
                    margin={10}
                    placeholder='Conference Room Group # (xxx-xxx)'
                />
                <Button 
                    handleClick={() =>
                        navigation.navigate('UserConsole')
                    }
                    label="Enter"
                />
            </View>
        </View>
    );
}
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
        },
        container2: {
          backgroundColor: '#fff',
          alignItems: 'center',
          marginTop: 200,
        },
        textSty: {
          fontSize:40,
        },
      });
