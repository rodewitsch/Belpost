import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { getTrackHistory } from '../../store/actions/services';


class TrackingHistoryScreen extends React.Component {

  constructor(props) {
    super(props);
    props.getTrackHistory(props.navigation.getParam('item').id);
  }

  getHistory(id) {
    const track = this.props.tracks.array[id];
    if (track) return track.history;
    return [];
  }

  render() {
    return (
      <View style={styles.container}>

        <SafeAreaView >
          <ScrollView >
            <FlatList
              data={this.getHistory(this.props.navigation.getParam('item').id)}
              renderItem={({ item }) => (
                <View style={styles.track}>
                  <View style={styles.date}>
                    <Text style={styles.day}>{item.date.format('DD')}</Text>
                    <Text>{item.date.format('MM.YYYY')}</Text>
                  </View>
                  <View style={styles.trackInfo}>
                    <Text style={styles.event}>{item.event}</Text>
                    <Text style={styles.office}>{item.office}</Text>
                  </View>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}

TrackingHistoryScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('title', 'Отслеживание'),
  };
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  track: {
    flexDirection: "row",
    height: 80
  },
  trackInfo: {
    marginLeft: 10,
    flexDirection: "column",
    justifyContent: 'center',
    width: 290
  },
  date: {
    width: 60,
    flexDirection: "column",
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc'
  },
  day: {
    fontSize: 20
  },
  event: {
    fontWeight: "500"
  },
  office: {

  }
});

const mapStateToProps = state => ({
  tracks: state.services.tracks
});

const mapDispatchToProps = dispatch => ({
  getTrackHistory: (index) => dispatch(getTrackHistory(index))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackingHistoryScreen)

