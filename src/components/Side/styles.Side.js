import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
export default StyleSheet.create({
	Side: {
		flex: 1,
		backgroundColor: colors.white,
	},
	profile: {
		padding : 25,
		paddingBottom : 0,
		flexDirection : 'row',
		alignItems: 'center',
		marginBottom : 30
	},
	profileImg: {
		marginRight : 10,
		width : 50,
		height : 50,
		borderRadius : 25,
	},
	profileName: {
		color : colors.black,
		fontSize : 20
	},
	tabMenu : {
		padding : 25,
		flex : 1,
		flexDirection : 'column',
		justifyContent : 'flex-start',
		alignItems : 'flex-start'
	},
	menuTab : {
		height : 40,
		marginBottom : 10,
		width : '100%',
		flexDirection : 'row',
		alignItems: 'center',
	},
	menuTabImg : {
		width : 40,
		height : 40
	},
	menuTabName : {
		flex : 1,
		paddingLeft : 15,
		fontSize : 18
	},
	bottomMenu : {
		padding : 25,
		borderTopWidth : 1,
		borderTopColor : colors.gray,
		width : '100%',
	},
	bottomMenuButton : {
		width : '100%',
		height : 30,
		marginBottom : 20
	},
	bottomMenuTab : {
		height : 30,
		flexDirection : 'row',
        alignItems: 'center',
	},
	bottomMenuTabName : {
		fontSize : 18
	}
});
