import { StyleSheet, SectionList, Text, TouchableNativeFeedback } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { AppDetail } from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';
import React from 'react';


type Props = {
    apps: {
        title: string;
        data: AppDetail[];
    }[]
    open: (app: AppDetail) => void
    longPress: (app: AppDetail) => void
    right?: boolean
}

export default function ListOfApps({ right, apps, open, longPress }: Props) {


    return (

        <ThemedView style={styles.container}>
            <SectionList sections={apps}
                renderItem={({ item }) => (
                    <TouchableNativeFeedback
                        onPress={() => { open(item) }}
                        onLongPress={() => { longPress(item) }}
                        style={styles.btn}
                    >
                        <Text style={{
                            ...styles.btnText,
                            textAlign: right ? "right" : "left",

                        }}>{item.label}</Text>

                    </TouchableNativeFeedback>
                )}
                renderSectionHeader={({ section }) => (
                    <Text style={{
                        ...styles.sectionHeader,
                        textAlign: right ? "right" : "left",

                    }}>{section.title}</Text>

                )}
                keyExtractor={(item, index) => `${index}-${item}`}
            />

        </ThemedView>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        // paddingTop: 22,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#000',
        color: "#fff",
        borderWidth: 1,

        borderBottomColor: "#fff"

    },

    btn: {
        backgroundColor: '#000',
        color: "#fff"
    },
    btnText: {
        margin: 12,
        padding: 10,
        fontSize: 20,
        color: "#fff"
    }
});
