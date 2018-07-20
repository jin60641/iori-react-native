import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.Write.js';
import { fetchWritePost } from '../../actions/newsfeed';
import { KeyboardAvoidingView, Image, TextInput, View } from 'react-native';

import config from '../../../config';
const { host } = config;

import Photo from './Photo';
const profile = require('../../images/profile.png');

const initialState = {
	text : '',
	files : []
}

class Write extends Component {
	static navigatorButtons = {
		leftButtons : [{
			title : '닫기',
			id : 'close'
		}],
		rightButtons : [{
			title : '전송',
			id : 'send'
		}]
	}
	constructor(props){
		super(props);
		this.state = { ...initialState }
		const { navigator } = this.props;
		navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}
	onNavigatorEvent = e => {
		console.log(e.type,e.id);
		if( e.type === 'ScreenChangedEvent' ){
			switch(e.id){
			}
		} else if( e.type === 'NavBarButtonPress' ){
			switch(e.id){
				case 'close' : this.handleTouchClose(); break;
				case 'send' : this.handleTouchSend(); break;
			}
		}
	}
	handleTouchClose = () => {
		const { navigator } = this.props;
		navigator.dismissModal({
			animationType: 'slide-down'
		});
		this.setState({ ...initialState });
		this.textarea.clear();
	}
	handleTouchSend = () => {
		const { fetchWritePost } = this.props;
		const { text, files } = this.state;
		const data = new FormData();
		if( !( text.length || files.length ) ){
			return 0;
		}
		data.append("text",text);
		files.forEach( uri => data.append('file',{type: "image/jpeg", name: uri, uri}));
		fetchWritePost(data)
		.then( action => {
			if( !action.error ){
				this.handleTouchClose();
				const { navigator, link } = this.props;
				navigator.handleDeepLink({
					link
				});
			} else {
				//
			}
		});
	}
	handleChangeText = text => {
		this.setState({ text });
	}
	handleChangeFiles = files => {
		this.setState({ files });
	}
	render() {
		const { user } = this.props;
		const { text, files } = this.state;
		const profileUri = user.profile?{uri:`${host}/files/profile/${user.id}.png`}:profile;
		return (
			<KeyboardAvoidingView 
				style={styles.Write} 
				behavior="padding" 
				enabled={true} 
				keyboardVerticalOffset={64}
			>
				<View style={styles.body}>
					<Image style={styles.profile} source={profileUri} />
					<TextInput 
						ref={ dom => this.textarea = dom }
						multiline={true} 
						style={styles.textarea}
						autoCapitalize='none'
						autoCorrect={false}
						autoFocus={true}
						onChangeText={this.handleChangeText}
						placeholder='무슨 일이 일어나고 있나요?'
					/>
				</View>
				<Photo text={text} handleChangeFiles={this.handleChangeFiles} files={files}/>
			</KeyboardAvoidingView>
		);
	}
}

const stateToProps = ({user}) => ({user});
const actionToProps = {
	fetchWritePost
}
export default connect(stateToProps,actionToProps)(Write);
