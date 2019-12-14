import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Text,
    StyleSheet,
    TextInput,
    View,
    Image,
    KeyboardAvoidingView
} from 'react-native'
import { getCookiesAsync } from '../store/actions/transport';
import { signIn } from '../store/actions/profile';

import * as Keychain from 'react-native-keychain';

class AuthLoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount() {
        this.props.getCookies();
        Keychain.getGenericPassword().then(credentials => {
            if (credentials) {
                this.setState({ email: credentials.username, password: credentials.password });
            }
        });
    }

    componentDidUpdate() {
        if (this.props.authorization.status) this.props.navigation.navigate('Services');
        if (this.props.authorization.error) alert(this.props.authorization.error);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                        style={{ height: 100, marginBottom: 50 }}
                        resizeMode="contain"
                        source={require('../assets/images/belpost_logo.jpg')} />

                </View>

                <Text style={{ textAlign: "center", marginBottom: 30, fontSize: 30 }}>Авторизация</Text>

                <View style={styles.input}>
                    <Text>Email</Text>
                    <TextInput
                        autoCompleteType="email"
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                </View>

                <View style={styles.input}>
                    <Text>Пароль</Text>
                    <TextInput
                        autoCompleteType="password"
                        secureTextEntry={true}
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                </View>

                <Button
                    title="Войти"
                    onPress={() => this.props.signIn(this.state.email, this.state.password)}
                />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    input: {
        marginBottom: 20
    }
});

const mapStateToProps = state => ({
    cookies: state.transport.cookies.value,
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
