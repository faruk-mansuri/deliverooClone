import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import Colors from '../constants/Colors';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const BottomSheet = ({ reference }) => {
  const router = useRouter();
  const snapPoint = useMemo(() => ['50%'], []);

  const renderBackdrop = useCallback((props) => {
    return (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    );
  }, []);

  const { dismiss } = useBottomSheetModal();

  return (
    <BottomSheetModal
      handleIndicatorStyle={{ display: 'none' }}
      backgroundStyle={{ backgroundColor: Colors.lightGrey, borderRadius: 10 }}
      snapPoints={snapPoint}
      ref={reference}
      overDragResistanceFactor={0}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.contentContainer}>
        <View style={styles.toggle}>
          <TouchableOpacity style={styles.toggleActive}>
            <Text style={styles.activeText}>Delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toggleInactive}>
            <Text style={styles.InactiveText}>Picker</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subHeader}>Your Location</Text>

        <TouchableOpacity
          onPress={() => {
            router.push('locationSearch');
            dismiss();
          }}
        >
          <View style={styles.item}>
            <Ionicons name='location-outline' size={20} color={Colors.medium} />
            <Text style={{ flex: 1 }}>Current Location</Text>
            <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        <Text style={[styles.subHeader, { marginTop: 24 }]}>Arrival Time</Text>
        <TouchableOpacity>
          <View style={styles.item}>
            <Ionicons
              name='stopwatch-outline'
              size={20}
              color={Colors.medium}
            />
            <Text style={{ flex: 1 }}>Now</Text>
            <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => dismiss()} style={styles.btn}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  toggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 32,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 30,
  },
  toggleInactive: {
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 30,
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  InactiveText: {
    color: Colors.primary,
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 4,
    margin: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subHeader: { fontSize: 16, fontWeight: '600', margin: 15 },
  item: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 13,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
});

export default BottomSheet;
