import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
export default StyleSheet.create({
	Photo : {
	},
	fileList : {
		height : 240,
		paddingLeft : 47
	},
	photoList : {
		height : 100,
		paddingTop : 10,
		paddingBottom : 10,
		paddingLeft : 10,
	},
	item : {
		height : '100%',
		aspectRatio: 1,
		borderRadius : 4,
		marginRight : 10,
	},
	itemButton : {
		alignItems : 'center',
		justifyContent : 'center',
		flexDirection : 'column',
		borderWidth : 3,
		borderColor : colors.main
	},
	itemImage : {
		height : '50%',
		width : '50%',
	},
	itemText : {
		color : colors.main,
		marginTop : 5,
		fontWeight : '800',
		fontSize : 14,
	},
});
