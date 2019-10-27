import React from 'react';
import {
    AsyncStorage,
    Button,
    Text,
    StyleSheet,
    TextInput,
    View,
    Image
} from 'react-native';

export default function AuthLoadingScreen({ navigation }) {
    function signIn() {
        navigation.navigate('App');
    }

    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    // Render any loading content that you like here
    return (
        <View style={styles.container}>

            <Image
                style={{ height: 100, marginBottom: 50 }}
                resizeMode="center"
                source={require('../assets/images/belpost_logo.jpg')} />

            <Text style={{textAlign: "center", marginBottom: 30, fontSize: 20}}>Авторизация</Text>

            <View style={styles.input}>
                <Text>Email</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeEmail(text)}
                    value={email}
                />
            </View>

            <View style={styles.input}>
                <Text>Пароль</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangePassword(text)}
                    value={password}
                />
            </View>

            <Button
                title="Войти"
                onPress={signIn}
            />

        </View >
    );
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
