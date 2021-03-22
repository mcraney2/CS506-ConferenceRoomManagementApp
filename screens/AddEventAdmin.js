import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js"
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export function AddEventAdmin({navigation}) {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    this.state = {
        choice: 'none'
    }

    return (
        <View style={styles.container}>
            <View style={styles.sideBySide}>
                <Text style={styles.textSty}>Add Event To:</Text>
                <Text style={styles.textSty2}>Rm 1800</Text>
            </View>
            <View style={styles.sideBySide}>
                <Text style={styles.textSty3}>Event Name:</Text>
                <TextBox 
                    height={30}
                    width={200}
                    borderColor={"grey"}
                    borderWidth={1}
                    margin={10}
                />
            </View>
            <View style={styles.sideBySide}>
                <View style={styles.container2}>
                    <Text style={styles.textSty3}>Date:</Text>
                </View>
                <View style={styles.container4}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                </View>
            </View>
            <View style={styles.sideBySide}>
                <View style={styles.container2}>
                    <Text style={styles.textSty3}>Time:</Text>
                </View>
                <View style={styles.container3}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='time'
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        width={200}
                    />
                </View>
                <View style={styles.container2}>
                    <Text style={styles.textSty3}>to</Text>
                </View>
                <View style={styles.container3}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='time'
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        width={200}
                    />
                </View>
            </View>
            <View style={styles.sideBySide}>
                <Text style={styles.textSty3}>Repeat:</Text>
                <View style={styles.container2}>
                    <DropDownPicker
                        items={[
                            {label: 'None', value: 'none'},
                            {label: 'Weekly', value: 'weekly'},
                            {label: 'Monthly', value: 'monthly'},
                        ]}
                        defaultValue={this.state.choice}
                        containerStyle={{height: 40, width:150}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={item => this.setState({
                            choice: item.value
                        })}
                    />
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.button}>
                    <Button 
                        handleClick={() =>
                            navigation.navigate('ManagementConsole')
                        }
                        label={"Schedule"}
                    />
                </View>
                <View style={styles.button}>
                    <Button 
                        handleClick={() =>
                            navigation.navigate('ManagementConsole')
                        }
                        label={"Exit"}
                    />
                </View>
            </View>
        </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
        flexDirection:'row',
    },
    container2: {
        flex:1,
        width:350,
    },
    container3: {
        flex:1,
        width:100,
    },
    container4: {
        flex:1,
        width:130,
    },
    sideBySide: {
        flex:0.3,
        margin:10,
        flexDirection:'row',
    },
    button: {
        margin: 10,
    },
    textSty: {
        fontSize:30,
        fontWeight:'bold',
        marginTop: 20,
    },
    textSty2: {
        fontSize:30,
        fontWeight:'bold',
        marginTop: 20,
        marginLeft: 10,
        color:'red',
    },
    textSty3: {
        fontSize:20,
        fontWeight:'bold',
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 10,
        color:'#474747',
    },
  });
