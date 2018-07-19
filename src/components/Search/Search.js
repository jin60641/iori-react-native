import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.Search.js';
import colors from '../../styles/colors';
//import { fetchSendSearch } from '../../actions/chat';
import { TouchableHighlight, TextInput, View, Text } from 'react-native';

const initialState = {
}

class Search extends Component {
	constructor(props){
		super(props);
		this.state = { ...initialState }
	}
	render() {
		return (
			<View style={styles.Search}>
			</View>
		);
	}
}

const stateToProps = ({user}) => ({user});
const actionToProps = {
//	fetchSearch
}
export default connect(stateToProps,actionToProps)(Search);
