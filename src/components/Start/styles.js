import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
export default StyleSheet.create({
	Start : {
		flex : 1,
		justifyContent : 'center',
		alignItems : 'center',
		backgroundColor : colors.main,
		flexDirection :'column'
	},
	box : {
		flex : 1,
		justifyContent : 'center',
		alignItems : 'center',
		flexDirection :'column'
	},
	title : {
		fontSize : 44,
		fontWeight : '800',
		color : colors.white
	},
	buttons : {
		flexDirection : 'row',
		marginBottom : 20,
		width : '80%',
		justifyContent: 'space-between',
	},
	button : {
		borderWidth : 1,
		borderColor : colors.white,
		padding : 10,
		height : 40,
		width : (35*5/4)+'%',
		justifyContent : 'center',
		alignItems : 'center',
	},
	buttonText : {
		fontSize : 17,
		fontWeight : '700',
		color : colors.white
	},
	buttonTextPressed : {
		fontSize : 17,
		fontWeight : '700',
		color : colors.main
	}
});
