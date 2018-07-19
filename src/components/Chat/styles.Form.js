import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
export default StyleSheet.create({
    Form : {
		width : '100%',
		borderTopWidth : 1,
		borderTopColor : colors.gray,
		padding : 4,
		height : 40,
    },
	textarea : {
		borderWidth : 1,
		borderColor : colors.main,
		width : '100%',
		height : '100%',
		fontSize : 15,
		marginRight : 10,
	}
});
