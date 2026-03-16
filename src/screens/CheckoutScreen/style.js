// import { StyleSheet } from "react-native";

// const CheckoutStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: "#f5f5f5",
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 15,
//   },

//   section: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 10,
//   },

//   edit: {
//     color: "#3498db",
//     marginTop: 5,
//   },

//   productCard: {
//     flexDirection: "row",
//     marginBottom: 10,
//   },

//   image: {
//     width: 60,
//     height: 60,
//     borderRadius: 6,
//   },

//   productInfo: {
//     marginLeft: 10,
//     flex: 1,
//   },

//   name: {
//     fontWeight: "600",
//   },

//   qty: {
//     color: "#777",
//   },

//   price: {
//     fontWeight: "bold",
//   },

//   paymentOption: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },

//   radio: {
//     fontSize: 18,
//     marginRight: 10,
//   },

//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 3,
//   },

//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },

//   total: {
//     fontWeight: "bold",
//     fontSize: 18,
//   },

//   orderBtn: {
//     backgroundColor: "#2ecc71",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },

//   orderText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   title: {
//   fontSize: 22,
//   fontWeight: 'bold',
//   marginLeft: 10,
//   flex: 1,               
// },
//   subTitle: { fontSize: 18, fontWeight: '600', marginVertical: 10 },

//   editHeader: {
//   flexDirection: "row",
//   alignItems: "center",      
//   paddingVertical: 15,
//   paddingHorizontal: 10,
//   backgroundColor: "#fff",   
//   borderBottomWidth: 1,
//   borderBottomColor: "#eee",
// },
// });

// export default CheckoutStyles;


import { StyleSheet } from "react-native";

const CheckoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f8f9fa",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    flex: 1,
    textAlign: 'center',
    marginRight: 24,
  },

  headerRight: {
    width: 24,
  },

  section: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },

  userInfo: {
    paddingLeft: 28,
  },

  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },

  userContact: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },

  userEmail: {
    fontSize: 14,
    color: "#666",
  },

  addressCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 28,
  },

  addressInfo: {
    flex: 1,
  },

  addressLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 4,
  },

  addressText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },

  deliveryEstimate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  deliveryText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },

  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f8ff',
    borderRadius: 6,
  },

  editText: {
    color: "#3498db",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },

  noAddress: {
    alignItems: 'center',
    paddingVertical: 20,
  },

  noAddressText: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    marginBottom: 12,
  },

  addAddressButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },

  addAddressText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },

  productCard: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },

  productInfo: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'space-between',
  },

  productName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },

  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  productQty: {
    fontSize: 12,
    color: "#666",
  },

  productPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },

  selectedPayment: {
    borderColor: '#4CAF50',
    backgroundColor: '#f8fff8',
  },

  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  paymentInfo: {
    marginLeft: 12,
  },

  paymentLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },

  selectedPaymentText: {
    color: '#4CAF50',
  },

  paymentSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },

  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },

  summaryValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 12,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4CAF50",
  },

  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  orderButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  disabledButton: {
    backgroundColor: "#bdc3c7",
    elevation: 0,
    shadowOpacity: 0,
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  orderButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },

  processingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  processingText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default CheckoutStyles;
