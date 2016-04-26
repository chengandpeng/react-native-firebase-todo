'use strict';

import React, {
  StyleSheet,
  View,
  Text,
  AsyncStorage
} from 'react-native';
import Firebase from 'firebase';
import styles from '../../styles';
import Header from './header';

const ref = new Firebase("https://authreactnative.firebaseIO.com");

class List extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	user: null
	  };
	}
	componentWillMount() {
		AsyncStorage.getItem('authData')
			.then((authData_json) => {
				let authData = JSON.parse(authData_json);
				this.setState({
					user: authData
				});
			});
	}
  render() {
  	if(!this.state.user)
  		return (
  		 <View sytle={styles.container}>
  		 	<Text>Loading...</Text>
  		 </View>
  		);

    return (
      <View style={_styles.container} >
      	<View style={_styles.header}>
   				<Header route={this.props.route} navigator={this.props.navigator} user={this.state.user} />
   			</View>
      </View>
    );
  }
}

const _styles = StyleSheet.create({
	container: {
		flex:1
	},
	header: {
		marginTop: 20
	}
});


export default List;