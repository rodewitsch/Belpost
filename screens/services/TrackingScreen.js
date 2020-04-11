import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Alert
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import TrackItems from '../../components/TrackItems';
import { getTracks, deleteTrack } from '../../store/actions/services';


const buildTracksArray = (tracks) => tracks.map((track, index) => ({ id: `${index}`, ...track }))

class TrackingScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: -1
    };
  }

  componentDidMount() { this.props.getTracks(); }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView >
          <ScrollView >
            <View style={{ display: (this.props.tracks.array.length ? 'none' : 'flex') }}>
              <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '30%' }}>Добавьте трек код посылки для отслеживания</Text>
            </View>
            <FlatList
              data={buildTracksArray(this.props.tracks.array)}
              renderItem={({ item }) => <TrackItems {...{
                ...item,
                actions: {
                  deleteTrack: (index) => this.props.deleteTrack(this, index),
                  showHistory: (navigation) => navigation.navigate('TrackingHistory', { item }),
                  displayActions: (index) => this.setState({ activeItem: this.state.activeItem == index ? -1 : index })
                },
                activeItem: this.state.activeItem == item.id,
                navigation: this.props.navigation,
              }} />}
              keyExtractor={item => item.id}
            />
          </ScrollView>
        </SafeAreaView>

        <ActionButton
          buttonColor="rgba(47,149,220,1)"
          onPress={() => this.props.navigation.navigate('AddTrack')}
          renderIcon={() => (<Icon name="md-add" style={{ fontSize: 25, color: 'white' }} />)}>
        </ActionButton>
      </View>
    )
  }
}

TrackingScreen.navigationOptions = { title: 'Почтовые отправления' };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  input: {
    marginBottom: 20,
    marginHorizontal: 10
  }
});

const mapStateToProps = state => ({ tracks: state.services.tracks });

const mapDispatchToProps = dispatch => ({
  getTracks: () => dispatch(getTracks()),
  deleteTrack: (state, index) => {
    Alert.alert(
      '',
      'Удалить отправление?',
      [
        {
          text: 'Да',
          onPress: () => {
            dispatch(deleteTrack(index))
            state.setState({ activeItem: -1 })
          },
          style: 'cancel',
        },
        { text: 'Нет' },
      ],
      { cancelable: false }
    );
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackingScreen)

