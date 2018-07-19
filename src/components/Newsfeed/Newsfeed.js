import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.Newsfeed.js';
import colors from '../../styles/colors';
import { fetchGetPosts } from '../../actions/newsfeed';
import { RefreshControl, FlatList, View, ScrollView } from 'react-native';

import Post from '../Post/Post';

const initialOptions = {
	limit : 20
}

const initialState = {
	loading : false,
	refreshing : false,
	posts : [],
}

class Newsfeed extends Component {
	constructor(props){
		super(props);
		this.state = { ...initialState }
    }
	getPosts = (options = {}) => {
		const { loading, posts } = this.state;
		if( loading ) return false;
		const { fetchGetPosts } = this.props;
		const data = { ...initialOptions, ...this.props.options, offset : posts.length, ...options };
		this.setState({
			loading : true
		});
		fetchGetPosts(data)
		.then( action => {
			if( !action.error ){
				this.setState({
					loading: false,
					refreshing: false,
					posts : data.id?action.payload.concat(posts):posts.concat(action.payload)
				});
			}	 
		}); 
	}
	componentDidMount = () => {
		this.getPosts();
	}
	componentDidUpdate = (prevProps,prevState) => {
		if( prevProps.refresh === false && this.props.refresh ){
			this.handleRefresh();
			this.props.finishRefresh();
		}
	}
	handleTouchUser = handle => {
		const { navigator } = this.props;
		navigator.push({
			screen: 'Profile',
			title: '프로필',
			passProps : { handle }
		});
	}
	handleEndReached = () => {
		this.getPosts();
	}
	handleRefresh = () => {
		const { posts } = this.state;
		const id = posts[0]?posts[0].id:0;
		this.getPosts({ offset : 0, id });
	}
	render() {
		const { user } = this.props;
		const { posts, refreshing } = this.state;
		/*
		// by ScrollView
		return (
			<ScrollView 
				style={styles.Newsfeed}
				onScrollEndDrag={ this.handleEndReached.bind(this) }
				refreshControl={
					<RefreshControl
						colors={[colors.main,colors.gray]}
						tintColor={colors.main}
						refreshing={refreshing}
						onRefresh={this.handleRefresh.bind(this)}
					/>
				}
			>
				{ posts.map( post => (
					<Post key={`Post-${post.id}`} post={post} handleTouchUser={this.handleTouchUser}/> 
				))}
			</ScrollView>
		);
		*/
		// by FlatList
		return (
			<View style={styles.Newsfeed}>
				<FlatList
					data={posts}
					renderItem={ ({item }) => <Post post={item} handleTouchUser={this.handleTouchUser}/> }
					keyExtractor={ item => `Post-${item.id}` }
					onEndReached={ this.handleEndReached.bind(this) }
					onEndReachedThreshold={0.8}
					refreshControl={
						<RefreshControl
							colors={[colors.main,colors.gray]}
							tintColor={colors.main}
							refreshing={refreshing}
							onRefresh={this.handleRefresh.bind(this)}
						/>
					}
				/>
			</View>
		);
	}
}

const stateToProps = ({user}) => ({user});
const actionToProps = {
	fetchGetPosts
}
export default connect(stateToProps,actionToProps)(Newsfeed);
