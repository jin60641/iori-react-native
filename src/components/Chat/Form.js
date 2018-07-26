import React, { Component } from 'react';
import { TouchableOpacity, FlatList, TextInput, View, Text } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

import { fetchSendChat } from '../../actions/chat';

import styles from './styles.Form.js';
import colors from '../../styles/colors';

const initialState = {
	text : ''
}

const limit = 20;

class Form extends Component {
	constructor(props){
		super(props);
		this.state = { ...initialState };
	}
	handleTouchFile = () => {
		const { handleSend } = this.props;
		ImagePicker.openPicker({
			multiple : false
        })
		.then( image => {
			handleSend({ file : { type : "image/jpeg", name : image.path, uri : image.path } });
		})
		.catch( e => {
			console.log(e);
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
					onPress={this.handleTouchFile}
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
