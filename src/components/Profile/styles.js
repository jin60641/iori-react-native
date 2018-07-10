import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
export default StyleSheet.create({
    Profile: {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : colors.background,
    },
    profileText : {
        textAlign: 'center',
        color : colors.gray,
        marginBottom : 5,
    }
});
