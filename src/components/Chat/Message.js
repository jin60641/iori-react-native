import React, { Component } from 'react';
import styles from './styles.Message.js';
import colors from '../../styles/colors';
import config from '../../../config';
const { host } = config;

import { TouchableOpacity, Image, View, Text } from 'react-native';
class Message extends Component {
	constructor(props){
		super(props);
	}
	render(){
		const { user, chat } = this.props;
		const my = user.id === chat.from.id;
		const profileUri = chat.from.profile?{uri:`${host}/public/files/profile/${chat.from.id}.png`}:profile;
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
					<Text style={[styles.name,my?styles.nameMy:{}]}>
						{ chat.from.name }
					</Text>
					{
						chat.file ?
							<Image style={styles.file} src={{ uri : `${host}/public/files/chat/${chat.id}.png` }} />
						:
							<View style={[styles.wrap,my?styles.my:styles.row]}>
								<View style={[styles.caret,my?styles.caretMy:{}]}>
									<View style={[styles.caretDefault,styles.caretOuterDefault,my?styles.caretOuterMy:styles.caretOuter]} />
									<View style={[styles.caretDefault,styles.caretInnerDefault,my?styles.caretInnerMy:styles.caretInner]} />
								</View>
								<Text style={styles.text}>
									{ chat.text }
								</Text>
							</View>
					}
				</View>
			</View>
		);
	}
}

export default Message;
