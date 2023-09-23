import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { restaurants } from '../assets/data/home';
import { useRouter } from 'expo-router';
import Colors from '../constants/Colors';

const Restaurants = () => {
  const router = useRouter();

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 10 }}
    >
      {restaurants.map((restaurant, index) => {
        return (
          <TouchableOpacity
            onPress={() => router.push('details')}
            key={index}
            style={styles.categoryCard}
          >
            <Image source={restaurant.img} style={styles.img} />

            <View style={styles.categoryBox}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={styles.categoryText}>{restaurant.name}</Text>
                <Text style={[styles.categoryText, { color: Colors.green }]}>
                  {restaurant.rating} {restaurant.ratings}
                </Text>
              </View>
              <Text style={{ color: Colors.medium, marginTop: 5 }}>
                {restaurant.distance}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: 300,
    height: 240,
    backgroundColor: '#fff',
    marginRight: 10,
    borderRadius: 3,
    elevation: 3,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  img: {
    width: '100%',
    height: '70%',
    objectFit: 'cover',
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
  },
  categoryBox: {
    padding: 10,
  },
});

export default Restaurants;
