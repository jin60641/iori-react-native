import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.js';
import { fetchGetPosts } from '../../actions/newsfeed';
import { FlatList, View } from 'react-native';

import Post from '../Post/Post';

const initialOptions = {
	limit : 10
}

const initialState = {
	loading : false
}

class Newsfeed extends Component {
	constructor(props){
		super(props);
		this.state = { ...initialState }
	}
	handleGetPosts = (options = {}) => {
		const { loading } = this.state;
		if( loading ) return false;
		const { fetchGetPosts, posts } = this.props;
		const data = Object.assign(initialOptions,{ offset : posts.length }, options);
		this.setState({
			loading : true
		});
		fetchGetPosts(data)
		.then( action => {
			if( !action.error ){
				this.setState({
					loading: false
				});
			}   
		}); 
	}
	componentDidMount = () => {
		this.handleGetPosts();
	}
	render() {
		const { user, posts } = this.props;
		return (
			<View style={styles.Newsfeed}>
				<FlatList
					data={posts}
					renderItem={ ({item }) => <Post post={item} /> }
					keyExtractor={ item => `Post-${item.id}` }
					onEndReached={ this.handleGetPosts }
					onEndReachedThreshold={1}
				/>
			</View>
		);
	}
}

const stateToProps = ({user,posts}) => ({user,posts});
const actionToProps = {
    fetchGetPosts
}
export default connect(stateToProps,actionToProps)(Newsfeed);
