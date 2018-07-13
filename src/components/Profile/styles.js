import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
export default StyleSheet.create({
	Profile: {
		flex : 1,
		backgroundColor : colors.white
	},
	header : {
		height : 120,
		width : '100%',
		backgroundColor : colors.main
	},
	headerImg : {
		width : '100%',
		height : '100%',
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
		position : 'absolute',
		marginTop : -40,
		marginLeft : 10
	},
	info : {
		padding : 15
	},
	name : {
		fontSize : 20,
		fontWeight : '800'
	},
	handle : {
		fontSize : 12,
		color : colors.gray
	},
});
