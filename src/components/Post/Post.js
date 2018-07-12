import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles.js';
import config from '../../../config';
const { host } = config;

const profile = require('../../images/profile.png');
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
		const { post, user } = this.props;
		const profileUri = post.user.profile?{uri:`${host}/public/files/profile/${post.user.id}.png`}:profile;
		return (
			<View style={styles.Post}>
				<TouchableOpacity> 
					<Image source={profileUri} style={styles.profile} />
				</TouchableOpacity>
				<View style={styles.body}>
					<View style={styles.inform}>
						<TouchableOpacity style={styles.touch}> 
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
						<Image style={styles.image} source={{uri:`${host}/public/files/post/${post.id}/1.png`}} alt="post img" />
					: null
					}
				</View>
			</View>
		);
	}
}

export default Post;

