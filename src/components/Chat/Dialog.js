import React, { Component } from 'react';
import styles from './styles.Dialog.js';
import colors from '../../styles/colors';

import { TouchableHighlight, Image, View, Text } from 'react-native';

const initialState = { pressed : null };

class Dialog extends Component {
	constructor(props){
		super(props);
		this.state = { ...initialState };
	}
	getDateString = createdAt => {
		const date = new Date(createdAt);
		const now = new Date();
		const date_time = Math.floor(date.getTime()/1000)
		const now_time = Math.floor(now.getTime()/1000)
		const gap = now_time - date_time;
		if( gap < 86400 ){
			return ((date.getDate()!=now.getDate())?"어제 ":"") + (date.getHours()<=9?"0":"") + date.getHours() + ":" + (date.getMinutes()<=9?"0":"") + date.getMinutes();
		} else if( date.getDate() != now.getDate() ){
			return (date.getYear()-100)+'/'+(date.getMonth()<=8?"0":"")+(date.getMonth()+1)+'/'+(date.getDate()<=9?0:"")+date.getDate();
		}
	}
	press = id => {
		this.setState({ pressed : id });
	}
	render(){
		const { dialog, user, openChat } = this.props;
		const { pressed } = this.state;
		const my = user.id === dialog.from.id;
		const to = dialog.type==="user"?dialog.to:dialog.group;
		const from = dialog.type==="user"?dialog.from:dialog.group;
		const profileUri = my?require('../../images/profile.png'):require('../../images/profile.png');
		return (
			<TouchableHighlight
				style={ styles.Dialog }
				onPressIn={(() => this.press(dialog.id)).bind(this)}
				onPressOut={(() => this.press(null)).bind(this)}
				underlayColor={colors.main}
				activeOpacity={1}
				onPress={ (()=>openChat(my?to:from,dialog.type)).bind(this) }
			>
				<View style={ styles.dialogView }>
					<Text style={styles.dialogTime}>
						{ this.getDateString(dialog.createdAt) }
					</Text>
					<Image style={styles.dialogImage} source={profileUri} />
					<View style={styles.dialogWrap}>
						<Text style={[styles.dialogName,pressed?styles.dialogActive:{}]}>
							{ my ? to.name : from.name }
						</Text>
						<Text style={[styles.dialogText,pressed?styles.dialogActive:{}]}>
							{ my ? `나 : ${dialog.text}`  : dialog.text }
						</Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

export default Dialog;
