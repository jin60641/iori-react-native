import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles.Post.js';
import config from '../../../config';
const { host } = config;

const profile = require('../../images/profile.png');
const maxRowCount = 2;
class Post extends Component {
	constructor(props) {
		super(props);
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
	render() {
		const { post, user, handleTouchUser } = this.props;
		const profileUri = post.user.profile?{uri:`${host}/files/profile/${post.user.id}.png`}:profile;
		const columnCount = post.file===2?2:parseInt((post.file+1)/maxRowCount);
		const odd = post.file%2;
		return (
			<View style={styles.Post}>
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
							const rowCount = ((i===0&&odd)||post.file===2)?1:maxRowCount;
							return(
								<View style={styles.imageColumn} key={`Post-${post.id}-column-${i+1}`}> 
								{ Array.from(Array(rowCount)).map( (row,j) => {
									const number = i*rowCount+(j+1)+(i?(odd?-1:0):0);
									return (
										<Image 
											style={[styles.image,((j+1)===rowCount)?styles.imageBottom:{},((i+1)===columnCount)?styles.imageRight:{}]} 
											source={{uri:`${host}/files/post/${post.id}/${number}.png`}} 
											key={`Post-${post.id}-image-${number}`} 
										/>
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

