'use strict';

import React, {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

class Button extends React.Component {
  render() {
    return (
      <TouchableHighlight 
      onPress={this.props.onPress}
      underlayColor={'grey'} style={styles.button}>
      	<Text style={styles.buttonText}>
      		{this.props.text}
      	</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		borderColor: 'gray',
    backgroundColor: '#529ECC',
		marginTop: 10,
    width: 200,
	},
	buttonText: {
		flex: 1,
		alignSelf: 'center',
		fontSize: 20,
    color: 'white'
	}
});


export default Button;