import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { categories } from '../assets/data/home';

const Categories = () => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 10 }}
    >
      {categories.map((category, index) => {
        return (
          <View key={index} style={styles.categoryCard}>
            <Image source={category.img} style={styles.img} />
            <Text style={styles.categoryText}>{category.text}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    marginRight: 8,
    borderRadius: 3,
    elevation: 3,
  },
  categoryText: {
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  img: { borderTopRightRadius: 3, borderTopLeftRadius: 3 },
});

export default Categories;
