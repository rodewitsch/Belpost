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
import { getNews } from '../../store/actions/services';
import ListNewsItem from '../../components/NewsItem';

const buildNewsArray = (tracks) => tracks.map((track, index) => ({ id: `${index}`, ...track }))

class NewsScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() { this.props.getNews(); }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView >
          <ScrollView >
            <FlatList
              data={buildNewsArray(this.props.news.array)}
              renderItem={({ item }) => <ListNewsItem {...{
                ...item,
                navigation: this.props.navigation,
              }} />}
              keyExtractor={item => item.id}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}

NewsScreen.navigationOptions = { title: 'Новости' };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10
  }
});

const mapStateToProps = state => ({ news: state.services.news });

const mapDispatchToProps = dispatch => ({
  getNews: () => dispatch(getNews()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen)

