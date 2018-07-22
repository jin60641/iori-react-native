import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
export default StyleSheet.create({
	Message : {
		flex : 1,
		width : '100%',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flexDirection: 'row',
		marginTop : 12,
	},
	body : {
	},
	row : {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	my : {
		flexDirection : 'row-reverse',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	MessageMy : {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	profile : {
		width : 40,
		height : 40,
		borderRadius : 20,
	},
	name : {
		marginRight : 6
	},
	nameMy : {
		marginLeft : 6
	},
	wrap : {
		marginTop : 3,
	},
	caret : {
		position : 'relative',
		width : 10,
		height : 10,
		marginTop : 2,
		marginRight : -1,
		zIndex : 1,
	},
	caretMy : {
		marginRight : 0,
		marginLeft : -1,
	},
	caretDefault : {
		position : 'absolute',
		borderColor : 'transparent',
		borderWidth : 0,
	},
	caretInnerDefault : {
		top : 1,
		borderTopWidth: 8,
		borderTopColor: colors.white,
	},
	caretOuterDefault : {
		borderTopWidth: 10,
		borderTopColor: colors.main,
	},
	caretInner :{
		left : 2,
		borderLeftWidth : 8,
	},
	caretInnerMy : {
		right : 2,
		borderRightWidth : 8,
	},
	caretOuter : {
		borderLeftWidth : 10,
	},
	caretOuterMy : {
		borderRightWidth : 10,
	},
	content : {
		borderWidth : 1,
		borderColor : colors.main,
		borderRadius : 4,
	},
	text : {
		margin : 10,
	},
	file : { 
		margin : 2,
		borderRadius : 4,
	}
});
