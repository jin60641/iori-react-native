import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles.Post.js';
import config from '../../../config';
const { host } = config;
import Viewer from '../Viewer/Viewer';

const profile = require('../../images/profile.png');
const maxRowCount = 2;

const initialState = { 
	viewer : -1
}


class Post extends Component {
	constructor(props) {
		super(props);
		const { post } = this.props;
		this.state = { ...initialState, images : Array.from(Array(post.file)).map( (x,i) => `${host}/files/post/${post.id}/${i+1}.png`) }
	}
	getDateString(str){
		let date = new Date(str);
		let now = new Date();
		let gap = Math.floor(now.getTime()/1000) - Math.floor(date.getTime()/1000);
		if( gap < 60 ){
			return "방금";
		} else if( gap < 3600 ){
			return Math.floor(gap/60)+"분 전";
		} else if( gap < 86400 ){
			return Math.floor(gap/60/60)+"시간 전";
		} else {
			let day = Math.floor(gap/60/60/24);
			if( day == 1 ){
				return "어제";
			} else if( day <= 7 ){
				return day + "일 전";
			} else {
				return (date.getYear()+1900) +"년 " + (date.getMonth()+1) + "월 " + date.getDate() + "일";
			}
		}
	}
	handleTouchImage = num => {
		this.setState({
			viewer : num
		});
	}
	handleCloseViewer = () => {
		this.setState({
			viewer : -1
		});
	}
	render() {
		const { post, user, handleTouchUser } = this.props;
		const { images, viewer } = this.state;
		const profileUri = post.user.profile?{uri:`${host}/files/profile/${post.user.id}.png`}:profile;
		const columnCount = parseInt((post.file+1)/maxRowCount);
		const odd = post.file%2;
		return (
			<View style={styles.Post}>
				<Viewer id={`post-${post.id}`} index={viewer} images={images} handleCloseViewer={this.handleCloseViewer}/>
				<TouchableOpacity
					onPress={()=>handleTouchUser(post.user.handle)}
				> 
					<Image source={profileUri} style={styles.profile} />
				</TouchableOpacity>
				<View style={styles.body}>
					<View style={styles.inform}>
						<TouchableOpacity 
							style={styles.touch}
							onPress={()=>handleTouchUser(post.user.handle)}
						> 
							<Text style={styles.name}>
								{post.user.name} 
							</Text>
						</TouchableOpacity>
						<Text style={styles.date}> · {this.getDateString(post.createdAt)} </Text>
					</View>
					<Text style={styles.text}>
							{ post.text }
					</Text>
					{ post.file ?
						<View style={styles.imageBox}>
						{ Array.from(Array(columnCount)).map( (column,i) => {
							const rowCount = (i===0&&odd)?1:maxRowCount;
							return(
								<View style={styles.imageColumn} key={`Post-${post.id}-column-${i+1}`}> 
								{ Array.from(Array(rowCount)).map( (row,j) => {
									const index = i*rowCount+j+(i?(odd?-1:0):0);
									return (
										<TouchableOpacity
											key={`Post-${post.id}-image-${index+1}`} 
											onPress={()=>this.handleTouchImage(index)}
											activeOpacity={1}
											style={[styles.imageWrap,((j+1)===rowCount)?styles.imageBottom:{},((i+1)===columnCount)?styles.imageRight:{}]} 
										>
											<Image
												style={styles.image}
												source={{uri:images[index]}} 
											/>
										</TouchableOpacity>
									);
								})}
								</View>
							);
						})}
						</View>
					: null
					}
				</View>
			</View>
		);
	}
}

export default Post;

