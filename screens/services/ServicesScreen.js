import React from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
import ListItem from '../../components/ListItems';

const DATA = [
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Почтовые отправления',
    icon: 'ios-cube',
    color: '#72a234',
    action: (navigation) => navigation.navigate('Tracking')
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Перенаправление',
    icon: 'ios-return-right',
    color: '#fe7e0f',
    action: (navigation) => navigation.navigate('Redirect')
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Отправка уведомлений на email',
    icon: 'ios-at',
    color: '#258981',
    action: (navigation) => navigation.navigate('EmailNotice')
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d79',
    title: 'Архив',
    icon: 'ios-filing',
    color: '#2196f3',
    action: (navigation) => navigation.navigate('Archive')
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d81',
    title: 'Новости',
    icon: 'ios-paper',
    color: '#02b1b1',
    action: () => alert('Функционал не реализован')
  }
];

function ServicesScreen(props) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}>

        <View>

          <SafeAreaView style={styles.container}>
            <FlatList
              data={DATA}
              renderItem={({ item }) => <ListItem {...{ ...item, navigation: props.navigation }} />}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>

        </View>
      </ScrollView>
    </View>
  );
}

ServicesScreen.navigationOptions = {
  title: 'Услуги'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 15
  },
  icon: {

  },
  iconWrapper: {
    borderRadius: 50,
    height: 40,
    width: 40,
    alignContent: "center",
    alignItems: 'center',
    paddingTop: 6,
    marginRight: 10
  }
});

const mapStateToProps = state => ({
  profile: state.profile.profile,
});

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesScreen)

