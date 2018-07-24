import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
export default StyleSheet.create({
	Dialog : {
		width : '100%',
		padding : 8,
		paddingLeft : 16,
		paddingRight : 16,
		borderBottomColor : colors.gray,
		borderBottomWidth : 1,
		position : 'relative',
		flexDirection:'row',
	},
	dialogView : {
		position : 'relative',
		flexDirection:'row',
		width : '100%',
	},
	dialogTime : {
		position : 'absolute',
		top : 0,
		right : 0,
		letterSpacing : -1,
        fontSize : 18
	},
	dialogImage : {
		width : 70,
		height : 70,
		borderRadius : 35,
		marginRight : 18,
		backgroundColor : colors.white
	},
	dialogWrap : {
		flexDirection:'column'
	},
	dialogName : {
		fontSize : 18,
		color : colors.black,
		fontWeight : '700',
	},
	dialogText : {
		fontSize : 18,
		color : colors.gray
	},
	dialogActive : {
		color : colors.white,
	},
	DialogActive : {
		backgroundColor : colors.main
	}
});
