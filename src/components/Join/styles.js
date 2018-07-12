import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
export default StyleSheet.create({
	Join : {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.white,
		flexDirection:'column'
	},
	joinForm : {
		width : '80%'
	},
	joinText : {
		textAlign: 'center',
		color: colors.main,
		marginBottom: 20,
		fontSize: 35
	},
	joinInputBorder : {
		borderBottomWidth : 1,
		borderBottomColor : colors.gray,
		marginBottom : 30,
	},
	joinInputFocusBorder : {
		borderBottomWidth : 1,
		borderBottomColor : colors.main,
		marginBottom : 30,
	},
	joinInput : {
		width : '100%',
		height : 30,
		backgroundColor : colors.white
	},
	joinButton : {
		backgroundColor : colors.main,
		width : '100%',
		height : 44,
		marginBottom : 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	joinButtonText : {
		color : colors.white,
		fontSize : 20,
		fontWeight : '700',
		textAlign : 'center',
	},
	joinError : {
		textAlign : 'left',
		color : colors.red,
		fontSize : 13
	}
});
