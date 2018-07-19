import React, { Component } from 'react';
import styles from './styles.Form.js';
import { connect } from 'react-redux';
import colors from '../../styles/colors';
import { fetchSendChat } from '../../actions/chat';
import { FlatList, TextInput, View, Text } from 'react-native';

const initialState = {
	text : ''
}

const limit = 20;

class Form extends Component {
	constructor(props){
		super(props);
		this.state = { ...initialState };
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
	handleChangeText = text => {
		this.setState({
			text
		});
	}
	render(){
		return(
			<View style={styles.Form}>
				<TextInput
                        multiline={true}
                        style={styles.textarea}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={this.handleChangeText}
                    />
			</View>
		);
	}
}

const actionToProps = {
    fetchSendChat,
};

export default connect(undefined,actionToProps)(Form);
