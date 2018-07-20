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
		flexDirection : 'row',
		padding : 15,
		position : 'relative',
		justifyContent: 'center',
	},
	profile : {
		width : 40,
		height : 40,
		borderRadius : 20,
		marginRight : 7
	},
	textarea : {	
		flex : 1,
		fontSize : 20,
	},
});
