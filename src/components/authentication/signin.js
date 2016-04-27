'use strict';

import React, {
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage
} from 'react-native';
import Button from '../common/button';
import Firebase from 'firebase';
import styles from '../../styles';

const ref = new Firebase("https://authreactnative.firebaseIO.com");

class Signin extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	email: '',
	  	password: '',
	  	errorMessage: ''
	  };
	}

  render() {
    return (
      <View style={styles.container}>
      	<View style={_styles.header} >
          <Text style={styles.title} >
        		React Native ToDo
        	</Text>
        </View>
        <View style={_styles.body} >
        	<TextInput placeholder={"Email"} style={[styles.input]} 
        	onChangeText={(text) => this.setState({email: text})}
        	value={this.state.email} />
        	<TextInput placeholder={"Password"} secureTextEntry={true} style={[styles.input]}
        	onChangeText={(text) => this.setState({password: text})}
        	value={this.state.password} />
        	<Text style={styles.error} >{this.state.errorMessage}</Text>
        	<Button text={'Sign In'} onPress={this.handleSignin.bind(this)} />
        </View>
      	<View style={_styles.footer}>
          <Button text={'I need an account...'} onPress={this.handleSignup.bind(this)} />
        </View>
      </View>
    );
  }

  handleSignup() {
  	this.props.navigator.push({name: 'signup'});
  }

  handleSignin() {
  	this.setState({
  		errorMessage: '' 
  	});
  	ref.authWithPassword({
  		email: this.state.email,
  		password: this.state.password
  	}, (error, authData) => {
  		if (error) {
  			this.setState({
  				errorMessage: error.toString() 
  			});
  			console.log("Login Failed!", error);
  		} else {
        AsyncStorage.setItem('authData', JSON.stringify(authData));
				this.props.navigator.immediatelyResetRouteStack([{name: 'todoMain'}]);
  			//console.log("Authenticated sccessfully with payload:", authData);
  		}
  	}, {
  		remember: 'sessionOnly'
  	});
  	this.setState({
  		password: ''
  	});
  }
}

const _styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body :{
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default Signin;