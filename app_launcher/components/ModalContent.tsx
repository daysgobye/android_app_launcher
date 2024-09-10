import { addAppKey } from '@/lib/appKeys';
import { Text, StyleSheet, View, Button } from 'react-native';
import { AppDetail } from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';


type Props = {
  close: () => void
  app: AppDetail
}

export function ModalContent({ close, app }: Props) {
  const hide = () => {
    addAppKey(app.packageName, "HIDE")
    close()
  }
  const favorite = () => {
    addAppKey(app.packageName, "FAVE")
    close()
  }
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{app.label} Actions</Text>
        <Button
          onPress={favorite}
          title='Toggle Favorite'
          color="#000" />
        <Button
          onPress={hide}
          title='Hide (can not be undone)'
          color="#000" />

        <Button
          onPress={close}
          title='Close'
          color="#000" />
      </View>
    </View >

  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    width: '75%',
    height: '75%'
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
