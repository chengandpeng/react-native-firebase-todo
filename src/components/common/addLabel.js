'use strict';

import React, {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableHighlight
} from 'react-native';
import Firebase from 'firebase';

class AddLabel extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
    	newItem: ''
    };
  }

  render() {
    return (
      <View style={styles.nav}>
    		<TextInput placeholder={"input item"}
    		style={styles.input}
    		value={this.state.newItem}
    		onChangeText={(text) => this.setState({newItem: text})} 
    		/>
    	
	     	<TouchableHighlight 
	      onPress={this.onPress.bind(this)}
	      underlayColor={'grey'} style={styles.button}>
	      	<Text style={styles.buttonText}>
	      		Add
	      	</Text>
	      </TouchableHighlight>
      </View>
    );
  }

  onPress() {
  	this.props.userRef.push({
  		title: this.state.newItem,
  		done: false
  	});
  	this.setState({
  		newItem: '' 
  	});
  }
}

const styles = StyleSheet.create({
	nav: {
		flexDirection: 'row'
	},
	input: {
		flex: 5,
		paddingLeft: 10,
		borderWidth: 1,
		borderColor: 'gray',
		height: 40
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#529ECC',
	},
	buttonText: {
		color: '#fff'
	},
});


export default AddLabel;