import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLogin } from '../../actions/auth';
import { AsyncStorage, View } from 'react-native';
import styles from './styles.js';

import Newsfeed from '../Newsfeed/Newsfeed';

class Home extends Component {
    static navigatorButtons = {
        rightButtons : [{
            title : '글쓰기',
            id : 'write'
        }]
    }
	constructor(props){
		super(props);
		const { navigator } = this.props;
		navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}
	componentDidMount = async () => {
		const { user, fetchLogin, navigator } = this.props;
		if( !user.verify ){
			const email = await AsyncStorage.getItem('email');
			const password = await AsyncStorage.getItem('password');
			if( email && password ){
				fetchLogin({ email, password })
				.then( action => {
					if( action.error ){
						this.showStartModal();
					}
				});
			} else {
				this.showStartModal();
			}
		}
	}
	showStartModal = () => {
		const { navigator } = this.props;
		navigator.showModal({
			screen: "Start", 
			animationType: 'none',
		});
	}
	handleTouchWrite = () => {
		const { navigator } = this.props;
		navigator.showModal({
			screen: "Write", 
			title : '글쓰기',
			animationType: 'slide-down',
		});
	}
	onNavigatorEvent = e => {
		if(e.type == 'DeepLink') {
			if(e.link == 'profile') {
				const { navigator } = this.props;
				navigator.push({
					screen: 'Profile',
					title: '프로필',
				})
			}
		} else {
        	switch(e.id){
        	    case 'write' : this.handleTouchWrite(); break;
        	}
		}
	}
	render() {
		const { user, navigator } = this.props;
		if( !user.verify ) {
			return (null);
		}
		return (
			<View style={styles.Home}>
				<Newsfeed navigator={navigator}/>
			</View>
		);
	}
}

const stateToProps = ({user}) => ({user});
const actionToProps = {
	fetchLogin
}
export default connect(stateToProps,actionToProps)(Home);
