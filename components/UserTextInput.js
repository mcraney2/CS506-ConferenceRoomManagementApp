import React, { Component } from 'react';
import { TextInput } from 'react-native-gesture-handler';

class UserTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            height: 30
        }
    }
    updateSize = (height) => {
        this.setState({
          height
        });
      }
    render() { 
        const newValue = this.props.value;
        const height = this.state.height;
        let newStyle = height;
        return (  
        <TextInput
            placeholder= {this.props.placeHolder}
            onChangeText={(value) => this.props.setValue({value})}
            style={[newStyle]}
            editable={true}
            multiline={true}
            value={newValue}
            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
          />);
    }
}
 
export default UserTextInput;