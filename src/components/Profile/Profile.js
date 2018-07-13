import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { fetchSearchUserByHandle } from '../../actions/search';
import config from '../../../config';
const { host } = config;
//import { fetchSetProfile } from '../../actions/setting';
import { fetchFollow } from '../../actions/relation';
import styles from './styles.js';

import Newsfeed from '../Newsfeed/Newsfeed';

const initialState = {
	user : null,
	tab : null,
	handle : null
}

class Profile extends Component {
	constructor(props){
		super(props);
		const { user, handle } = this.props;
		this.state = { ...initialState, user : handle?null:user };
	}
	componentDidMount = () => {
		const { handle, fetchSearchUserByHandle } = this.props;
		if( !handle ) return null;
		fetchSearchUserByHandle({ query : handle })
		.then( action => {
			if( !action.error ){
				this.setState({
					user : action.payload
				})
			}
		});
	}
	/*
	handleTouchSetting = type => {
		this.setState({
			isSetting : type
		});
	}
	handleTouchSettingSave = type => {
		fetchSetProfile(formData)
		.then( action => {
			if( !action.error ){
				if( action.payload ){
					const nextState = { user : this.state.user };
					nextState.user[type] = action.payload[type];
					this.setState(nextState);
					this.handleTouchSetting(null);
				}
			}
		});
	}
	*/
	handleClickFollow = () => {
		const { fetchFollow } = this.props;
		fetchFollow({ to : this.state.user.id })
		.then( action => {
			const nextState = { ...this.state };
			nextState.user.following = action.payload;
			this.setState(nextState);
		});
	}
	render(){
		const { user, naviagtor } = this.state;
		if( !user ){
			return null;
		}
		const my = user.verify && user.id === this.props.user.id;
		const profileUri = user.profile ? `${host}/public/files/profile/${user.id}.png`:'../../images/profile.png';
		const headerUri = `${host}/public/files/header/${user.id}.png`;
		return(
			<View style={styles.Profile}>
				<View style={styles.header}>
					{ user.header ? <Image source={{ uri : headerUri }} style={styles.headerImg} /> : null }
				</View>
				<View style={styles.container}>
					<Image source={{ uri: profileUri }} style={styles.profileImg}/>
					{ my ? 
						<View style={styles.buttons}>
							<View>
							</View>
						</View>
						:
						<View style={styles.buttons}>
							<View>
							</View>
						</View>
					}
				</View>
				<View style={styles.info}>
					<Text style={styles.name}>{user.name}</Text>
					<Text style={styles.handle}>@{user.handle}</Text>
				</View>
				<Newsfeed navigator={navigator} options={ { userId : user.id } }/>
			</View>
		);
	}
}

const stateToProps = ({searched,user}) => ({searched,user});
const actionToProps = {
	fetchSearchUserByHandle,
//	fetchSetProfile,
	fetchFollow,
}

export default connect(stateToProps,actionToProps)(Profile);
