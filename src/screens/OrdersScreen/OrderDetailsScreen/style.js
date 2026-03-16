import { StyleSheet } from 'react-native';

const OrderDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 20,
  },

  shareButton: {
    padding: 8,
    borderRadius: 20,
    // backgroundColor: '#f5f5f5',
  },

  scrollView: {
    flex: 1,
  },

  statusCard: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  statusHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 10,
    // maxWidth:'65%',
    // paddingHorizontal:10
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom:5,
    maxWidth:'40%',
  },

  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    // paddingHorizontal:20,
  },

  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },

  trackingContainer: {
    marginTop: 10,
  },

  trackingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },

  trackingStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  stepIndicator: {
    alignItems: 'center',
    marginRight: 15,
  },

  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  completedStep: {
    backgroundColor: '#4CAF50',
  },

  errorStep: {
    backgroundColor: '#f44336',
  },

  stepLine: {
    width: 2,
    height: 20,
    backgroundColor: '#e0e0e0',
    marginTop: 5,
  },

  completedLine: {
    backgroundColor: '#4CAF50',
  },

  errorLine: {
    backgroundColor: '#f44336',
  },

  stepLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },

  completedLabel: {
    color: '#333',
    fontWeight: '500',
  },

  errorLabel: {
    color: '#f44336',
    fontWeight: '500',
  },

  section: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },

  itemCard: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginRight: 15,
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },

  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  itemQty: {
    fontSize: 12,
    color: '#666',
  },

  itemPrice: {
    fontSize: 12,
    color: '#666',
  },

  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },

  paymentCard: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 15,
  },

  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  paymentLabel: {
    fontSize: 14,
    color: '#666',
  },

  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  paymentValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginLeft: 6,
  },

  paymentStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  paymentStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },

  priceCard: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 15,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  priceLabel: {
    fontSize: 14,
    color: '#666',
  },

  priceValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },

  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
  },

  addressCard: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 15,
  },

  addressText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },

  supportCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#f0f9f4',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },

  supportButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4CAF50',
    marginLeft: 8,
  },

  bottomActions: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },

  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },

  reorderButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginLeft: 8,
  },

  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
  },

  trackButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
});

export default OrderDetailsStyles;
