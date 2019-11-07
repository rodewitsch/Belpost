import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Text,
    StyleSheet,
    TextInput,
    View,
    Image
} from 'react-native'
import { getCookiesAsync, signIn } from '../store/actions/profile';

function AuthLoadingScreen(props) {

    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');


    const signIn = () => {
        props.signIn(email, password);
    }

    useEffect(() => {
        if (!props.cookies) props.getCookies();
        if (props.authorization.status) props.navigation.navigate('Profile');
        if (props.authorization.error) alert(props.authorization.error);
    })

    return (
        <View style={styles.container}>

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
                    onChangeText={text => onChangeEmail(text)}
                    value={email}
                />
            </View>

            <View style={styles.input}>
                <Text>Пароль</Text>
                <TextInput
                    autoCompleteType="password"
                    secureTextEntry={true}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangePassword(text)}
                    value={password}
                />
            </View>

            <Button
                title="Войти"
                onPress={() => signIn()}
            />
        </View >
    )
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
    cookies: state.profile.cookies.value,
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
