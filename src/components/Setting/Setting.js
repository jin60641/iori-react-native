import React, { Component } from 'react';
import styles from './styles.Setting.js';
import colors from '../../styles/colors';
import { connect } from 'react-redux';
import config from '../../../config';
const { host } = config;
import { fetchSetProfile } from '../../actions/setting';
import ImagePicker from 'react-native-image-crop-picker';
import { Image, TouchableOpacity, TextInput, View, Text } from 'react-native';

const defaultProfile = require('../../images/profile.png');

const initialState = {
	profile : null,
	header : null,
	name : null,
	introduce : null
};
class Setting extends Component {
	static navigatorButtons = {
		leftButtons : [{
			title : '취소',
			id : 'cancel'
		}],
		rightButtons : [{
			title : '저장',
			id : 'save'
		}]
	}
	constructor(props){
		super(props);
		this.state = { ...initialState }
		const { navigator } = this.props;
		navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}
	onNavigatorEvent = e => {
		if( e.type === 'NavBarButtonPress' ){
			switch(e.id){
				case 'cancel' : this.handleTouchCancel(); break;
				case 'save' : this.handleTouchSave(); break;
			}
		}
	}
	handleTouchSave = () => {
		const { fetchSetProfile, settingSave } = this.props;
		const { profile, header, name, introduce } = this.state;
		const formData = new FormData();
		if( profile ) {
			formData.append('profile',{ type : "image/jpeg", name : 'profile', uri : profile });
			formData.append('profile[crop]',false);
		} else if( profile !== initialState.profile ){
			formData.append('profile[remove]',true);
		}
		if( header ) {
			formData.append('header',{ type : "image/jpeg", name : 'header', uri : header });
			formData.append('header[crop]',false);
		} else if( header !== initialState.header ){
			formData.append('header[remove]',true);
		}
		if( name ) {
			formData.append('name',name);
		}
		if( introduce ) {
			formData.append('introduce',introduce);
		}
		fetchSetProfile(formData)
		.then( action => {
			if( !action.error ){
				if( action.payload ){
					settingSave(action.payload);
					this.handleTouchCancel();
				}
			}
		});
	}
	handleTouchCancel = () => {
		const { navigator } = this.props;
		navigator.dismissModal({
			animationType: 'slide-down'
		});
		this.setState({ ...initialState });
	}
	handleTouchPick = type => {
		ImagePicker.openPicker({
			cropping : true,
			cropperCircleOverlay : type==='profile',
			loadingLabelText : '편집',
			cropperChooseText : '선택',
			cropperCancelText  : '취소',
			avoidEmptySpaceAroundImage : false,
			enableRotationGesture : true,
			
        })
        .then(image => {
      console.log(type,image.path,"!@#$");
			this.setState({ [type] : image.path });
        })
        .catch( e => {
            console.log(e);
        });
	}
	handleChangeText = (key,value) => {
		this.setState({ [key] : value });
	}
	render(){
		const { user } = this.props;
		const { profile, header } = this.state;
		const profileUri = profile ? { uri : profile } : ( user.profile ? { uri : `${host}/files/profile/${user.id}.png` } : defaultProfile );
		const headerUri = { uri : header?header:`${host}/files/header/${user.id}.png` };
		return(
			<View style={styles.Setting}>
				<TouchableOpacity 
					style={styles.header}
					onPress={(()=>this.handleTouchPick('header')).bind(this)}
					activeOpacity={1}
				>
				  <Image source={ headerUri } style={styles.headerImg} />
				</TouchableOpacity>
				<TouchableOpacity 
					style={styles.container}
					onPress={(()=>this.handleTouchPick('profile')).bind(this)}
					activeOpacity={1}
				>
					<Image source={ profileUri } style={styles.profileImg}/>
				</TouchableOpacity>
				<View style={styles.form}>
					<View style={styles.row}>
						<Text style={styles.label}>이름</Text>
						<TextInput 
							style={styles.input}
							placeholder='이름을 입력해주세요'
							defaultValue={user.name} 
							autoCapitalize='none'
	                        autoCorrect={false}
                        	onChangeText={(text=>this.handleChangeText('name',text)).bind(this)}
						/>
					</View>
					<View style={styles.row}>
						<Text style={styles.label}>자기소개</Text>
						<TextInput 
							style={[styles.input,styles.introduce]}
							placeholder='자기소개를 입력해주세요'
							defaultValue={user.introduce} 
							autoCapitalize='none'
	                        autoCorrect={false}
							multiline={true}
                        	onChangeText={(text=>this.handleChangeText('introduce',text)).bind(this)}
						/>
					</View>
				</View>
			</View>
		);
	}
}

const stateToProps = ({user}) => ({user});
const actionToProps = {
	fetchSetProfile,
}

export default connect(stateToProps,actionToProps)(Setting);
