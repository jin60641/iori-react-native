import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.js';
import { fetchWritePost } from '../../actions/newsfeed';
import { TouchableHighlight, TextInput, View, Text } from 'react-native';

const initialState = {
}

class Write extends Component {
	constructor(props){
		super(props);
		this.state = { ...initialState }
		const { navigator } = this.props;
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}
	static navigatorButtons = {
		leftButtons : [{
			title : '닫기',
			id : 'close'
		}],
		rightButtons : [{
			title : '전송',
			id : 'send'
		}]
	}
	onNavigatorEvent = e => {
		switch(e.id){
			case 'close' : this.handleTouchClose(); break;
			case 'send' : this.handleTouchSend(); break;
		}
	}
    handleTouchClose = () => {
        const { navigator } = this.props;
        navigator.dismissModal({
            animationType: 'slide-down'
        });
    }
	handleTouchSend = () => {
		const { navigator } = this.props;
        navigator.dismissModal({
            animationType: 'slide-down'
        });
	}
	render() {
		return (
			<View style={styles.Write}>
			</View>
		);
	}
}

const stateToProps = ({user}) => ({user});
const actionToProps = {
	fetchWritePost
}
export default connect(stateToProps,actionToProps)(Write);
