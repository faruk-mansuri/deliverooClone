import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart } from '../features/cart/cartSlice';
import { useState } from 'react';
import Colors from '../constants/Colors';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useRouter } from 'expo-router';
import { SwipeableRow } from '../components';

const Cart = () => {
  const router = useRouter();
  const { cartItems, noOfCartItems, totalAmount } = useSelector(
    (store) => store.cartStore
  );
  const dispatch = useDispatch();
  const [order, setOrder] = useState(false);

  const FEES = {
    service: 2.99,
    delivery: 5.99,
  };

  const startCheckout = () => {
    setOrder(true);
    dispatch(clearCart());
  };

  return (
    <>
      {order && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          fallSpeed={2500}
          fadeOut={true}
          autoStart={true}
        />
      )}

      {order && (
        <View
          style={{
            marginTop: '50%',
            padding: 20,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              textAlign: 'center',
              color: Colors.mediumDark,
            }}
          >
            Thank you for your order!
          </Text>

          <TouchableOpacity
            style={styles.orderBtn}
            onPress={() => router.push('/')}
          >
            <Text style={styles.footerText}>New order</Text>
          </TouchableOpacity>
        </View>
      )}

      {!order && cartItems.length > 0 && (
        <>
          <FlatList
            contentContainerStyle={{ paddingBottom: 90 }}
            data={cartItems}
            ListHeaderComponent={() => {
              return <Text style={styles.sectionHeader}>Items</Text>;
            }}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.grey }}></View>
            )}
            renderItem={({ item }) => {
              return (
                <SwipeableRow
                  onDelete={() => dispatch(removeFromCart(item.id))}
                >
                  <View style={styles.row}>
                    <Text
                      style={{
                        color: Colors.primary,
                        alignSelf: 'center',
                        fontSize: 16,
                      }}
                    >
                      {item.quantity} x
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 16,
                        color: Colors.mediumDark,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text style={{ fontSize: 16, color: Colors.green }}>
                      $ {item.price * item.quantity}
                    </Text>
                  </View>
                </SwipeableRow>
              );
            }}
            ListFooterComponent={() => {
              return (
                <View>
                  <View
                    style={{ height: 1, backgroundColor: Colors.grey }}
                  ></View>
                  <View style={styles.totalRow}>
                    <Text style={styles.subTotal}>Subtotal</Text>
                    <Text style={{ fontSize: 16, color: Colors.green }}>
                      $ {totalAmount}
                    </Text>
                  </View>

                  <View
                    style={{ height: 1, backgroundColor: Colors.grey }}
                  ></View>
                  <View style={styles.totalRow}>
                    <Text style={styles.subTotal}>Service</Text>
                    <Text style={{ fontSize: 16, color: Colors.green }}>
                      $ {FEES.service}
                    </Text>
                  </View>

                  <View
                    style={{ height: 1, backgroundColor: Colors.grey }}
                  ></View>
                  <View style={styles.totalRow}>
                    <Text style={styles.subTotal}>Delivery Fee</Text>
                    <Text style={{ fontSize: 16, color: Colors.green }}>
                      $ {FEES.delivery}
                    </Text>
                  </View>

                  <View
                    style={{ height: 1, backgroundColor: Colors.grey }}
                  ></View>
                  <View style={styles.totalRow}>
                    <Text
                      style={[styles.subTotal, { color: Colors.mediumDark }]}
                    >
                      Order Total
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Colors.green,
                        fontWeight: 'bold',
                      }}
                    >
                      ${' '}
                      {(totalAmount + FEES.service + FEES.delivery).toFixed(2)}
                    </Text>
                  </View>
                </View>
              );
            }}
          />

          <View style={styles.footer}>
            <TouchableOpacity style={styles.fullBtn} onPress={startCheckout}>
              <Text style={styles.footerText}>Order now</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {!order && cartItems.length < 1 && (
        <View
          style={{
            marginTop: '50%',
            padding: 20,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              textAlign: 'center',
              color: Colors.mediumDark,
            }}
          >
            Continue Your Order!
          </Text>

          <TouchableOpacity
            style={styles.orderBtn}
            onPress={() => router.push('/')}
          >
            <Text style={styles.footerText}>New order</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    gap: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
  subTotal: { letterSpacing: 1, fontSize: 16, color: Colors.medium },
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
  fullBtn: {
    backgroundColor: Colors.primary,
    flex: 1,
    borderRadius: 5,
    padding: 15,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  orderBtn: {
    marginTop: 20,
    width: 250,
    height: 50,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
});
export default Cart;
