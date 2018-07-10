import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableHighlight, Image, View, Text } from 'react-native';
import Login from '../Login/Login';
import styles from './styles.js';

class Side extends Component {
	constructor(props){
		super(props);
	}
	handleTouchProfile(){
		const { navigator } = this.props;
		navigator.showModal({
			screen: "Login", // unique ID registered with Navigation.registerScreen
			title: "로그인", // title of the screen as appears in the nav bar (optional)
			passProps: {}, // simple serializable object that will pass as props to the modal (optional)
			navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
			animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
		});
	}
	render() {
		const { user } = this.props;
		return (
			<View style={styles.Side}>
				<TouchableHighlight onPress={ this.handleTouchProfile.bind(this) }>
					<View style={styles.profile}>
						<Image source={require('../../images/profile.png')} style={styles.profileImg}/>
						<Text style={styles.Text} style={styles.profileName}> 
							{ user.name ? user.name : "로그인 해주세요" }
						</Text>
					</View>
				</TouchableHighlight>
			</View>
		);
	}
}

const stateToProps = ({user}) => ({user})
export default connect(stateToProps,undefined)(Side);
