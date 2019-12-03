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
              renderItem={({ item }) => <View><Text>{item.date}</Text><Text>{item.event}</Text><Text>{item.office}</Text></View>}
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
  input: {
    marginBottom: 20,
    marginHorizontal: 10
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

