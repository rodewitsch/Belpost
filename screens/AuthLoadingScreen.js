import React from 'react';
import { connect } from 'react-redux';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { getCookiesAsync } from '../store/actions/transport';
import { signIn } from '../store/actions/profile';
import * as Keychain from 'react-native-keychain';

class AuthLoadingScreen extends React.Component {

    componentDidMount() {
        if (!this.props.cookies.value && !this.props.cookies.isFetching) this.props.getCookies();
        if (this.props.authorization.status) this.props.navigation.navigate('App');
    }

    componentDidUpdate() {
        if (!this.props.cookies.value && !this.props.cookies.isFetching) this.props.getCookies();
        if (this.props.cookies.value && !this.props.authorization.status && !this.props.authorization.isFetching) {
            Keychain.getGenericPassword().then(credentials => {
                if (!credentials) return this.props.navigation.navigate('Auth');
                this.props.signIn(credentials.username, credentials.password);
            })
        }
        if (this.props.authorization.status) this.props.navigation.navigate('App');
        if (this.props.authorization.error) this.props.navigation.navigate('Auth');
    }

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    cookies: state.transport.cookies,
    authorization: state.profile.authorization
});

const mapDispatchToProps = dispatch => ({
    getCookies: () => dispatch(getCookiesAsync()),
    signIn: (email, password) => dispatch(signIn(email, password))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthLoadingScreen)
