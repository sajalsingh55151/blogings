import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MoreScreen = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled">
      <LinearGradient colors={['#8ec5fc', '#e0c3fc']} style={styles.container}>
        <View style={styles.moreContainer}>
          <Text style={styles.headerText}>More Options</Text>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Option 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Option 3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => navigation.navigate('ContactScreen')}>
            <Text style={styles.navigationButtonText}>Contact Us</Text>
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
  moreContainer: {
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
  optionButton: {
    backgroundColor: '#4a00e0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  optionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  navigationButton: {
    backgroundColor: '#4a00e0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  navigationButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MoreScreen;
