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
import ProfileItem from '../components/ProfileItems';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Личные данные',
    icon: 'md-person',
    color: '#1272d4',
    action: (navigation) => navigation.navigate('ProfileData')
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Изменить пароль',
    icon: 'ios-unlock',
    color: '#d1d412',
    action: (navigation) => console.log('Изменить пароль', navigation)
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Адресные данные',
    icon: 'ios-pin',
    color: '#12d42a',
    action: () => console.log('Адресные данные')
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Данные документа, удостоверяющего личность',
    icon: 'ios-paper',
    color: '#d41251',
    action: () => console.log('Данные документа, удостоверяющего личность')
  },
];

export function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={{ padding: 20, textAlign: "center", fontSize: 20 }}>
        {props.profile.name}
      </Text>
      <ScrollView
        style={styles.container}>

        <View>

          <SafeAreaView style={styles.container}>
            <FlatList
              data={DATA}
              renderItem={({ item }) => <ProfileItem {...{ ...item, navigation: props.navigation }} />}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>

        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  title: 'Профиль'
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
)(HomeScreen)

