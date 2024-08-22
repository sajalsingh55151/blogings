import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 
import {IMAGES} from '../../utils/images';

const WelcomeScreen = ({navigation}) => {
  const deviceHeight = Dimensions.get('screen').height / 1.8;

  return (
    <>
      <ScrollView
        style={{height: '100%'}}
        contentContainerStyle={{justifyContent: 'center', flex: 1, backgroundColor: '#f0f4f7'}}>
        <LinearGradient colors={['#e0c3fc', '#8ec5fc']} style={styles.gradient}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>ShareYourStories</Text>
            <Text style={styles.subHeaderText}>
              Explore and create engaging blog posts
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={IMAGES.WELCOME}
              style={styles.welcomeImage}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen") }
              style={styles.getStartedButton}>
              <Text style={styles.getStartedText}>
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: 20,
    marginTop: 50,
  },
  headerText: {
    fontSize: 34,
    color: '#4a00e0',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 22,
    color: '#616161',
    fontWeight: '400',
    textAlign: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  welcomeImage: {
    width: '80%',
    resizeMode: 'contain',
    height: Dimensions.get('screen').height / 2,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  getStartedButton: {
    backgroundColor: '#4a00e0',
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  getStartedText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default WelcomeScreen;
