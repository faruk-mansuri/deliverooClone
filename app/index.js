import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Categories, Restaurants } from '../components';

const Index = () => {
  return (
    <View>
      <ScrollView>
        <Categories />
        <Text style={styles.header}>Top picks in your neighbourhod</Text>

        <Restaurants />
        <Text style={styles.header}>Offers near you</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});

export default Index;
