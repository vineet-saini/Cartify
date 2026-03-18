import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SuccessStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical:20,
    // marginBottom:50,
  },

  animationContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 80,
  },

  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 60,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },

  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },

  successSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },

  orderCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  orderHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },

  orderDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  detailLabel: {
    fontSize: 14,
    color: '#666',
  },

  detailValue: {
    maxWidth:'60%',
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    // textAlign: 'right',
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
  },

  divider: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 16,
  },

  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  deliveryText: {
    marginLeft: 8,
    flex: 1,
  },

  deliveryLabel: {
    fontSize: 14,
    color: '#666',
  },

  deliveryDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },

  itemsCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  itemsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  itemName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },

  itemQty: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },

  moreItems: {
    fontSize: 12,
    color: '#4CAF50',
    fontStyle: 'italic',
    marginTop: 8,
  },

  buttonContainer: {
    width: '100%',
    gap: 12,
    marginBottom:20,
  },

  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  secondaryButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  secondaryButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    // marginBottom:10,
  },
});

export default SuccessStyles;
