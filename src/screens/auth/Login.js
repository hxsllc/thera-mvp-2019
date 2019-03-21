/**
 * Login
 */
import React from 'react';
import { View, Button as RNButton } from 'react-native';
import { Form, Item, Input, Button, Text, H1 } from 'native-base';
import { Auth } from 'aws-amplify';

import { authStyles } from './styles';

export class Login extends React.Component {
	state = {
		username: '',
		password: '',
	}

	onChangeUsername = (username) => this.setState({ username });

	onChangePassword = (password) => this.setState({ password });

	onSignInPress = async () => {
		const { username, password } = this.state;
		try {
			// Verify the user
			const user = await Auth.signIn(username, password);

			// TODO: Save the user object to session so the app can use it.
			console.log(user);

			// Navigate into the app
			this.props.navigation.navigate('App');
		} catch (err) {
			// TODO: Handle auth errors
			console.log(err);
		}
	}

	navigateToSignup = () => this.props.navigation.navigate('Signup');

  render() {
    return (
      <View style={authStyles.container}>
			<H1>Login</H1>
				<Form style={authStyles.form}>
					<Item rounded style={authStyles.inputField}>
						<Input
							placeholder="Username"
							value={this.state.username}
							onChangeText={this.onChangeUsername}
						/>
					</Item>
					<Item rounded style={authStyles.inputField}>
						<Input
							placeholder="Password"
							value={this.state.password}
							onChangeText={this.onChangePassword}
							secureTextEntry
						/>
					</Item>
					<Button block onPress={this.onSignInPress} style={authStyles.button}>
						<Text>Login</Text>
					</Button>
					<Text style={{ textAlign: 'center' }}>Or</Text>
					<RNButton title="Sign up" onPress={this.navigateToSignup} />
				</Form>
      </View>
    );
  }
}