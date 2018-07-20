import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
export default StyleSheet.create({
    Room : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        flexDirection:'column',
    },
	list : {
		padding : 10,
		transform: [{ scaleY: -1 }]
	},
	item : {
		transform: [{ scaleY: -1 }]
	}
});
