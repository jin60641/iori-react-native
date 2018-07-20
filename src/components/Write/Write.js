import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.Write.js';
import { fetchWritePost } from '../../actions/newsfeed';
import { KeyboardAvoidingView, TouchableHighlight, CameraRoll, Image, TextInput, View, Text, FlatList } from 'react-native';
import config from '../../../config';
const { host } = config;
const profile = require('../../images/profile.png');

const initialState = {
	text : '',
	files : [],
	photos : []
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
	componentDidMount = () => {
		CameraRoll.getPhotos({
			first : 20,
			assetType: 'Photos'
		})
		.then( r => {
			this.setState({
				photos : r.edges
			});
		})
		.catch( e => {
			console.log(e);
		});
	}
	onNavigatorEvent = e => {
		switch(e.id){
			case 'close' : this.handleTouchClose(); break;
			case 'send' : this.handleTouchSend(); break;
		}
	}
	handleTouchClose = () => {
		const { navigator } = this.props;
		navigator.dismissModal({
			animationType: 'slide-down'
		});
	}
	handleTouchSend = () => {
		const { fetchWritePost } = this.props;
		const { text, files } = this.state;
		const data = new FormData();
		if( !( text.length || files.length ) ){
			return 0;
		}
		data.append("text",text);
		Array.from(files).forEach( file => {
			data.append('file',file.data);
		})
		fetchWritePost(data)
		.then( action => {
			if( !action.error ){
				this.handleTouchClose();
				const { navigator, link } = this.props;
				navigator.handleDeepLink({
					link
				});
			} else {
				
			}
		});
	}
	handleChangeText = text => {
		this.setState({ text });
	}
	render() {
		const { text, photos } = this.state;
		const { user } = this.props;
		const profileUri = user.profile?{uri:`${host}/public/files/profile/${user.id}.png`}:profile;
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
						multiline={true} 
						style={styles.text}
						autoCapitalize='none'
						autoCorrect={false}
						autoFocus={true}
						onChangeText={this.handleChangeText}
						placeholder='무슨 일이 일어나고 있나요?'
					/>
				</View>
				<View style={[styles.photos,!text.length?styles.photosActive:styles.photosNone]}>
					<FlatList
						data={photos}
						horizontal={true}
						renderItem={ ({item }) => <Image source={{uri:item.node.image.uri}} style={styles.photo}/> }
						keyExtractor={ item => `Write-photo-${item.node.image.uri}` }
					/>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const stateToProps = ({user}) => ({user});
const actionToProps = {
	fetchWritePost
}
export default connect(stateToProps,actionToProps)(Write);
