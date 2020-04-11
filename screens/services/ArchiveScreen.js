import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { getArchive } from '../../store/actions/services';


export class ArchiveScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { archive: { array: [] } };
  }

  componentDidMount() {
    this.props.getArchive();
  }

  render() {
    return (
      <View style={styles.container} >

        <SafeAreaView >
          <ScrollView >
            {
              this.props.archive.array.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row' }}>
                  <Text>{item.event}</Text>
                  <Text>{item.date.format('DD.MM.YYYY')}</Text>
                  <Text>{item.trackCode}</Text>
                  <Text>{item.name}</Text>
                </View>
              ))
            }
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

ArchiveScreen.navigationOptions = { title: 'Архив отправлений' };


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

const mapStateToProps = state => ({ archive: state.services.archive });

const mapDispatchToProps = dispatch => ({
  getArchive: () => dispatch(getArchive()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveScreen)

