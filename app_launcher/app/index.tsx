import { StyleSheet, SectionList, Text, TextInput, TouchableNativeFeedback, Modal, StatusBar } from 'react-native';
import { RNLauncherKitHelper } from 'react-native-launcher-kit';

import { ThemedView } from '@/components/ThemedView';
import { InstalledApps } from 'react-native-launcher-kit';
import { AppDetail } from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';
import React from 'react';
import { ModalContent } from '@/components/ModalContent';
import { AppKeys, getAppKeys } from '@/lib/appKeys';
import { handleFunction } from '@/lib/functions';
import ListOfApps from '@/components/listOfApps';
import Faves from '@/components/faves';



export default function HomeScreen() {
    const [text, setText] = React.useState(''),
        [rawApps, setRawApps] = React.useState<AppDetail[]>([]),
        [apps, setApps] = React.useState<{
            title: string;
            data: AppDetail[];
        }[]>([]),
        [modalVisible, setModalVisible] = React.useState(false),
        [result, setResult] = React.useState(""),
        [appKeys, setAppKeys] = React.useState<AppKeys[]>([]),
        [selectedApp, setSelectedApp] = React.useState<AppDetail>({
            label: "",
            packageName: "",
            icon: "",
        })

    const getApps = (filter?: string) => {
        let apps = InstalledApps.getSortedApps();
        setRawApps(apps)
        const appsToHide = appKeys.filter(app => app.key === "HIDE").map(app => app.appId)

        apps = apps.filter(app => !appsToHide.includes(app.packageName))
        if (filter) {
            apps = apps.filter(app => app.label.toLowerCase().includes(filter.toLowerCase()))
        }
        let sections: Record<string, { title: string, data: AppDetail[] }> = {}

        apps.forEach(app => {
            const first = app.label.substring(0, 1)
            if (sections[first]) {
                sections[first].data.push(app)
            } else {
                sections[first] = { title: first.toLocaleUpperCase(), data: [app] }
            }
        })
        setApps(Object.values(sections))
    }

    const open = (app: AppDetail) => {
        RNLauncherKitHelper.launchApplication(app.packageName)
    }
    const longPress = (app: AppDetail) => {
        setSelectedApp(app)
        setModalVisible(true)
    }
    const onInput = (value: string) => {
        setText(value)
        getApps(value)

        const getFunctionResult = async () => {
            const callResult = await handleFunction(value)
            if (callResult) {
                setResult(callResult)
            } else {
                if (result !== "") {
                    setResult("")
                }

            }
        }
        getFunctionResult()

    }

    React.useEffect(() => {
        if (apps.length === 0) {
            getApps()
        }
        const checkForDefault = async () => {
            const result = await RNLauncherKitHelper.getDefaultLauncherPackageName();
            if (result !== "com.anonymous.app_launcher") {
                const setDefault = await RNLauncherKitHelper.openSetDefaultLauncher();
            }
        }
        const getStoredAppKeys = async () => {
            const appKeys = await getAppKeys()
            setAppKeys(appKeys)
        }
        getStoredAppKeys()
        checkForDefault()
    }, [])



    return (

        <ThemedView style={styles.container}>
            <StatusBar backgroundColor="#000" />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <ModalContent close={() => setModalVisible(!modalVisible)} app={selectedApp} />
            </Modal>
            <TextInput
                style={styles.input}
                onChangeText={onInput}
                value={text}
                placeholder='Type here'
            />
            <Text style={styles.sectionHeader}>{result}</Text>
            <ListOfApps apps={apps} open={open} longPress={longPress} />
            <Faves apps={rawApps} appKeys={appKeys} open={open} longPress={longPress} />

        </ThemedView>

    );
}

const styles = StyleSheet.create({
    homeScreen: {
        flexDirection: 'column',
        alignItems: "flex-start",
        gap: 8,
        flex: 1,
        width: "100%"
    },
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
    input: {
        width: "100%",
        borderWidth: 1,
        padding: 10,
        color: "#fff",
        fontSize: 20,

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
        textAlign: "left",
        color: "#fff"
    }
});
