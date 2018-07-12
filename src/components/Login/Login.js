import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.js';
import colors from '../../styles/colors';
import { fetchLogin } from '../../actions/auth';
import { AsyncStorage, TouchableHighlight, TextInput, View, Text } from 'react-native';

const initialState = {
	email : '',
	password : '',
	focus : null,
	msg : null,
}
class Login extends Component {
	constructor(props){
		super(props);
		this.state = { ...initialState }
	}
	handleTouchClose = () => {
		const { navigator } = this.props;
		navigator.dismissModal({
			animationType: 'slide-down'
		});
	}
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
	handleTouchLogin = () => {
		const { fetchLogin } = this.props;
		const { email, password } = this.state;
		const data = { email, password };
		fetchLogin(data) 
		.then( async action => {
			if( !action.error ){
				await AsyncStorage.setItem('email',email);
				await AsyncStorage.setItem('password',password);
				this.handleTouchClose();
			} else {
				this.setState({ msg : action.payload.message });
			}
		});
	}
	render() {
		const { email, password, msg, pressed, focus } = this.state;
		return (
			<View style={styles.Login}>
				<View style={styles.loginForm}>
					<Text style={styles.loginText}> 안녕하세요! </Text>
					<View style={focus==='email'?styles.loginInputFocusBorder:styles.loginInputBorder}>
						<TextInput 
							style={styles.loginInput}
							onChangeText={text=>this.handleChangeText('email',text)} 
							textContentType='email' 
							autoCapitalize='none'
							placeholder='이메일'
							onFocus={()=>this.onFocus('email')}
							onBlur={()=>this.onBlur('email')}
						/>
					</View>
					<View style={focus==='password'?styles.loginInputFocusBorder:styles.loginInputBorder}>
						<TextInput style={styles.loginInput}
							onChangeText={text=>this.handleChangeText('password',text)}
							textContentType='password' 
							secureTextEntry={true} 
							placeholder="비밀번호"
							onFocus={()=>this.onFocus('password')}
							onBlur={()=>this.onBlur('password')}
						/>
					</View>
					<TouchableHighlight
						style={styles.loginButton}
						onPress={this.handleTouchLogin}
						activeOpacity={1}
						underlayColor={colors.main}
					>
						<Text style={styles.loginButtonText}>
							로그인
						</Text>	
					</TouchableHighlight>
					<Text style={styles.loginError}>
						{ msg }
					</Text>
				</View>
			</View>
		);
	}
}

const stateToProps = ({user}) => ({user});
const actionToProps = {
	fetchLogin
}
export default connect(stateToProps,actionToProps)(Login);
