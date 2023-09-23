import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter, useSearchParams } from 'expo-router';
import { getDishById } from '../../../assets/data/restaurant';
import Colors from '../../../constants/Colors';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../features/cart/cartSlice';

const SingleDish = () => {
  const dispatch = useDispatch();

  const { singleDish } = useSearchParams();
  const item = getDishById(Number(singleDish));
  const router = useRouter();

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        entering={FadeIn.duration(500).delay(300)}
        source={item.img}
        style={styles.img}
      />
      <View style={{ padding: 20 }}>
        <Animated.Text
          entering={FadeInLeft.duration(500).delay(400)}
          style={styles.title}
        >
          {item.name}
        </Animated.Text>
        <Animated.Text
          entering={FadeInLeft.duration(500).delay(500)}
          style={styles.info}
        >
          {item.info}
        </Animated.Text>
      </View>

      <View style={styles.footer}>
        <View>
          <TouchableOpacity style={styles.fullBtn} onPress={handleAddToCart}>
            <Text style={styles.footerText}>Add for ${item.price}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  img: {
    width: '100%',
    height: 300,
    objectFit: 'cover',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  info: { fontSize: 16, color: Colors.mediumDark, letterSpacing: 0.5 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#fff',
    paddingTop: 20,
    elevation: 20,
  },
  fullBtn: {
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Colors.primary,
    paddingVertical: 10,
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default SingleDish;
