import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import TrackItems from '../../components/TrackItems';
import { getTracks } from '../../store/actions/services';


function buildTracksArray(tracks) {
  return tracks.map((track, index) => ({
    id: `${index}`,
    ...track
  }))
}

class TrackingScreen extends React.Component {

  componentDidMount() {
    this.props.getTracks();
  }

  render() {
    return (
      <View style={styles.container}>

        <SafeAreaView >
          <ScrollView >
            <FlatList
              data={buildTracksArray(this.props.tracks.array)}
              renderItem={({ item }) => <TrackItems {...{
                ...item,
                action: (navigation) => navigation.navigate('TrackingHistory', { item }),
                navigation: this.props.navigation
              }} />}
              keyExtractor={item => item.id}
            />

            <Button
              title="Добавить трек"
              onPress={() => this.props.navigation.navigate('AddTrack')}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}

TrackingScreen.navigationOptions = {
  title: 'Отслеживание отправлений'
};


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

const mapStateToProps = state => ({
  tracks: state.services.tracks
});

const mapDispatchToProps = dispatch => ({
  getTracks: () => dispatch(getTracks())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackingScreen)

