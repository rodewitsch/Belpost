import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { addTrack } from '../../store/actions/services';


class AddTrackScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      track: ''
    };
  }

  addTrack(name, track) {
    this.props.addTrack(name, track)
    .then(() => {
      console.log('navigate');
      this.props.navigation.navigate('Tracking')
    })
    .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container} >

        <SafeAreaView >
          <ScrollView >
            <View style={styles.input}>
              <Text>Название отправления</Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
              />
            </View>
            <View style={styles.input}>
              <Text>Трек-номер отправления</Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={track => this.setState({ track })}
                value={this.state.track}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
        <ActionButton
          buttonColor="rgba(47,220,92,1)"
          onPress={() => this.addTrack(this.state.name, this.state.track)}
          renderIcon={() => (<Icon name="md-checkmark" style={{ fontSize: 25, color: 'white' }} />)}>
        </ActionButton>
      </View>
    )
  };
}

AddTrackScreen.navigationOptions = {
  title: 'Добавление отправления'
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
  tracks: state.services.tracks
});

const mapDispatchToProps = dispatch => ({
  addTrack: (name, track) => dispatch(addTrack(name, track))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTrackScreen)

