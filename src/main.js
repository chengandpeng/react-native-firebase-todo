import React, {
  StyleSheet,
  Navigator,
  AsyncStorage,
  ActivityIndicatorIOS
} from 'react-native';
import Signin from './components/authentication/signin';
import Signup from './components/authentication/signup';
import List from './components/common/list';
import Firebase from 'firebase';
import styles from './styles';

const ref = new Firebase("https://authreactnative.firebaseIO.com");

const ROUTES = {
	signin: Signin,
	signup: Signup,
	list: List
}

class main extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	component: null
	  };
	}

	componentWillMount() {
		AsyncStorage.getItem('authData')
			.then((authData_json) => {
				if (authData_json) {
					let authData = JSON.parse(authData_json);
					ref.authWithCustomToken(authData.token, (error, new_authData) => {
						if(error) {
							this.setState({component: "signin"});
						} else {
							this.setState({component: "list"});
						}
					});
				} else {
					this.setState({component: "signin"});	
				}				
			});
	}

	renderScene(route, navigator) {
		const Component = ROUTES[route.name];
		return <Component route={route} navigator={navigator} />;
	}

  render() {
  	if(this.state.component) {
  		return (
	    	<Navigator
	    		initialRoute={{name: this.state.component}}
	    		renderScene={this.renderScene}
	    		configureScene={() => Navigator.SceneConfigs.FloatFromRight }
	    		/>
	    );
  	} else {
	    return (
		 		<ActivityIndicatorIOS
		  			animating={true}
		  			style={styles.container}
		  			size="large"
		  			/>
	    );
  	}
  }
}

const _styles = StyleSheet.create({

});


export default main;