import React, { Component } from 'react';
import styles from './styles.Message.js';
import colors from '../../styles/colors';
import config from '../../../config';
const { host } = config;
import { Dimensions, TouchableOpacity, Image, View, Text } from 'react-native';

const maxWidth = Dimensions.get('window').width - 80;
const maxHeight = 260;

const initialState = {
	width : 0,
	height : 0,
	uri : null
}
class Message extends Component {
	constructor(props){
		super(props);
		const { chat } = this.props;
		this.state = { ...initialState, uri : `${host}/files/chat/${chat.id}.png` };
	}
	componentDidMount = () => {
		const { chat } = this.props;
		const { uri } = this.state;
		if( chat.file ){
			Image.getSize(uri, (width,height) => {
				if( width > maxWidth ) {
					const wv = maxWidth/width;
					height *= wv;
					width = maxWidth;
				}
				if( height > maxHeight ){
					const hv = maxHeight/height;
					width *= hv;
					height = maxHeight;
				}
				this.setState({width,height})
			});
		}
	}
	render(){
		const { user, chat, handleTouchUser } = this.props;
		const { width, height, uri } = this.state;
		const my = user.id === chat.from.id;
		const profileUri = chat.from.profile?{uri:`${host}/files/profile/${chat.from.id}.png`}:require('../../images/profile.png');
		return(
			<View style={[styles.Message,my?styles.MessageMy:{}]}>
				{ my ? null : 
					<TouchableOpacity 
						onPress={()=>handleTouchUser(chat.from.handle)}
					>
						<Image source={profileUri} style={styles.profile} />
					</TouchableOpacity>
				}
				<View style={[styles.body,my?styles.my:styles.row]}>
					{ /*
					<Text style={[styles.name,my?styles.nameMy:{}]}>
						{ chat.from.name }
					</Text>
					*/ }
					<View style={[styles.wrap,my?styles.my:styles.row]}>
						<View style={[styles.caret,my?styles.caretMy:{}]}>
							<View style={[styles.caretDefault,styles.caretOuterDefault,my?styles.caretOuterMy:styles.caretOuter]} />
							<View style={[styles.caretDefault,styles.caretInnerDefault,my?styles.caretInnerMy:styles.caretInner]} />
						</View>
						<View style={styles.content}>
						{ chat.file ?
							<Image style={[styles.file,{width,height}]} source={{ uri }} />
							:
							<Text style={styles.text}>
								{ chat.text }
							</Text>
						}
						</View>
					</View>
				</View>
			</View>
		);
	}
}

export default Message;
