import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.Room.js';
import colors from '../../styles/colors';
import { fetchGetChats } from '../../actions/chat';
import { FlatList, TextInput, View, Text } from 'react-native';

import Form from './Form';
import Message from './Message';

const initialState = {
	loading : false,
}

const limit = 20;

class Room extends Component {
	constructor(props){
		super(props);
		this.state = { ...initialState };
		const { navigator } = this.props;
		navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}
	onNavigatorEvent = e => {
		if( e.type === 'ScreenChangedEvent' && e.id === 'willAppear' ){
			this.getChats();
		}
	}
	componentDidMount = () => {
//		this.getChats();
	}
	getChats = () => {
		const { to, type, handle, chats, fetchGetChats } = this.props;
		const { loading } = this.state;
		if( loading === true ){
			return null;
		}
		this.setState({loading : true });
		const offset = chats[handle]?chats[handle].length:0;
		fetchGetChats({ from : to, type, limit, offset })
		.then( action => {
			this.setState({loading : false });
		});
	}
	handleTouchUser = handle => {
		const { navigator } = this.props;
		navigator.push({
			screen: 'Profile',
			title: '프로필',
			passProps : { handle }
		});
	}
	handleEndReached = () => {
		this.getChats();
	}
	render(){
		const { handle, chats, user } = this.props;
		return(
			<View style={styles.Room}>
				<FlatList
					inverted={true}
					data={chats[handle]}
					renderItem={ ({ item }) => <Message chat={item} handleTouchUser={this.handleTouchUser} user={user}/> }
					keyExtractor={ item => `Message-${item.id}` }
					onEndReached={ this.handleEndReached.bind(this) }
					onEndReachedThreshold={0.8}
				/>
				<Form />
			</View>
		);
	}
}

const stateToProps = ({chats,user}) => ({chats,user});
const actionToProps = {
	fetchGetChats,
};

export default connect(stateToProps,actionToProps)(Room);
