import React, { Component } from 'react';
import { Platform, View, Text } from 'react-native';
import styles from './styles.js';

const instruction = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

class Home extends Component {
	constructor(props){
		super(props);
		const { navigator } = this.props;
		navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}
	onNavigatorEvent = e => {
		if(e.type == 'DeepLink') {
			if(e.link == 'profile') {
				const { navigator } = this.props;
				navigator.push({
					screen: 'Profile',
					title: '프로필'
				})
			}
		}
	}
	render() {
		return (
			<View style={styles.Home}>
				<Text style={styles.homeText}>
					{ instruction }
				</Text>
			</View>
		);
	}
}

export default Home;
