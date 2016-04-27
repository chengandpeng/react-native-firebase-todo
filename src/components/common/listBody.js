'use strict';

import React, {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ListView
} from 'react-native';
import Firebase from 'firebase';
import AddLabel from './addLabel';



class ListBody extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {
	  	items: new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2})
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
		  	snap.forEach((child) => {
		  		items.push({
		  			title: child.val().title,
		  			done: child.val().done
		  		});
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
	      	<Text>test</Text>
	      </View>
      </View>
    );
  }

  renderRow(rowData) {
  	return (
	  	<View style={styles.itemRow}>
		  	
		  	<Text>
		  		{rowData.title}
		  	</Text>
	  	</View>
	  );
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
	},
	itemRow: {
		margin: 2,
		borderRadius: 5,
		backgroundColor: '#d4d7d7',
		height: 40,
		justifyContent: 'center',
	}
});


export default ListBody;