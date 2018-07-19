import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';
import config from '../../../config';
const { host } = config;
import { fetchSearchUserByHandle } from '../../actions/search';
//import { fetchSetProfile } from '../../actions/setting';
import { fetchFollow } from '../../actions/relation';
import styles from './styles.Profile.js';
import colors from '../../styles/colors';

import TabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';

import Newsfeed from '../Newsfeed/Newsfeed';
const { width } = Dimensions.get('window');

const initialState = {
	user : null,
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
	handleTouchFollow = () => {
		const { fetchFollow } = this.props;
		fetchFollow({ to : this.state.user.id })
		.then( action => {
			const nextState = { ...this.state };
			nextState.user.following = action.payload;
			this.setState(nextState);
		});
	}
	render(){
		const { navigator } = this.props;
		const { user } = this.state;
		if( !user ){
			return null;
		}
		const my = user.verify && user.id === this.props.user.id;
		const profileUri = user.profile ? { uri : `${host}/public/files/profile/${user.id}.png` }:require('../../images/profile.png');
		const headerUri = { uri : `${host}/public/files/header/${user.id}.png` };
		return(
			<View style={styles.Profile}>
				<View style={styles.header}>
					{ user.header ? <Image source={ headerUri } style={styles.headerImg} /> : null }
				</View>
				<View style={styles.container}>
					<Image source={ profileUri } style={styles.profileImg}/>
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
				<TabView
					tabBarActiveTextColor={colors.main}
					locked={true}
					renderTabBar={() => 
						<TabBar 
							underlineColor={colors.main} 
							tabStyles={{tab:{width:width/3}}} 
							tabMargin={0.00001}
						/>
					}
				>
					<Newsfeed tabLabel={{label:"게시글"}} label="게시글" navigator={navigator} options={ { userId : user.id } }/>
					<Newsfeed tabLabel={{label:"이미지"}} label="게시글" navigator={navigator} options={ { userId : user.id, file : true } }/>
					<Newsfeed tabLabel={{label:"좋아요"}} label="게시글" navigator={navigator} options={ { userId : user.id } }/>
				</TabView>
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
