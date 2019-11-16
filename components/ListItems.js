import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback
} from 'react-native';



export default function ListItem({ title, icon, color, action, navigation }) {
    return (
        <TouchableNativeFeedback
            onPress={() => action(navigation)}>
            <View style={styles.item}>
                <View style={{ ...styles.iconWrapper, backgroundColor: color }}>
                    <Ionicons
                        name={icon}
                        size={26}
                        color="white"
                    />
                </View>
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}


const styles = StyleSheet.create({
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
    }
});