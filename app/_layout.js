import { Stack, useRouter } from 'expo-router';
import { CustomHeader } from '../components';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Colors from '../constants/Colors';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { store } from '../store';

export default RootLayoutNav = () => {
  const router = useRouter();
  return (
    <Provider store={store}>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen
            name='index'
            options={{
              header: () => <CustomHeader />,
            }}
          />

          <Stack.Screen
            name='details'
            options={{
              headerTransparent: true,
              headerTitle: '',
              headerTintColor: Colors.primary,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => router.back()}
                  style={styles.roundBtn}
                >
                  <Ionicons
                    name='arrow-back'
                    size={24}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <View style={styles.bar}>
                  <TouchableOpacity style={styles.roundBtn}>
                    <Ionicons
                      name='share-outline'
                      size={24}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.roundBtn}>
                    <Ionicons
                      name='search-outline'
                      size={24}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              ),
            }}
          />

          <Stack.Screen
            name='(modal)/filters'
            options={{
              presentation: 'modal',
              headerTitle: 'filters',
              headerTitleAlign: 'center',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: Colors.lightGrey,
              },
              headerLeft: () => {
                return (
                  <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons
                      name='close-outline'
                      size={28}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                );
              },
            }}
          />

          <Stack.Screen
            name='(modal)/locationSearch'
            options={{
              presentation: 'fullScreenModal',
              headerTitle: 'Search loaction',
              headerTitleAlign: 'center',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: Colors.lightGrey,
              },
              headerLeft: () => {
                return (
                  <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons
                      name='close-outline'
                      size={28}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                );
              },
            }}
          />

          <Stack.Screen
            name='(modal)/dish/[singleDish]'
            options={{
              presentation: 'modal',
              headerTitle: '',
              headerShadowVisible: false,
              headerTransparent: true,
              headerLeft: () => {
                return (
                  <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.roundBtn}
                  >
                    <Ionicons
                      name='close-outline'
                      size={28}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                );
              },
            }}
          />

          <Stack.Screen
            name='cart'
            options={{
              headerTitle: 'Basket',
              headerTitleAlign: 'center',
              headerLeft: () => {
                return (
                  <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons
                      name='arrow-back'
                      size={28}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                );
              },
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  roundBtn: {
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 50,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
});
