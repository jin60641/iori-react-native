import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
export default StyleSheet.create({
	Profile: {
		flex : 1,
		backgroundColor : colors.white
	},
	header : {
		height : 140,
		width : '100%',
	},
	headerNone : {
		backgroundColor : colors.main
	},
	headerImg : {
		resizeMode : 'cover'
	},
	container : {
		position : 'relative',
		height : 35,
	},
	profileImg : {
		width : 80,
		height : 80,
		borderRadius : 40,
		borderWidth : 5,
		borderColor : colors.white,
		backgroundColor : colors.white,
		position : 'absolute',
		marginTop : -40,
		marginLeft : 10
	},
	info : {
		padding : 15,
	},
	tabBar : {
		marginTop : 0,
		paddingTop : 10,
	},
	name : {
		fontSize : 20,
		fontWeight : '800'
	},
	handle : {
		fontSize : 12,
		color : colors.gray
	},
	introduce : {
		marginTop : 10,
		fontSize : 16,
	},
	buttons : {
		justifyContent : 'flex-end',
		alignItems : 'flex-end',
		flexDirection : 'row',
		marginTop : 8,
	},
	button : {
		marginRight : 8,
		borderWidth : 1,
		borderColor : colors.main,
		height : 26,
		borderRadius : 13,
		justifyContent : 'center',
		alignItems : 'center',
		
	},
	follow : {
		width : 80,
	},
	buttonIcon : {
		marginLeft : 5,
		marginRight : 5,
		width : 15,
		height : 15,
	},
	buttonText : {
		marginLeft : 10,
		marginRight : 10,
		fontSize : 12,
		color : colors.main
	}
});
