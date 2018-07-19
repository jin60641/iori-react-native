import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
export default StyleSheet.create({
	Write : {
		height : '100%',
		alignItems: 'flex-start',
		backgroundColor: colors.white,
		flexDirection:'column',
		position : 'relative',
		justifyContent: 'space-between',
	},
	body : {
		flex : 1,
		flexDirection : 'row',
		padding : 15,
		position : 'relative',
		justifyContent:'center',
	},
	profile : {
		width : 40,
		height : 40,
		borderRadius : 20,
		marginRight : 7
	},
	text : {	
		flex : 1,
		fontSize : 20,
	},
	photos : {
		height : 100,
		paddingLeft : 5,
		paddingRight : 5,
	},
	photosActive : {
	},
	photosNone : {
		display : 'none',
	},
	photo : {
		height : 80,
		width : 80,
		margin : 5,
		borderRadius : 4
	},
});
