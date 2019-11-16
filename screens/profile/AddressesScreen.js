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
import { Ionicons } from '@expo/vector-icons';
import { selectAddress, deleteAddress } from '../../store/actions/profile';


export function AddressesScreen(props) {

  const [email, onChangeEmail] = useState('');

  return (
    <View style={styles.container}>

      <SafeAreaView >
        <ScrollView >
          <RadioForm
            style={styles.input}
          >
            {
              props.addresses.array.map((obj, i) => {
                const deleteIcon = <Ionicons
                  name="ios-trash"
                  size={26}
                />
                return <RadioButton style={{ marginBottom: 20 }} labelHorizontal={true} key={i} >
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={props.addresses.selected == obj.value}
                    onPress={obj => props.selectAddress(obj)}
                    borderWidth={1}
                    buttonInnerColor={'#e74c3c'}
                    buttonOuterColor={props.addresses.selected == obj.value ? '#2196f3' : '#000'}
                    buttonSize={20}
                    buttonOuterSize={40}
                    buttonStyle={{}}
                    buttonWrapStyle={{ marginLeft: 10 }}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={obj => props.selectAddress(obj)}
                    labelStyle={{ width: 240, marginTop: -10 }}
                    labelWrapStyle={{}}
                  />
                  <RadioButtonLabel
                    obj={{ ...obj, label: deleteIcon }}
                    index={i}
                    labelHorizontal={true}
                    onPress={() => props.deleteAddress(obj.value)}
                    labelStyle={{ fontSize: 20, height: 40, width: 40, color: '#ff0000', paddingTop: 5 }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              })
            }
          </RadioForm>
          <Button
            title="Добавить"
            onPress={() => props.navigation.navigate('AddAddress')}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

AddressesScreen.navigationOptions = {
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
  addresses: state.profile.addresses
});

const mapDispatchToProps = dispatch => ({
  selectAddress: (item) => dispatch(selectAddress(item)),
  deleteAddress: (item) => dispatch(deleteAddress(item))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressesScreen)

