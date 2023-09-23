import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { ParallaxScrollView } from '../components';
import { restaurant } from '../assets/data/restaurant';
import Colors from '../constants/Colors';
import { useRouter } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';

const Details = () => {
  const router = useRouter();
  const { noOfCartItems, totalAmount } = useSelector(
    (store) => store.cartStore
  );
  const DATA = restaurant.food.map((item, index) => {
    return {
      title: item.category,
      data: item.meals,
      index,
    };
  });

  const opacity = useSharedValue(0);
  const [activeBtn, setActiveBtn] = useState(0);
  const animatedStyles = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const onScroll = (e) => {
    const y = e.nativeEvent.contentOffset.y;
    if (y > 150) {
      opacity.value = withTiming(1);
    } else {
      opacity.value = withTiming(0);
    }
  };

  const scrollRef = useRef(null);
  const itemsRef = useRef([]);

  const handleBtn = (index) => {
    setActiveBtn(index);

    const selected = itemsRef.current[index];
    selected.measure((x) => {
      // scrollRef.current.scrollTo({ x: x, y: 0, animated: true });
    });
  };

  return (
    <>
      <ParallaxScrollView
        scrollEvent={onScroll}
        backgroundColor='#fff'
        style={{ flex: 1 }}
        parallaxHeaderHeight={250}
        stickyHeaderHeight={80}
        renderBackground={() => (
          <Image
            source={restaurant.img}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        renderStickyHeader={() => (
          <View key='sticky-header' style={styles.stickySection}>
            <Text style={styles.stickyText}>{restaurant.name}</Text>
          </View>
        )}
      >
        <View style={styles.detailsContainer}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantDesc}>
            {restaurant.delivery} .{' '}
            {restaurant.tags.map((tag, index) => {
              return `${tag} ${
                index < restaurant.tags.length - 1 ? ' . ' : ''
              }`;
            })}
          </Text>
          <Text style={styles.restaurantAbout}>{restaurant.about}</Text>

          <SectionList
            contentContainerStyle={{ marginTop: 20 }}
            scrollEnabled={false}
            sections={DATA}
            renderSectionHeader={({ section: { title } }) => {
              return <Text style={styles.sectionHeader}>{title}</Text>;
            }}
            keyExtractor={(_, index) => index}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.sectionItem}
                  onPress={() => router.push(`dish/${item.id}`)}
                >
                  <View style={{ flex: 1, gap: 10 }}>
                    <Text style={styles.sectionText}>{item.name}</Text>
                    <Text style={styles.sectionInfo}>{item.info}</Text>
                    <Text style={{ color: Colors.green }}>$ {item.price}</Text>
                  </View>
                  <Image source={item.img} style={styles.dishImg} />
                </TouchableOpacity>
              );
            }}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.grey }} />
            )}
            SectionSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.grey }} />
            )}
          />
        </View>
      </ParallaxScrollView>

      <Animated.View style={[styles.stickySegments, animatedStyles]}>
        <View>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10, gap: 10 }}
          >
            {restaurant.food.map((item, index) => {
              return (
                <TouchableOpacity
                  ref={(ref) => (itemsRef.current[index] = ref)}
                  key={index}
                  style={[
                    styles.segmentBtn,
                    activeBtn === index && { backgroundColor: Colors.primary },
                  ]}
                  onPress={() => handleBtn(index)}
                >
                  <Text
                    style={[
                      styles.segmentBtnText,
                      activeBtn === index && {
                        color: '#fff',
                      },
                    ]}
                  >
                    {item.category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Animated.View>

      {/* FOOTER  */}
      {noOfCartItems > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => router.push('cart')}
            style={styles.fullBtn}
          >
            <View style={styles.cartItems}>
              <Text style={styles.number}>{noOfCartItems}</Text>
            </View>
            <Text style={styles.footerText}>View Basket</Text>
            <Text style={styles.footerText}>${totalAmount}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: '#fff',
  },
  stickySection: {
    backgroundColor: '#fff',
    height: 80,
    justifyContent: 'flex-end',
  },
  stickyText: {
    marginLeft: 70,
    marginBottom: 10,
    fontSize: 17,
  },
  restaurantName: {
    fontSize: 30,
    color: Colors.primary,
  },
  restaurantDesc: {
    fontSize: 16,
    marginTop: 15,
    lineHeight: 22,
    letterSpacing: 1,
    color: Colors.medium,
    fontWeight: 'bold',
  },
  restaurantAbout: {
    marginTop: 15,
    letterSpacing: 0.5,
    color: Colors.medium,
  },
  sectionHeader: {
    fontWeight: '400',
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 12,
    color: Colors.mediumDark,
    backgroundColor: Colors.grey,
    paddingHorizontal: 10,
  },
  sectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    gap: 10,
  },
  sectionText: {
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
  sectionInfo: {
    fontWeight: '300',
    letterSpacing: 0.5,
  },

  dishImg: {
    width: 100,
    height: 100,
    borderRadius: 5,
    alignSelf: 'center',
  },
  stickySegments: {
    position: 'absolute',
    height: 50,
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',

    elevation: 3,
  },

  segmentBtn: {
    padding: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  segmentBtnText: {
    color: Colors.primary,
    fontWeight: '400',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  footer: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    paddingTop: 20,

    elevation: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullBtn: {
    backgroundColor: Colors.primary,
    flex: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cartItems: {
    backgroundColor: '#19AA86',
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default Details;
