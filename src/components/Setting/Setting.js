import React, { Component } from 'react';
import styles from './styles.Setting.js';
import colors from '../../styles/colors';
import { connect } from 'react-redux';
import config from '../../../config';
const { host } = config;
import { fetchSetProfile } from '../../actions/setting';
import { Image, TouchableOpacity, TextInput, View, Text } from 'react-native';

const initialState = {
};
class Setting extends Component {
	static navigatorButtons = {
		leftButtons : [{
			title : '취소',
			id : 'cancel'
		}],
		rightButtons : [{
			title : '저장',
			id : 'save'
		}]
	}
	constructor(props){
		super(props);
		this.state = { ...initialState }
		const { navigator } = this.props;
		navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}
	onNavigatorEvent = e => {
		if( e.type === 'NavBarButtonPress' ){
			switch(e.id){
				case 'cancel' : this.handleTouchCancel(); break;
				case 'save' : this.handleTouchSave(); break;
			}
		}
	}
	handleTouchSave = () => {
		const { fetchSetProfile } = this.props;
		const formData = new FormData();
		fetchSetProfile(formData)
		.then( action => {
			if( !action.error ){
				if( action.payload ){
					this.setState( user => ({ user : { ...user, ...action.payload } }) );
					this.handleTouchCancel();
				}
			}
		});
	}
	handleTouchCancel = () => {
		const { navigator } = this.props;
		navigator.dismissModal({
			animationType: 'slide-down'
		});
		this.setState({ ...initialState });
	}
	render(){
		const { user } = this.props;
		const profileUri = user.profile ? { uri : `${host}/files/profile/${user.id}.png` }:require('../../images/profile.png');
		const headerUri = { uri : `${host}/files/header/${user.id}.png` };
		return(
			<View style={styles.Setting}>
				<View style={styles.header}>
					{ user.header ? <Image source={ headerUri } style={styles.headerImg} /> : null }
				</View>
				<View style={styles.container}>
					<Image source={ profileUri } style={styles.profileImg}/>
				</View>
			</View>
		);
	}
}

const stateToProps = ({user}) => ({user});
const actionToProps = {
	fetchSetProfile,
}

export default connect(stateToProps,actionToProps)(Setting);
