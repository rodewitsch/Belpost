import React from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
import ListItem from '../../components/ListItems';
import { getProfile, signOut } from '../../store/actions/profile';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Личные данные',
    icon: 'md-person',
    color: '#1272d4',
    action: (navigation) => navigation.navigate('PersonalInfo')
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Изменить пароль',
    icon: 'ios-unlock',
    color: '#d1d412',
    action: (navigation) => navigation.navigate('ChangePass')
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Адресные данные',
    icon: 'ios-pin',
    color: '#12d42a',
    action: (navigation) => navigation.navigate('Addresses')
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Документ удостоверяющий личность',
    icon: 'ios-paper',
    color: '#d41251',
    action: (navigation) => navigation.navigate('PersonalDocument')
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d76',
    title: 'Выйти уз учетной записи',
    icon: 'ios-exit',
    color: '#d92b24',
    action: (navigation) => navigation.navigate('SignIn', { clear: true })
  },
];

class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() { this.props.getProfile(); }

  render() {
    return (<View style={styles.container} >

      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        <TouchableOpacity style={styles.photo}>
          <View>
            <Icon style={{ fontSize: 50 }} name='md-contact' />
          </View>
        </TouchableOpacity>
        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold', paddingVertical: 5 }}>Данные профиля</Text>
          <Text style={{ fontSize: 15, paddingVertical: 3 }}>Фамилия: {this.props.profile.lastName}</Text>
          <Text style={{ fontSize: 15, paddingVertical: 3 }}>Имя: {this.props.profile.firstName}</Text>
          <Text style={{ fontSize: 15, paddingVertical: 3 }}>Отчество: {this.props.profile.middleName}</Text>
          <Text style={{ fontSize: 15, paddingVertical: 3 }}>Email: {this.props.profile.email}</Text>
          <Text style={{ fontSize: 15, paddingVertical: 3 }}>{((this.props.profile.mobileOperators || []).find(el => el.selected) || {}).value} {this.props.profile.phoneNumer}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.container}>

        <View>
          <SafeAreaView style={styles.container}>
            <FlatList
              data={DATA}
              renderItem={({ item }) => <ListItem {...{ ...item, navigation: this.props.navigation }} />}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        </View>
      </ScrollView>
    </View>
    )
  }
}

ProfileScreen.navigationOptions = {
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
  iconWrapper: {
    borderRadius: 50,
    height: 40,
    width: 40,
    alignContent: "center",
    alignItems: 'center',
    paddingTop: 6,
    marginRight: 10
  },
  photo: {
    height: 200,
    width: 150,
    backgroundColor: '#ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  }
});

const mapStateToProps = state => ({
  profile: state.profile.profile,
});

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(getProfile())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen)

