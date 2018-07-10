import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLogout } from '../../actions/auth';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import Login from '../Login/Login';
import styles from './styles.js';

const sideTabMenus = [{
	id : 'profile',
	name : '프로필',
	img : require('../../images/side-tab-profile.png'),
}]

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
	handleTouchProfile(){
		const { user, navigator } = this.props;
		if( user.verify ){
		} else {
			this.close();
			navigator.showModal({
				screen: "Login", // unique ID registered with Navigation.registerScreen
				title: "로그인", // title of the screen as appears in the nav bar (optional)
				passProps: {}, // simple serializable object that will pass as props to the modal (optional)
				navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
				animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
			});
		}
	}
	handleTouchLogout = id => {
		this.close();
		const { fetchLogout } = this.props;
		fetchLogout()
		.then( action => {
		});
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
							{ user.verify ? user.name : "로그인 해주세요" }
						</Text>
					</View>
				</TouchableOpacity>
				<View style={styles.tabMenu}>
				{ 
					user.verify ? sideTabMenus.map( menu => (
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
					: null
				}
				</View>
				<View style={styles.bottomMenu}>
				{
					user.verify ? 
						<TouchableOpacity 
							onPress={ this.handleTouchLogout.bind(this) }
							style={styles.bottomMenuButton}
						>
							<View style={styles.bottomMenuTab}>
								<Image source={require('../../images/side-logout.png')} style={styles.bottomMenuTabImg} />
								<Text style={styles.bottomMenuTabName}> 로그아웃 </Text>
							</View>
						</TouchableOpacity>
					: null
				}
				{
					user.verify ? 
						<TouchableOpacity 
							onPress={ this.handleTouchLogout.bind(this) }
							style={styles.bottomMenuButton}
						>
							<View style={styles.bottomMenuTab}>
								<Image source={require('../../images/side-logout.png')} style={styles.bottomMenuTabImg} />
								<Text style={styles.bottomMenuTabName}> 설정 </Text>
							</View>
						</TouchableOpacity>
					: null
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
