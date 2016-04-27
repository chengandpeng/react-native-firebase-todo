'use strict';

import React, {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ListView
} from 'react-native';
import Firebase from 'firebase';
import CheckBox from 'react-native-checkbox';
import AddLabel from './addLabel';

let arr_completed = [];

class ListBody extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {
	  	items: new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2}),
	  };
	}

	componentWillMount() {
		const childPath = this.props.user.uid.slice(0,8);
  	const ref = new Firebase("https://authreactnative.firebaseIO.com");
  	this.userRef = ref.child(childPath);

	}

	componentDidMount() {
	  this.userRef.on('value', (snap) => {
		  if(snap.val()) {	
		  	let items = [];
		  	arr_completed = [];
		  	snap.forEach((child) => {
		  		items.push({
		  			title: child.val().title,
		  			done: child.val().done,
		  			key: child.key()
		  		});

		  		if(child.val().done == true) {
		  			arr_completed.push({
		  				key: child.key()
		  			});
		  		}
		  	});
					this.setState({
		  		items: this.state.items.cloneWithRows(items)
		  	});
		  }
	  }, (errorObject) => {
	  	console.log("The read failed:" + errorObject.code);
	  });
	}

  render() {
    return (
      <View style={styles.container}>
      	<View style={styles.addLabel} >
      		<AddLabel userRef={this.userRef} />
      	</View>
      	<View style={styles.listView}>
	      	<ListView
	      		dataSource={this.state.items}
	      		renderRow={this.renderRow.bind(this)}
	      	/>
	      </View>
	      <View style={styles.footer}>
					<TouchableHighlight
						onPress={this.handleClear.bind(this)}
			      underlayColor={'grey'} style={styles.clearButton}>
			      	<Text style={styles.buttonText}>
			      		ClearCompleted
			      	</Text>
 	     		</TouchableHighlight>
	      </View>
      </View>
    );
  }

  handleClear() {
  	arr_completed.map((item) => {
  		this.userRef.child(item.key).remove();
  	});
  }

  renderRow(rowData) {
  	return (
	  	<View style={styles.itemRow}>
		  	<CheckBox
		  		label= {rowData.title}
		  		checked={rowData.done}
		  		labelStyle={{color:'black', textDecorationLine: rowData.done?'line-through':'none'}}
		  		onChange={this.handleCheckBox.bind(this, rowData)}
		  	/>
	  	</View>
	  );
  }

  handleCheckBox(rowData) {
  	this.userRef.child(rowData.key).update({
  		done: !rowData.done
  	});
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	addLabel: {
		flex: 1,
	},
	listView: {
		flex: 13,
		height: 400
	},
	footer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'stretch',
	},
	itemRow: {
		margin: 2,
		paddingTop: 5,
		paddingLeft: 5,
		borderRadius: 5,
		backgroundColor: '#d4d7d7',
		height: 40,
		justifyContent: 'center',
	},
	clearButton: {
		alignItems: 'center',
		backgroundColor: '#2ecc71',
		justifyContent: 'center',
		padding: 10,
	},
	buttonText:{
		color: '#fff',
		fontSize: 18
	}
});


export default ListBody;