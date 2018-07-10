import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
export default StyleSheet.create({
	Login : {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.white,
		flexDirection:'column'
	},
	loginForm : {
		width : '80%'
	},
	loginText : {
		textAlign: 'center',
		color: colors.main,
		marginBottom: 20,
		fontSize: 35
	},
	loginInputBorder : {
		borderBottomWidth : 1,
		borderBottomColor : colors.gray,
		marginBottom : 30,
	},
	loginInputFocusBorder : {
		borderBottomWidth : 1,
		borderBottomColor : colors.main,
		marginBottom : 30,
	},
	loginInput : {
		width : '100%',
		height : 30,
		backgroundColor : colors.white
	},
	loginButton : {
		backgroundColor : colors.main,
		width : '100%',
		height : 44,
		marginBottom : 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginButtonText : {
		color : colors.white,
		fontSize : 20,
		fontWeight : '700',
		textAlign : 'center',
	},
	loginError : {
		textAlign : 'left',
		color : colors.red,
		fontSize : 13
	}
});
