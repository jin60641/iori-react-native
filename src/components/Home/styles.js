import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
export default StyleSheet.create({
	Home: {
		flex : 1,
		justifyContent : 'center',
		alignItems : 'center',
		backgroundColor : colors.background,
	},
	homeText : {
		textAlign: 'center',
		color : colors.gray,
		marginBottom : 5,
	}
});
