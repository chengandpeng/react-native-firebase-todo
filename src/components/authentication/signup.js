'use strict';

import React, {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
import Firebase from 'firebase';
import Button from '../common/button';
import styles from '../../styles';

const Url =  'https://authreactnative.firebaseIO.com';

class Signup extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	email: '',
	  	password: '',
	  	passwordConfirmation: '',
	  	errorMessage: ''
	  };
	}

  render() {
    return (
      <View style={styles.container} >
      	<View style={_styles.body} >
          <TextInput
        		placeholder={"Email"}
            value={this.state.email}
        		onChangeText={(text) => this.setState({email:text})}
        		style={styles.input} />

        	<TextInput
            placeholder={"Password"}
        		secureTextEntry={true}
        		value={this.state.password}
        		onChangeText={(text) => this.setState({password:text})}
        		style={styles.input} />

        	<TextInput
            placeholder={"confirm Password"}
        		secureTextEntry={true}
        		value={this.state.passwordConfirmation}
        		onChangeText={(text) => this.setState({passwordConfirmation:text})}
        		style={styles.input} />

        	<Text style={styles.error}>{this.state.errorMessage}</Text>
        	<Button text={'Sign Up'} onPress={this.onSignupPress.bind(this)} />
        </View>
        <View style={_styles.footer} >
      	 <Button text={'I have an account...'} onPress={this.onSigninPress.bind(this)}/>
        </View>
      </View>
    );
  }

  onSignupPress() {
  	this.setState({
  		errorMessage: '' 
  	});
  	if (this.state.password !== this.state.passwordConfirmation) {
  		return this.setState({
  			errorMessage: 'Your passwords do not match' 
  		});
  	}
  	const ref = new Firebase(Url);
  	ref.createUser({
  		email: this.state.email,
  		password: this.state.password
  	}, (error, userData) => {
  		if (error) {
   			this.setState({
  				errorMessage: error.toString() 
  			});			
  			console.log("Error creating user:", error);
  		} else {
  			this.props.navigator.immediatelyResetRouteStack([{name: 'tweets'}]);
  			console.log("Successfully created user account:", userData);
  		}
  	});
  	this.setState({
  		password: '',
  		passwordConfirmation: ''
  	});
  }

  onSigninPress() {
  	this.props.navigator.pop();
  }
}

const _styles = StyleSheet.create({
  body: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 23
  }
})

export default Signup;