import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



export default function TrackItems({ id, title, track, actions, activeItem, navigation }) {
    return (
        <TouchableOpacity
            onPress={() => actions.displayActions(id)}>
            <View style={styles.itemWrapper}>
                <View style={styles.item}>
                    <View style={styles.caption}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.track}>{track}</Text>
                    </View>
                </View>
                <View style={{ ...styles.itemActions, display: (activeItem ? 'flex' : 'none') }}>
                    <TouchableOpacity onPress={() => actions.showHistory(navigation)}>
                        <View style={styles.action}>
                            <Icon style={styles.actionIcon} name='md-search' />
                            <Text>История перемещения</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { alert('пока не сделано') }}>
                        <View style={styles.action}>
                            <Icon style={styles.actionIcon} name='md-return-right' />
                            <Text>Перенаправить посылку</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => actions.deleteTrack(id)}>
                        <View style={styles.action}>
                            <Icon style={styles.actionIcon} name='md-trash' />
                            <Text>Удалить посылку</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity >
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