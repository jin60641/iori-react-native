import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
export default StyleSheet.create({
	Setting : {
		flex : 1,
		backgroundColor : colors.white
	},
	header : {
		height : 140,
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
		backgroundColor : colors.white,
		position : 'absolute',
		marginTop : -40,
		marginLeft : 10
	},
});
