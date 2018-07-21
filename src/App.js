import React, { Component } from 'react';
import { AppRegistr } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import colors from './styles/colors';

import createStore from './store/store';
const store = createStore();
import { Provider } from 'react-redux';

import Home from './components/Home/Home';
import Side from './components/Side/Side';
import Profile from './components/Profile/Profile';
import Start from './components/Start/Start';
import Login from './components/Login/Login';
import Join from './components/Join/Join';
import Search from './components/Search/Search';
import Chat from './components/Chat/Chat';
import Room from './components/Chat/Room';
import Write from './components/Write/Write';
import Viewer from './components/Viewer/Viewer';

const add = (name,component) => {
	Navigation.registerComponent(name, () => component, store, Provider );
}
add('Home',Home);
add('Side',Side);
add('Profile',Profile);
add('Start',Start);
add('Login',Login);
add('Join',Join);
add('Search',Search);
add('Chat',Chat);
add('Room',Room);
add('Write',Write);
add('Viewer',Viewer);

Navigation.startTabBasedApp({
	tabs: [
		{
			label: 'Home', 
			screen: 'Home', 
			title: '홈', 
			icon: require('./images/tab-home.png'), 
			//selectedIcon: require('./images/one-active.png'), 
			//titleImage: require('./images/one-title.png'), // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
		},
		{
			label: 'Chat',
			screen: 'Chat',
			title: '채팅',
			icon: require('./images/tab-chat.png'), 
			//selectedIcon: require('./images/one-active.png'),
		},
		{
			label: 'Search',
			screen: 'Search',
			title: '검색',
			icon: require('./images/tab-search.png'), 
			//selectedIcon: require('./images/one-active.png'),
		},
	],
	tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
		tabBarTranslucent : false,
		tabBarButtonColor : colors.gray, // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
		tabBarSelectedButtonColor: colors.main, // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
		tabBarBackgroundColor : colors.white, // optional, change the background color of the tab bar
		initialTabIndex : 0, // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
	},
	appStyle: {
		navBarButtonColor: colors.white,
		navBarTextColor : colors.white,
		navBarTextFontSize : 20,
		navBarBackgroundColor : colors.main,
		orientation: 'portrait', // Sets a specific orientation to the entire app. Default: 'auto'. Supported values: 'auto', 'landscape', 'portrait'
		bottomTabBadgeTextColor: colors.main, // Optional, change badge text color. Android only
		bottomTabBadgeBackgroundColor: colors.white, // Optional, change badge background color. Android only
		backButtonImage: require('./images/back.png'), // Change the back button default arrow image with provided image. iOS only
		hideBackButtonTitle: true // Hide back button title. Default is false. If `backButtonTitle` provided so it will take into account and the `backButtonTitle` value will show. iOS only
	},
	drawer: { 
		left: { 
			screen: 'Side',
			passProps: {}, 
			fixedWidth: 500,
		},
		style: { // ( iOS only )
			drawerShadow: false, // optional, add this if you want a side menu drawer shadow
			contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
			leftDrawerWidth: 80, // optional, add this if you want a define left drawer width (50=percent)
			//rightDrawerWidth: 50, // optional, add this if you want a define right drawer width (50=percent)
			shouldStretchDrawer: true // optional, iOS only with 'MMDrawer' type, whether or not the panning gesture will “hard-stop” at the maximum width for a given drawer side, default : true
		},
		type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
		animationType: 'slide', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
																				// for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
		disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
	},
	passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
	animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});
