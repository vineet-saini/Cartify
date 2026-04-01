// // import {StyleSheet} from 'react-native';

// // const OrdersStyle = StyleSheet.create({

// // });

// // export default OrdersStyle;


// import { StyleSheet } from 'react-native';

// const OrdersStyle = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },

//   header: {
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },

//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },

//   listContent: {
//     padding: 15,
//     paddingBottom: 100,
//   },

//   orderCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginBottom: 15,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//   },

//   orderHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//   },

//   orderId: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 4,
//   },

//   orderDate: {
//     fontSize: 13,
//     color: '#888',
//   },

//   statusBadge: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 12,
//   },

//   statusText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: '600',
//   },

//   divider: {
//     height: 1,
//     backgroundColor: '#f0f0f0',
//   },

//   orderBody: {
//     padding: 15,
//   },

//   itemsContainer: {
//     marginBottom: 15,
//   },

//   itemRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },

//   itemImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 8,
//     backgroundColor: '#f8f9fa',
//     marginRight: 12,
//   },

//   itemInfo: {
//     flex: 1,
//   },

//   itemName: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 4,
//   },

//   itemPrice: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#4CAF50',
//   },

//   moreItems: {
//     fontSize: 13,
//     color: '#888',
//     fontStyle: 'italic',
//     marginTop: 5,
//   },

//   orderFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#f0f0f0',
//   },

//   totalContainer: {
//     flex: 1,
//   },

//   totalLabel: {
//     fontSize: 13,
//     color: '#888',
//     marginBottom: 4,
//   },

//   totalAmount: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },

//   detailsBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     backgroundColor: '#f0f9f4',
//   },

//   detailsBtnText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#4CAF50',
//     marginRight: 4,
//   },

//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 40,
//   },

//   emptyTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 20,
//     marginBottom: 10,
//   },

//   emptyText: {
//     fontSize: 14,
//     color: '#888',
//     textAlign: 'center',
//     marginBottom: 30,
//   },

//   shopBtn: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 14,
//     paddingHorizontal: 32,
//     borderRadius: 25,
//     elevation: 2,
//   },

//   shopBtnText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },

//   paymentMethod: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 2,
//   },
// });

// export default OrdersStyle;

import { StyleSheet } from 'react-native';

const OrdersStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },

  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 10,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },

  searchButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },

  filtersContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  filtersContent: {
    paddingHorizontal: 20,
  },

  filterChip: {
    // height:40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  activeFilterChip: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },

  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },

  activeFilterText: {
    color: '#fff',
  },

  listContent: {
    padding: 15,
    paddingBottom: 100,
  },

  orderCard: {
    // flex:1,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },

  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fafafa',
  },

  orderHeaderLeft: {
    flex: 1,
  },

  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },

  orderDate: {
    fontSize: 13,
    color: '#666',
  },

  statusContainer: {
    alignItems: 'flex-end',
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },

  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fafafa',
  },

  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 2,
  },

  progressText: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },

  orderBody: {
    padding: 16,
  },

  itemsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 6,
  },

  itemsContainer: {
    marginBottom: 16,
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },

  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginRight: 12,
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },

  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemQty: {
    fontSize: 12,
    color: '#666',
  },

  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },

  moreItemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#f8fff8',
    borderRadius: 8,
    marginTop: 8,
  },

  moreItems: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '500',
    marginRight: 4,
  },

  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fafafa',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },

  totalSection: {
    flex: 1,
  },

  totalLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },

  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  paymentMethod: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },

  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },

  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
  },

  trackButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
    marginLeft: 4,
  },

  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4CAF50',
    paddingLeft:25,
  },

  detailsButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
    marginRight: 4,
  },

  emptyContainer: {
    flex: 1,
    height:669,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },

  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },

  shopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default OrdersStyle;
