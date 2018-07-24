import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.Notice.js';
import colors from '../../styles/colors';
//import { fetchSendNotice } from '../../actions/chat';
import { TouchableHighlight, TextInput, View, Text } from 'react-native';

const initialState = {
}

class Notice extends Component {
	constructor(props){
		super(props);
		this.state = { ...initialState }
	}
	render() {
		return (
			<View style={styles.Notice}>
			</View>
		);
	}
}

const stateToProps = ({user}) => ({user});
const actionToProps = {
//	fetchNotice
}
export default connect(stateToProps,actionToProps)(Notice);
