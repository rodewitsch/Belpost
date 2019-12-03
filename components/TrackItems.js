import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback
} from 'react-native';



export default function TrackItems({ title, track, action, navigation }) {
    return (
        <TouchableWithoutFeedback
            onPress={() => action(navigation)}>
            <View style={styles.item}>
                <View style={styles.caption}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.track}>{track}</Text>
                </View>
                <View style={styles.actions}>
                    <View style={{ ...styles.iconWrapper, backgroundColor: '#72a234' }}>
                        <Ionicons
                            onPress={() => alert('перенаправление')}
                            name='ios-return-right'
                            size={26}
                            color="white"
                        />
                    </View>
                    <View style={{ ...styles.iconWrapper, backgroundColor: 'red' }}>
                        <Ionicons
                            onPress={() => alert('удаление')}
                            name='ios-trash'
                            size={26}
                            color="white"
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback >
    );
}


const styles = StyleSheet.create({
    item: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        flexDirection: "row",
        alignContent: "space-between"
    },
    caption: {
        flexDirection: "column",
        width: 250
    },
    title: {
        fontSize: 15,
        fontWeight: '500'
    },
    track: {
        fontSize: 15
    },
    iconWrapper: {
        borderRadius: 50,
        height: 40,
        width: 40,
        alignContent: "center",
        alignItems: 'center',
        paddingTop: 6,
        marginRight: 5
    },
    actions: {
        flexDirection: "row",
        alignContent: 'flex-end',
        justifyContent: 'flex-end'
    }
});