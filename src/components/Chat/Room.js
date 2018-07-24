import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.Room.js';
import colors from '../../styles/colors';
import { fetchSendChat, fetchGetChats } from '../../actions/chat';
import { KeyboardAvoidingView, View, FlatList, TextInput, Text } from 'react-native';

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
			passProps : { handle }
		});
	}
	handleEndReached = param => {
		console.log("@@@@@@@@@@@" + JSON.stringify(param));
		this.getChats();
	}
	handleSend = data => {
		const { fetchSendChat, to, type } = this.props;
		let formData = new FormData();
		formData.append("to",to.id);
		formData.append("type",type);
		Object.keys(data).forEach( key => {
			formData.append(key,data[key]);
		});
		fetchSendChat(formData)
		.then( action => {
			if( !action.error ){
				this.list.scrollToOffset({ offset : 0, animated : false });
			}
		})
	}
	render(){
		const { handle, chats, user } = this.props;
		const { to, type } = this.props;
		const data = chats[handle]?chats[handle].slice().reverse():[];
		return(
			<KeyboardAvoidingView 
				style={styles.Room}
				behavior="position"
				enabled={true} 
				keyboardVerticalOffset={64}
			>  
				<FlatList
					inverted
					style={styles.list}
					data={data}
					renderItem={ ({ item }) => <View style={styles.item}><Message chat={item} handleTouchUser={this.handleTouchUser} user={user}/></View> }
					keyExtractor={ item => `Message-${item.id}` }
					onEndReached={ this.handleEndReached.bind(this) }
					onEndReachedThreshold={0.8}
					ref={ dom => this.list = dom }
				/>
				<Form handleSend={this.handleSend}/>
			</KeyboardAvoidingView>
		);
	}
}

const stateToProps = ({chats,user}) => ({chats,user});
const actionToProps = {
	fetchSendChat,
	fetchGetChats
};

export default connect(stateToProps,actionToProps)(Room);
