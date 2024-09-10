import { StyleSheet, SectionList, Text, TouchableNativeFeedback } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { AppDetail } from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';
import React from 'react';
import { AppKeys } from '@/lib/appKeys';
import ListOfApps from './listOfApps';


type Props = {
    apps: AppDetail[]
    open: (app: AppDetail) => void
    longPress: (app: AppDetail) => void
    appKeys: AppKeys[]
}

export default function Faves({ appKeys, apps, open, longPress }: Props) {

    const getFaves = () => {
        const appsToHide = appKeys.filter(app => app.key === "HIDE").map(app => app.appId)
        const faveApps = appKeys.filter(app => app.key === "FAVE").map(app => app.appId)

        const cleanedApps = apps.filter(app => !appsToHide.includes(app.packageName) && faveApps.includes(app.packageName))

        let sections: Record<string, { title: string, data: AppDetail[] }> = {}

        cleanedApps.forEach(app => {
            const first = app.label.substring(0, 1)
            if (sections[first]) {
                sections[first].data.push(app)
            } else {
                sections[first] = { title: first.toLocaleUpperCase(), data: [app] }
            }
        })

        return Object.values(sections)
    }

    return (

        <ThemedView style={styles.container}>
            <Text style={styles.text}>Your Favorites</Text>
            <ListOfApps apps={getFaves()} open={open} longPress={longPress} right />
        </ThemedView>

    );
}

const styles = StyleSheet.create({

    container: {
        position: "absolute",
        borderWidth: 1,
        borderColor: "#fff",
        maxHeight: "50%",
        width: "50%",
        bottom: 0,
        right: 0
    },

    text: {
        margin: 12,
        padding: 10,
        fontSize: 20,
        textAlign: "right",
        color: "#fff"
    }
});
