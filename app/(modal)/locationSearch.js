import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MapView from 'react-native-maps';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';

const LocationSearch = () => {
  const router = useRouter();
  const [location, setLocation] = useState({
    latitude: 18.5204,
    longitude: 73.8567,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder='Search or move the map'
        fetchDetails={true}
        onPress={(data, details) => {
          // 'details' is provided when fetchDetails = true
          const point = details.geometry.location;
          if (!point) return;
          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          });
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: 'en',
        }}
        renderLeftButton={() => {
          return (
            <View style={styles.boxIcon}>
              <Ionicons name='search-outline' size={24} color={Colors.medium} />
            </View>
          );
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            backgroundColor: Colors.grey,
            paddingLeft: 35,
            borderRadius: 10,
          },
          textInputContainer: {
            padding: 8,
            backgroundColor: '#fff',
          },
        }}
      />

      <MapView style={styles.map} region={location} />

      <View style={styles.absoluteBox}>
        <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
          <Text style={styles.btnText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: { flex: 1 },
  absoluteBox: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  boxIcon: { position: 'absolute', left: 15, top: 18, zIndex: 1 },
});
export default LocationSearch;
