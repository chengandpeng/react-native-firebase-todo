'use strict';

import React, {
  StyleSheet,
  View,
  Text,
  Modal,
  AsyncStorage,
} from 'react-native';
import Firebase from 'firebase';

const ref = new Firebase("https://authreactnative.firebaseIO.com");

class Header extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	modalVisible: false
	  };
	}

  render() {
    return (
      <View style={styles.container} >
      	<View style={styles.cell}>
      		<Text></Text>
      	</View>

      	<View style={styles.cell}>
      		<Text style={styles.title} >{this.props.user.password.email}</Text>
      	</View>
  
      	<View style={styles.cell}>
	      	<Text style={[styles.logout]} onPress={this._setModalVisible.bind(this, true)}>Log out</Text>
      	</View>


      	<Modal
          animated={false}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this._setModalVisible.bind(this, false)}}
          >
         	<View style={[styles.modalContainer]}>
          	<View style={[styles.innerContainer]}>
              <Text>Ready to Log Out?</Text>
              <View style={styles.checkDialog}>
	              <Text
	                onPress={this._setModalVisible.bind(this, false)}
	                style={styles.checkButton}>
	                No
	              </Text>
	              <Text
	              	style={styles.checkButton}
	               onPress={this.logOut.bind(this)}>Yes</Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  _setModalVisible(visible) {
  	this.setState({
  		modalVisible: visible
  	});
  }

  logOut() {
  	AsyncStorage.removeItem('authData').then(() => {    
      ref.unauth();
      this.props.navigator.immediatelyResetRouteStack([{name: 'signin'}]);
    });
  }
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#D4D7D7',
		height: 40,
		alignItems: 'center',
	},
	cell: {
		flex: 1,
	},
	title: {
		alignSelf: 'center',
		fontSize: 18,
		fontWeight: '600'
	},
	logout: {
		alignSelf: 'flex-end',
		marginRight: 15,
		fontSize: 16
	},
	modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20
  },
  checkDialog: {
  	marginTop: 15,
  	flexDirection: 'row',
  },
  checkButton: {
  	borderColor: 'gray',
  	borderWidth: 1,
  	padding: 5,
  	width: 50,
  	textAlign: 'center',
  	borderRadius: 5,
  	marginLeft: 50,
  	marginRight: 50
  }
});


export default Header;