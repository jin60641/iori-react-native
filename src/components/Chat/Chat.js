import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.js';
import colors from '../../styles/colors';
//import { fetchSendChat } from '../../actions/chat';
import { TouchableHighlight, TextInput, View, Text } from 'react-native';

const initialState = {
}

class Chat extends Component {
	constructor(props){
		super(props);
		this.state = { ...initialState }
	}
	render() {
		return (
			<View style={styles.Chat}>
			</View>
		);
	}
}

const stateToProps = ({user}) => ({user});
const actionToProps = {
//	fetchChat
}
export default connect(stateToProps,actionToProps)(Chat);
