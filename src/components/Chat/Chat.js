import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.Chat.js';
import colors from '../../styles/colors';
import { fetchSearchGroup, fetchSearchUserByHandle, fetchSearchUsers } from '../../actions/search';
import { fetchGetDialogs, fetchMakeGroup } from '../../actions/chat';
import Dialog from './Dialog';

import { FlatList, View } from 'react-native';

const charToStr = {
	'@' : 'user',
	'$' : 'group'
}
const strToChar = {
	'user' : '@',
	'group' : '$',
}

const initialState = {
}

const limit = 10;

class Chat extends Component {
	constructor(props){
		super(props);
		this.state = { ...initialState }
	}
	getFullHandle = (type,handle) => {
		return strToChar[type] + handle;
	}
	componentDidMount = () => {
		const { fetchGetDialogs, handle } = this.props;
		fetchGetDialogs()
		.then( action => {
			if( handle ){
				this.handleChangeTo(handle);
			}
		});
	}
	componentDidUpdate = (prevProps, prevState) => {
		const { handle } = this.props;
		const { to } = this.state;
		if( ( !handle && to && to.handle ) || ( handle && to && handle.substr(1) !== to.handle ) ){
			this.handleChangeTo(handle);
		}
	}
	handleChangeTo = handle => {
		const { fetchSearchGroup, fetchSearchUserByHandle } = this.props;
		if( handle ){
			const type = charToStr[chatHandle[0]];
			const query = chatHandle.substr(1);
			const data = { query };
			if( type === "user" ){
				fetchSearchUserByHandle(data)
				.then( action => {
					if( !action.error ){
						this.openChat(action.payload,type);
					}
				});
			} else {
				fetchSearchGroup(data)
				.then( action => {
					if( !action.error ){
						this.openChat(action.payload,type);
					}
				});
			}
		}
	}
	openChat = (to,type) => {
		const { navigator } = this.props;
		navigator.push({
			screen : 'Room',
			title : to.name,
			passProps : {
				type,
				to,
				handle : this.getFullHandle(type,to.handle)
			}
		});
	}
	/*
	inviteUsers = users => {
		const { layer } = this.state;
		if( layer === "user" ){
			this.openChat(users[0],layer);
		} else if( layer === "group" ){
			const { fetchMakeGroup, history } = this.props;
			fetchMakeGroup({ userIds : users.map( user => user.id )  })
			.then( action => {
				if( !action.error ){
					this.openChat(action.payload,layer);
				}
			});
		}
	}
	*/
	render() {
		const { dialogs, user, navigator } = this.props;
		return (
			<View style={styles.Chat}>
				<FlatList
					data={dialogs}
					renderItem={ ({ item }) => <Dialog dialog={item} user={user} navigator={navigator} openChat={this.openChat}/> }
					keyExtractor={ item => `Dialog-${item.id}` }
				/>
			</View>
		);
	}
}

const stateToProps = ({dialogs,searched,user}) => ({dialogs,searched,user});
const actionToProps = {
	fetchSearchUserByHandle,
	fetchSearchUsers,
	fetchSearchGroup,
	fetchGetDialogs,
	fetchMakeGroup
};

export default connect(stateToProps,actionToProps)(Chat);
