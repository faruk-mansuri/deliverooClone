import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import categories from '../../assets/data/filter.json';
import { Ionicons } from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const filters = () => {
  const router = useRouter();
  const [items, setItems] = useState(categories);
  const [selected, setSelected] = useState([]);
  const clearBtn = useSharedValue('none');

  const animatedStyles = useAnimatedStyle(() => {
    return { display: clearBtn.value };
  });

  useEffect(() => {
    const hasSelected = selected.length > 0;
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = selectedItems.length > 0;
    if (hasSelected !== newSelected) {
      clearBtn.value = newSelected ? 'flex' : 'none';
    }
    setSelected(selectedItems);
  }, [items]);

  const ItemBox = () => {
    return (
      <>
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.item}>
            <Ionicons
              name='arrow-down-outline'
              size={20}
              color={Colors.medium}
            />
            <Text style={{ flex: 1 }}>Sort</Text>
            <Ionicons name='chevron-forward' size={22} color={Colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Ionicons
              name='fast-food-outline'
              size={20}
              color={Colors.medium}
            />
            <Text style={{ flex: 1 }}>Hygiene rating</Text>
            <Ionicons name='chevron-forward' size={22} color={Colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Ionicons name='pricetag-outline' size={20} color={Colors.medium} />
            <Text style={{ flex: 1 }}>Offers</Text>
            <Ionicons name='chevron-forward' size={22} color={Colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Ionicons
              name='nutrition-outline'
              size={20}
              color={Colors.medium}
            />
            <Text style={{ flex: 1 }}>Dietary</Text>
            <Ionicons name='chevron-forward' size={22} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.header}>Categories</Text>
      </>
    );
  };

  const handleClearAll = () => {
    const updatedItems = items.map((item) => {
      item.checked = false;
      return item;
    });
    setItems(updatedItems);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.itemText}>
          {item.name} ({item.count})
        </Text>
        <BouncyCheckbox
          fillColor={Colors.primary}
          unfillColor='#fff'
          iconStyle={{
            borderColor: Colors.primary,
            borderWidth: 2,
            borderRadius: 4,
          }}
          innerIconStyle={{ borderRadius: 4 }}
          disableBuiltInState
          isChecked={item.checked}
          onPress={() => {
            const updatedLists = items.map((i) => {
              if (i.name === item.name) {
                i.checked = !i.checked;
              }
              return i;
            });
            setItems(updatedLists);
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        ListHeaderComponent={<ItemBox />}
      />

      <View style={{ height: 76 }} />

      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.btnContainer}>
          <Animated.View style={[styles.outlineFullBtn, animatedStyles]}>
            <TouchableOpacity onPress={handleClearAll}>
              <Text style={styles.outlineFooterText}>Clear All</Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            style={styles.fullBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.footerText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lightGrey,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#fff',
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
  },

  itemContainer: {
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderColor: Colors.grey,
    borderBottomWidth: 1,
  },
  itemText: {
    flex: 1,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  fullBtn: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    flex: 1,
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  outlineFullBtn: {
    borderColor: Colors.primary,
    borderWidth: 0.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    flex: 1,
  },
  outlineFooterText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default filters;
