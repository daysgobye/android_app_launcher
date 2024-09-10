import AsyncStorage from '@react-native-async-storage/async-storage';
export type AppKey = "HIDE" | "FAVE"
export type AppKeys = { appId: string, key: AppKey }
const storageKey = "APPKEYS"

export const getAppKeys = async (): Promise<AppKeys[]> => {
    try {
        const value = await AsyncStorage.getItem(storageKey);
        if (value !== null) {
            return JSON.parse(value)
        } else {
            return []
        }
    } catch (error) {
        return []
    }
}
export const addAppKey = async (appId: string, key: AppKey) => {
    let currentData = await getAppKeys()
    if (key === "FAVE" && currentData.map(app => app.appId).includes(appId)) {
        currentData = currentData.filter(app => app.appId !== appId)
    } else {
        currentData.push({ appId, key })
    }
    try {
        await AsyncStorage.setItem(storageKey, JSON.stringify(currentData));
    } catch (e) {
        // saving error
    }
}