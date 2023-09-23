import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import SearchBar from './SearchBar';
import BottomSheet from './BottomSheet';

const CustomHeader = () => {
  const bottomSheetRef = useRef(null);

  const openModal = () => {
    bottomSheetRef.current.present();
  };

  return (
    <SafeAreaView>
      <BottomSheet reference={bottomSheetRef} />

      <View style={[styles.container]}>
        <TouchableOpacity onPress={openModal}>
          <Image
            source={require('../assets/images/bike.png')}
            style={[styles.bike]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.titleContainer]} onPress={openModal}>
          <Text style={[styles.title]}>Delivery . Now</Text>
          <View style={[styles.location]}>
            <Text style={[styles.subTitle]}>Pune, India</Text>
            <Ionicons name='chevron-down' size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.profileBtn]}>
          <Ionicons name='person-outline' size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <SearchBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    paddingHorizontal: 20,
  },
  bike: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: Colors.medium,
  },
  location: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileBtn: {
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 50,
  },
});
export default CustomHeader;
