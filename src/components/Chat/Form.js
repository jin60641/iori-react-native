import React, { Component } from 'react';
import styles from './styles.Form.js';
import { connect } from 'react-redux';
import colors from '../../styles/colors';
import { fetchSendChat } from '../../actions/chat';
import { TouchableOpacity, FlatList, TextInput, View, Text } from 'react-native';

const initialState = {
	text : ''
}

const limit = 20;

class Form extends Component {
	constructor(props){
		super(props);
		this.state = { ...initialState };
	}
	handleChangeFile = e => {
		const { files } = e.target;
		const { handleSend } = this.props;
		Array.from(files).forEach( file => {
			handleSend({ file, text : "" });
		});
	}
	handleChangeText = text => {
		this.setState({
			text
		});
	}
	handleTouchSend = () => {
		const { text } = this.state;
		if( !text.length ){
			return null;
		}
		this.textarea.clear();
		const { handleSend } = this.props;
		handleSend({ text });
	}
	render(){
		const { handleTouchSend } = this.props;
		return(
			<View style={styles.Form}>
				<TouchableOpacity
					onPress={this.handleChangeFile}
					style={styles.send}
				>
					<Text style={styles.sendText}>
						파일
					</Text>
				</TouchableOpacity>
				<TextInput
					ref={ dom => this.textarea = dom }
					multiline={true}
					style={styles.textarea}
					autoCapitalize='none'
					autoCorrect={false}
					onChangeText={this.handleChangeText}
				/>
				<TouchableOpacity
					onPress={this.handleTouchSend}
					style={styles.send}
				>
					<Text style={styles.sendText}>
						전송
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Form;
