import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function ListNewsItem({ id, title, image, description, date, link, navigation }) {
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('NewsItem', link)}>
            <View style={{ display: "flex", marginBottom: 20 }}>
                <View style={{ flexDirection: "row" }}>
                    <Image style={{ width: 170, height: 80, marginRight: 10, marginBottom: 10 }} source={{ uri: image }}></Image>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ textAlign: 'left', fontSize: 10 }}>{date}</Text>
                        <Text style={{}}>{title}</Text>
                    </View>
                </View>
                <Text style={{ textAlign: 'justify' }}>{description}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    itemWrapper: {
        flexDirection: "column",
    },
    item: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        flexDirection: "row"
    },
    actionsToggle: {
        paddingTop: 9,
        paddingLeft: 15,
        fontSize: 25,
        color: 'black',
        width: 45,
        height: '100%'
    },
    itemActions: {
        backgroundColor: '#ccc'
    },
    action: {
        flexDirection: 'row',
        marginVertical: 10,
        paddingLeft: 20,
        alignItems: 'center'
    },
    actionIcon: {
        fontSize: 22,
        width: 25
    },
    caption: {
        flexDirection: "column",
        width: '85%'
    },
    title: {
        fontSize: 15,
        fontWeight: '500'
    },
    track: {
        fontSize: 15
    }
});