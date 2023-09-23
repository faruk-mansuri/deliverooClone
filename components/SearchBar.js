import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

const SearchBar = () => {
  const router = useRouter();
  return (
    <View style={[styles.searchContainer]}>
      <View style={styles.searchSection}>
        <View style={styles.searchField}>
          <Ionicons
            style={styles.searchIcon}
            name='search-outline'
            size={20}
            color={Colors.mediumDark}
          />
          <TextInput
            placeholder='Restaurants, groceries, dishes'
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => router.push('filters')}
        >
          <Ionicons name='options-outline' size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    height: 60,
    backgroundColor: '#fff',
  },
  searchSection: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  searchField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGrey,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: Colors.mediumDark,
  },
  searchIcon: {
    paddingLeft: 10,
  },
  optionButton: {
    padding: 10,
    borderRadius: 50,
  },
});

export default SearchBar;
