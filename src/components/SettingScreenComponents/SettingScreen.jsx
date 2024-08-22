import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Switch,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SettingScreen = ({navigation}) => {
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <LinearGradient colors={['#8ec5fc', '#e0c3fc']} style={styles.container}>
        <View style={styles.settingContainer}>
          <Text style={styles.headerText}>Settings</Text>
          <View style={styles.settingOption}>
            <Text style={styles.optionText}>Enable Notifications</Text>
            <Switch />
          </View>
          <View style={styles.settingOption}>
            <Text style={styles.optionText}>Dark Mode</Text>
            <Switch />
          </View>
          <View style={styles.settingOption}>
            <Text style={styles.optionText}>Auto-Update</Text>
            <Switch />
          </View>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() =>
              navigation.navigate('DetailsScreen', {
                data1: 'Sanji',
              })
            }>
            <Text style={styles.navigationButtonText}>Go to Profile</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  settingContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#4a00e0',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingOption: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  navigationButton: {
    backgroundColor: '#4a00e0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  navigationButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SettingScreen;
