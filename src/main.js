import React, {
  StyleSheet,
  Navigator
} from 'react-native';
import Signin from './components/authentication/signin';
import Signup from './components/authentication/signup';
import Tweets from './components/tweets/tweets';
import Firebase from 'firebase';

const Url =  'https://authreactnative.firebaseIO.com';

const ROUTES = {
	signin: Signin,
	signup: Signup,
	tweets: Tweets
}

class main extends React.Component {
	componentWillMount() {
		const ref = new Firebase(Url);
		const authData = ref.getAuth();
		console.log(authData);
	}

	renderScene(route, navigator) {
		const Component = ROUTES[route.name];
		return <Component route={route} navigator={navigator} />;
	}

  render() {
    return (
    	<Navigator
    		style={styles.container}
    		initialRoute={{name: 'signin'}}
    		renderScene={this.renderScene}
    		configureScene={() => Navigator.SceneConfigs.FloatFromRight }
    		/>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});


export default main;