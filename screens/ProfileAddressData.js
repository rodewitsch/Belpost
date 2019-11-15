import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import {
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  ScrollView
} from 'react-native';

var radio_props = [
  { label: 'param1', value: 0, selected: true },
  { label: 'param2', value: 1 }
];



export function ProfileAddressData(props) {

  const [email, onChangeEmail] = useState('');


  return (
    <View style={styles.container}>

      <SafeAreaView >
        <ScrollView >
          <RadioForm
            style={styles.input}
          >
            {
              radio_props.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i} >
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={obj.selected}
                    onPress={() => console.log('radiobuttoninput')}
                    borderWidth={1}
                    buttonInnerColor={'#e74c3c'}
                    buttonOuterColor={obj.selected ? '#2196f3' : '#000'}
                    buttonSize={40}
                    buttonOuterSize={80}
                    buttonStyle={{}}
                    buttonWrapStyle={{ marginLeft: 10 }}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={() => console.log('RadioButtonLabel')}
                    labelStyle={{ fontSize: 20, color: '#2ecc71' }}
                    labelWrapStyle={{}}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={() => console.log('delete')}
                    labelStyle={{ fontSize: 20, color: '#2ecc71' }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))
            }
          </RadioForm>
          <Button
            title="Добавить"
          // onPress={() => signIn()}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

ProfileAddressData.navigationOptions = {
  title: 'Адресные данные'
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  input: {
    marginTop: 20,
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
)(ProfileAddressData)

