import React, { Component } from 'react';
import styles from './styles.js';
import colors from '../../styles/colors';
import {TouchableHighlight, TextInput, View, Text } from 'react-native';

const initialState = {
	pressed : null
}
const btns = {
	'Login' : '로그인',
	'Join' : '회원가입'
};
class Start extends Component {
	constructor(props){
		super(props);
		this.state = { ...initialState }
	}
	static navigatorStyle = {
		navBarHidden: true,
	}
	handleTouchButton = screen => {
		const { navigator } = this.props;
		navigator.push({
			screen,
			title : btns[screen],
		});
	}
	press = key => {
		this.setState({
			pressed : key
		});
	}
	render() {
		const { pressed } = this.state;
		return (
			<View style={styles.Start}>
				<View style={styles.box}>
					<Text style={styles.title}>
						iori
					</Text>
				</View>
				<View style={styles.buttons}>
				{ Object.keys(btns).map( key => (
					<TouchableHighlight
						style={ styles.button }
						onPressIn={(() => this.press(key)).bind(this)}
						onPressOut={(() => this.press(null)).bind(this)}
                        underlayColor={colors.white}
						key={`start-button-${key}`}
						onPress={ (() => this.handleTouchButton(key)).bind(this) }
					>
						<Text style={ pressed===key?styles.buttonTextPressed:styles.buttonText }>
							{ btns[key] }
						</Text>
					</TouchableHighlight>
				))}
				</View>
			</View>
		);
	}
}

export default Start;
