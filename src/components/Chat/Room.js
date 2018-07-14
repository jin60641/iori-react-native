import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.js';
import colors from '../../styles/colors';
import { fetchSendChat, fetchGetChats } from '../../actions/chat';

import { TouchableHighlight, TextInput, View, Text } from 'react-native';

const initialState = {
	loading : false,
	text : ''
}
class Room extends Component {
	constructor(props){
		super(props);
		this.state = { ...initialState };
	}
	getChats = (from,type,offset) => {
		const { loading } = this.state;
		if( loading === false ){
			this.setState({loading : true });
			const { fetchGetChats } = this.props;
			fetchGetChats({ from, type, limit, offset })
			.then( action => {
				this.setState({loading : false });
			});
		}
	}
	sendChat = (file) => {
		const { fetchSendChat, to, type } = this.props;
		const { text } = this.state;
		let formData = new FormData();
		formData.append("to",to.id);
		formData.append("type",type);
		if( !file ){
			formData.append("text",text);
			this.setState({
				text : ""
			});
		} else {
			formData.append("text","");
			formData.append("file",file);
		}
		fetchSendChat(formData)
		.then( (action) => {
			if( !action.error ){
			} else {
			}
		})
	}
	handleClickSend = () => {
		const { text } = this.state;
		if( !text.length ){
			return 0;
		}
		this.sendChat();
	}
	handleChangeFile = e => {
		e.preventDefault();
		const { files } = e.target;
		Array.from(files).forEach( file => {
			this.sendChat(file);
		});
		e.target.value = "";
	}
	render(){
		return(
			<View style={styles.Room}>
				
			</View>
		);
	}
}

const stateToProps = ({chats}) => ({chats});
const actionToProps = {
	fetchSendChat,
	fetchGetChats,
};

export default connect(stateToProps,actionToProps)(Room);
