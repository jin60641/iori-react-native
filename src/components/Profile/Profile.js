import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import styles from './styles.js';

class Profile extends Component {
	constructor(props) {
		super(props);
	}
	render(){
		const { user } = this.props;
		return(
			<View style={styles.Profile}>
				<Text style={styles.profileText}>
					
				</Text>
			</View>
		);
	}
}

const stateToProps = ({user}) => ({user});
const actionToProps = {
}

export default connect(stateToProps,actionToProps)(Profile);
