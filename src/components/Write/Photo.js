import React, { Component } from 'react';
import styles from './styles.Photo.js';
import ImagePicker from 'react-native-image-crop-picker';

import { KeyboardAvoidingView, TouchableOpacity, CameraRoll, Image, TextInput, View, Text, FlatList } from 'react-native';

const maxFileCount = 4;
const initialState = {
	photos : [],
}

class Photo extends Component {
	constructor(props){
		super(props);
		this.state = { ...initialState };
	}
	handleTouchCamera = () => {
		ImagePicker.openCamera({
			cropping: true
		})
		.then(image => {
			console.log(image);
		})
		.catch( e => {
			console.log(e);
		});
	}
	handleTouchLibrary = () => {
		const { handleChangeFiles, files } = this.props;
		if( files.length === maxFileCount ){
			return alert(`최대 ${maxFileCount}개의 이미지를 업로드하실 수 있습니다.`);
		}
		ImagePicker.openPicker({
			multiple: true,
			minFiles : 1,
			maxFiles : maxFileCount-files.length,
		})
		.then(images => {
			handleChangeFiles(files.concat(images.map(image => image.sourceURL)));
		})
		.catch( e => {
			console.log(e);
		});
	}
	componentDidMount = () => {	
		this.getPhotos();
	}
	componentWillUnmount = () => {
		ImagePicker.clean()
		.then(() => {
		})
		.catch( e => {
			console.log(e);
		});
	}
	getPhotos = () => {
		CameraRoll.getPhotos({
			first : 20,
			assetType: 'Photos'
		})
		.then( r => {
			this.setState({
				photos : r.edges
			});
		})
		.catch( e => {
			console.log(e);
		});
	}
	shouldComponentUpdate = (nextProps, nextState) => {
		return (
			!!nextProps.text.length !== !!this.props.text.length 
			|| !!nextProps.files.length !== !!this.props.files.length 
			|| !!nextState.photos.length !== !!this.state.photos.length
		);
	}
	render(){
		const { photos } = this.state;
		const { text, files } = this.props;
		console.log(files);
		if( files.length ){
			return (
				<FlatList
					contentContainerStyle={styles.fileList}
					data={files}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					renderItem={ ({item }) => <Image source={{uri:item}} style={styles.item}/> }
					keyExtractor={ item => `Write-file-${item}` }
				/>
			);
		} else if( !text.length ){
			return (
				<View style={styles.photoList}>
					<FlatList
						data={photos}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						renderItem={ ({item }) => <Image source={{uri:item.node.image.uri}} style={styles.item}/> }
						keyExtractor={ item => `Write-photo-${item.node.image.uri}` }
						ListHeaderComponent={ () => (
							<TouchableOpacity
								style={[styles.item,styles.itemButton]}
								onPress={this.handleTouchCamera}
							>
								<Image source={require('../../images/write-camera.png')} style={styles.itemImage} />
								<Text style={styles.itemText}>
									카메라
								</Text>
							</TouchableOpacity>
						)}
						ListFooterComponent={ () => (
							<TouchableOpacity
								style={[styles.item,styles.itemButton]}
								onPress={this.handleTouchLibrary}
							>
								<Image source={require('../../images/write-library.png')} style={styles.itemImage} />
								<Text style={styles.itemText}>
									라이브러리
								</Text>
							</TouchableOpacity>
						)}
					/>
				</View>
			);
		} else {
			return null;
		}
	}
}

export default Photo;
