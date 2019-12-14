import React from 'react';
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
    }
});