import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView
} from 'react-native';


export function PersonalInfoScreen(props) {

  const [email, onChangeEmail] = useState('');


  return (
    <View style={styles.container}>

      <SafeAreaView >
        <ScrollView >
          <View style={styles.input}>
            <Text>Фамилия</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            // onChangeText={text => onChangePassword(text)}
            // value={password}
            />
          </View>
          <View style={styles.input}>
            <Text>Имя</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            // onChangeText={text => onChangePassword(text)}
            // value={password}
            />
          </View>
          <View style={styles.input}>
            <Text>Отчество*</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            // onChangeText={text => onChangePassword(text)}
            // value={password}
            />
          </View>
          <View style={styles.input}>
            <Text>Email</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            // onChangeText={text => onChangePassword(text)}
            // value={password}
            />
          </View>
          <View style={styles.input}>
            <Text>Телефон</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            // onChangeText={text => onChangePassword(text)}
            // value={password}
            />
          </View>
          <View style={styles.input}>
            <Text>Мобильный оператор</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            // onChangeText={text => onChangePassword(text)}
            // value={password}
            />
          </View>
          <View style={styles.input}>
            <Text>Пароль</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            // onChangeText={text => onChangePassword(text)}
            // value={password}
            />
          </View>
          <Text>*Заполнение поля отчество является обязательным (если таковое имеется) для оказания услуги по перенаправлению.</Text>
          <Button
            title="Сохранить"
          // onPress={() => signIn()}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

PersonalInfoScreen.navigationOptions = {
  title: 'Личные данные'
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  input: {
    marginBottom: 20,
    marginHorizontal: 10
  }
});

const mapStateToProps = state => ({
  profile: state.profile.profile,
});

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps
)(PersonalInfoScreen)

