import React, { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		padding: 4,
		height: 40,
		borderColor: 'gray',
		borderWidth: 0.5,
		margin: 10,
		width: 300,
		alignSelf: 'center'
	},
	label: {
		fontSize: 18
	},
	title: {
		fontSize: 36
	},
	error: {
		fontSize: 14,
		color: 'red',
		fontWeight: 'bold'
	}
});