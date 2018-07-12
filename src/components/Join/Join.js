import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.js';
import colors from '../../styles/colors';
import { fetchJoin } from '../../actions/auth';
import { TouchableHighlight, TextInput, View, Text } from 'react-native';

const initialState = {
	email : '',
	password : '',
	passwordCheck : '',
	focus : null,
	msg : null,
}
class Join extends Component {
	constructor(props){
		super(props);
		//const { navigator } = this.props;
		//this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
		this.state = { ...initialState }
	}
	/*
	static navigatorButtons = {
		leftButtons : [{
			title : '닫기',
			id : 'close'
		}]
	}
	onNavigatorEvent = e => {
		switch(e.id){
			case 'close' : this.handleTouchClose(); break;
		}
	}
	handleTouchClose = () => {
		const { navigator } = this.props;
		this.props.navigator.dismissModal({
			animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
		});
	}
	*/
	handleChangeText = (field,value) => {
		this.setState({ [field] : value});
	}
	onFocus = field => {
		this.setState({
			focus : field
		})
	}
	onBlur = field => {
		this.setState( state => ({
			focus : state.focus===field?null:state.focus
		}));
	}
	handleTouchJoin = () => {
		const { fetchJoin } = this.props;
		const { email, password } = this.state;
		const data = { email, password };
		fetchJoin(data) 
		.then( action => {
			if( !action.error ){
				this.setState({ msg : action.payload });
			} else {
				this.setState({ msg : action.payload.message });
			}
		});
	}
	render() {
		const { email, password, msg, pressed, focus } = this.state;
		return (
			<View style={styles.Join}>
				<View style={styles.joinForm}>
					<Text style={styles.joinText}> 환영합니다! </Text>
					<View style={focus==='email'?styles.joinInputFocusBorder:styles.joinInputBorder}>
						<TextInput 
							style={styles.joinInput}
							onChangeText={text=>this.handleChangeText('email',text)} 
							textContentType='email' 
							autoCapitalize='none'
							placeholder='이메일'
							onFocus={()=>this.onFocus('email')}
							onBlur={()=>this.onBlur('email')}
						/>
					</View>
					<View style={focus==='password'?styles.joinInputFocusBorder:styles.joinInputBorder}>
						<TextInput style={styles.joinInput}
							onChangeText={text=>this.handleChangeText('password',text)}
							textContentType='password' 
							secureTextEntry={true} 
							placeholder="비밀번호"
							onFocus={()=>this.onFocus('password')}
							onBlur={()=>this.onBlur('password')}
						/>
					</View>
					<View style={focus==='passwordCheck'?styles.joinInputFocusBorder:styles.joinInputBorder}>
						<TextInput style={styles.joinInput}
							onChangeText={text=>this.handleChangeText('passwordCheck',text)}
							textContentType='password' 
							secureTextEntry={true} 
							placeholder="비밀번호 확인"
							onFocus={()=>this.onFocus('passwordCheck')}
							onBlur={()=>this.onBlur('passwordCheck')}
						/>
					</View>
					<TouchableHighlight
						style={styles.joinButton}
						onPress={this.handleTouchJoin}
						activeOpacity={1}
						underlayColor={colors.main}
					>
						<Text style={styles.joinButtonText}>
							회원가입
						</Text>	
					</TouchableHighlight>
					<Text style={styles.joinError}>
						{ msg }
					</Text>
				</View>
			</View>
		);
	}
}

const stateToProps = ({user}) => ({user});
const actionToProps = {
	fetchJoin
}
export default connect(stateToProps,actionToProps)(Join);
