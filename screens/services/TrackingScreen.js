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


export function TrackingScreen(props) {

  const [email, onChangeEmail] = useState('');

  return (
    <View style={styles.container}>

      <SafeAreaView >
        <ScrollView >
          <View style={styles.input}>
            <Text>Название отправления</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            // onChangeText={text => onChangePassword(text)}
            // value={password}
            />
          </View>
          <View style={styles.input}>
            <Text>Введите номер отправления</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            // onChangeText={text => onChangePassword(text)}
            // value={password}
            />
          </View>
          <Button
            title="Сохранить"
          // onPress={() => signIn()}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

TrackingScreen.navigationOptions = {
  title: 'Отслеживание отправлений'
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
)(TrackingScreen)

