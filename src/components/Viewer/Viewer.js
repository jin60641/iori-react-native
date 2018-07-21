import React, { Component } from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import styles from './styles.Viewer.js';

class Viewer extends Component {
	images = [];
	constructor(props) {
		super(props);
		const { images } = this.props;
		this.images = images.map( image => { return { url : image, props : { style : {} } } });
	}
	render(){
		const { handleCloseViewer, index } = this.props;
		return(
			<Modal visible={index>=0} transparent={true} animationType="fade">
				<ImageViewer imageUrls={this.images} onSwipeDown={handleCloseViewer} enableSwipeDown={true} index={index}/>
			</Modal>
		);
	}
}

export default Viewer;

