import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLogout } from '../../actions/auth';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import Login from '../Login/Login';
import styles from './styles.Side.js';

const tabMenus = {
	side : [{
		id : 'profile',
		name : '프로필',
		img : require('../../images/side-tab-profile.png'),
	}],
	bottom : [{
		id : 'logout',
		name : '로그아웃'
	},{
		id : 'setting',
		name : '설정'
	}]
}


class Side extends Component {
	constructor(props){
		super(props);
	}
	close = () => {
		const { navigator } = this.props;
		navigator.toggleDrawer({
			side: 'left',
			animated: true,
			to: 'close' 
		});
	}
	handleTouchProfile = () => {
		const { navigator } = this.props;
		this.handleTouchMenu('profile');
	}
	handleTouchLogout = () => {
		const { fetchLogout, navigator } = this.props;
		fetchLogout()
		.then( action => {
			navigator.showModal({
				screen: "Start",
				animationType: 'none',
			});
		});
	}
	handleTouchBottomMenu = id => {
		this.close();
		switch(id){
			case 'logout' : this.handleTouchLogout(); break;
			case 'setting' : this.handleTouchLogout(); break;
		}
	}
	handleTouchMenu = id => {
		this.close();
		const { navigator } = this.props;
		navigator.handleDeepLink({
			link : id
		});
	}
	render() {
		const { user } = this.props;
		return (
			<View style={styles.Side}>
				<TouchableOpacity 
					onPress={ this.handleTouchProfile.bind(this) } 
				>
					<View style={styles.profile}>
						<Image source={require('../../images/profile.png')} style={styles.profileImg} />
						<Text style={styles.profileName} > 
							{ user.name }
						</Text>
					</View>
				</TouchableOpacity>
				<View style={styles.tabMenu}>
				{ 
					tabMenus.side.map( menu => (
						<TouchableOpacity 
							key={`side-menu-${menu.id}`}
							onPress={ (() => this.handleTouchMenu(menu.id)).bind(this) }
							style={styles.menuTab}
						>
							<View style={styles.menuTab}>
								<Image source={menu.img} style={styles.menuTabImg} />
								<Text style={styles.menuTabName}> {menu.name} </Text>
							</View>
						</TouchableOpacity>
					)) 
				}
				</View>
				<View style={styles.bottomMenu}>
				{
					tabMenus.bottom.map( menu => (
						<TouchableOpacity 
							key={`side-bottom-menu-${menu.id}`}
							onPress={ (() => this.handleTouchBottomMenu(menu.id)).bind(this) }
							style={styles.bottomMenuButton}
						>
							<View style={styles.bottomMenuTab}>
								<Text style={styles.bottomMenuTabName}> {menu.name} </Text>
							</View>
						</TouchableOpacity>
					)) 
				}
				</View>
			</View>
		);
	}
}

const stateToProps = ({user}) => ({user})
const actionToProps = {
	fetchLogout
}
export default connect(stateToProps,actionToProps)(Side);
