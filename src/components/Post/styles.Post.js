import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
export default StyleSheet.create({
	Post : {
		width : '100%',
		backgroundColor : colors.white,
		borderBottomWidth : 1,
		borderBottomColor : '#e5e6e9',
		borderRadius : 3,
		padding : 10,
		flexDirection : 'row',
	},
	profile : {
		width : 50,
		height : 50,
		borderRadius : 25,
		marginRight : 10,
		backgroundColor : colors.white,
	},
	inform : {
		flexDirection : 'row',
		alignItems: 'flex-start',
	},
	touch : {
		marginTop : 2
	},
	name : {
		fontSize : 13,
		fontWeight : '800',
	},
	date : {
		marginLeft : 3,
		color : colors.gray,
		fontSize : 13,
	},
	body : {
		flex : 1,
		paddingRight : 10,
		flexDirection : 'column',
	},
	text : {
		width : '100%',
		color : colors.black,
		fontSize : 13,
		marginBottom : 10,
	},
	imageBox : {
		width : '100%',
		aspectRatio : 1,
		flexDirection : 'row',
	},
	imageColumn : {
		flex : 1,
		flexDirection : 'column',
	},
	imageRow : {
		flex : 1,
		flexDirection : 'row',
	},
	imageWrap : {
		flex : 1,
		marginBottom : 10,
		marginRight : 10,
	},
	image : {
		width : '100%',
		height : '100%',
		borderRadius : 6,
		borderWidth : 1,
		borderColor : colors.gray,
	},
	imageRight : {
		marginRight : 0
	},
	imageBottom : {
		marginBottom : 0
	}
});
