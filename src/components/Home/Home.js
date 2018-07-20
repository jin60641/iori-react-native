import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLogin } from '../../actions/auth';
import { fetchConnectSocket } from '../../actions/socket';
import { AsyncStorage, View } from 'react-native';
import styles from './styles.Home.js';

import Newsfeed from '../Newsfeed/Newsfeed';

const initialState = {
	refresh : false
}
class Home extends Component {
    static navigatorButtons = {
        rightButtons : [{
            title : '글쓰기',
            id : 'write'
        }]
    }
	constructor(props){
		super(props);
		this.state = { ...initialState };
		const { navigator } = this.props;
		navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}
	componentDidMount = async () => {

		const { user, fetchLogin, fetchConnectSocket, navigator } = this.props;
		if( !user.verify ){
			const email = await AsyncStorage.getItem('email');
			const password = await AsyncStorage.getItem('password');
			if( email && password ){
				fetchLogin({ email, password })
				.then( action => {
					if( !action.error ){
	                	fetchConnectSocket();
					} else {
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
			animationType: 'slide-down',
			passProps: { link : 'Newsfeed.Home' }
		});
	}
	onNavigatorEvent = e => {
		if(e.type === 'DeepLink') {
			if(e.link === 'profile') {
				const { navigator } = this.props;
				navigator.push({
					screen: 'Profile',
					title: '프로필',
				})
			} else if( e.link === 'Newsfeed.Home' ){
				this.setState({
					refresh : true
				});
			}
		} else {
        	switch(e.id){
        	    case 'write' : this.handleTouchWrite(); break;
        	}
		}
	}
	finishRefresh = () => {	
		this.setState({
			refresh : false
		});
	}
	render() {
		const { user, navigator } = this.props;
		const { refresh } = this.state;
		if( !user.verify ) {
			return (null);
		}
		return (
			<View style={styles.Home}>
				<Newsfeed navigator={navigator} refresh={refresh} finishRefresh={this.finishRefresh}/>
			</View>
		);
	}
}

const stateToProps = ({user}) => ({user});
const actionToProps = {
	fetchLogin,
	fetchConnectSocket,
}
export default connect(stateToProps,actionToProps)(Home);
