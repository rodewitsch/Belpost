import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Text,
    StyleSheet,
    TextInput,
    View,
    Image
} from 'react-native'
import { getCookiesAsync } from '../store/actions/profile';

class AuthLoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
        this.email = '';
        this.password = '';
    }

    componentDidMount() {
        this.dispatch(getCookiesAsync());
    }

    render() {
        return (
            <View style={styles.container}>

                <Image
                    style={{ height: 100, marginBottom: 50 }}
                    resizeMode="contain"
                    source={require('../assets/images/belpost_logo.jpg')} />

                <Text style={{ textAlign: "center", marginBottom: 30, fontSize: 20 }}>Авторизация</Text>

                <View style={styles.input}>
                    <Text>Email</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        value={this.email}
                    />
                </View>

                <View style={styles.input}>
                    <Text>Пароль</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        value={this.password}
                    />
                </View>

                <Button
                    title="Войти"
                    onPress={() => (this.dispatch(signIn(this.email, this.password)))}
                />
            </View >
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

export default connect()(AuthLoadingScreen)
