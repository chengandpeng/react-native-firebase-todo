'use strict';

import React, {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Firebase from 'firebase';

const Url =  'https://authreactnative.firebaseIO.com';

class Tweets extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	user: null
	  };
	}
	componentWillMount() {
		const ref = new Firebase(Url);
		const authData = ref.getAuth();

		//console.log(authData);
		if(authData) {
			this.setState({
				user: authData
			});
		}
	}
  render() {
  	if(!this.state.user)
  		return <Text>Loading...</Text>

    return (
      <View style={styles.container} >
      	<Text>Welecom back! {this.state.user.password.email}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});


export default Tweets;