import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
export default StyleSheet.create({
    Form : {
		width : '100%',
		borderTopWidth : 1,
		borderTopColor : colors.gray,
		padding : 10,
		flexDirection : 'row'
    },
	textarea : {
		borderWidth : 1,
		borderColor : colors.main,
		flex : 1,
		fontSize : 16,
		borderRadius : 4,
		marginLeft : 10,
		marginRight : 10,
		paddingLeft : 5,
		paddingRight : 5
	},
	send : {
		backgroundColor : colors.main,
		height : 30,
		width : 44,
		borderRadius : 4,
		justifyContent : 'center',
		alignItems : 'center',
	},
	sendText : {
		color : colors.white,
		fontSize : 16,
		fontWeight : '700',
	}
});
