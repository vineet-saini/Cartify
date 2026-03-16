// import {StyleSheet} from 'react-native';

// const ProductDetailsStyle = StyleSheet.create({

// container:{
// flex:1,
// backgroundColor:"#fff"
// },

// // content:{
// // padding: 20,

// // },

// image:{
// width:"100%",
// height:260,
// resizeMode:"contain",
// backgroundColor:"#f6f6f6",
// borderRadius:10,
// marginBottom:15
// },

// title:{
// fontSize:20,
// fontWeight:"600",
// marginTop:10,
// lineHeight:26
// },

// price:{
// fontSize:22,
// color:"#2ecc71",
// fontWeight:"bold",
// marginTop:10
// },

// description:{
// marginTop:15,
// fontSize:15,
// color:"#555",
// lineHeight:22
// },

// category:{
// marginTop:10,
// fontSize:13,
// color:"#666",
// backgroundColor:"#f1f1f1",
// alignSelf:"flex-start",
// paddingVertical:4,
// paddingHorizontal:10,
// borderRadius:20
// },

// ratingContainer:{
// flexDirection:"row",
// alignItems:"center",
// marginTop:10
// },

// ratingText:{
// fontSize:14,
// marginRight:10
// },

// ratingCount:{
// fontSize:14,
// color:"#777"
// },

// addToCartBtn:{
// backgroundColor:"#27ae60",
// paddingVertical:14,
// borderRadius:10,
// alignItems:"center",
// marginTop:25,
// shadowColor:"#000",
// shadowOpacity:0.2,
// shadowOffset:{width:0,height:3},
// shadowRadius:4,
// elevation:4
// },

// addToCartText:{
// color:"#fff",
// fontSize:16,
// fontWeight:"bold"
// },
// header:{
//   flexDirection:'row',
//   alignItems:'center',
//   justifyContent:"space-between",
//   padding:15,
//   backgroundColor:'#fff',
//   elevation:3
// },

// backBtn:{
//   marginRight:10
// },

// backArrow:{
//   fontSize:22,
//   fontWeight:'bold'
// },

// headerTitle:{
//   fontSize:18,
//   fontWeight:'bold',
//   maxWidth:"75%"
// },
// cartContainer: {
//   position: "relative",
// },

// cartBadge: {
//   position: "absolute",
//   right: -8,
//   top: -6,
//   backgroundColor: "red",
//   borderRadius: 10,
//   minWidth: 18,
//   height: 18,
//   justifyContent: "center",
//   alignItems: "center",
//   paddingHorizontal: 4
// },

// cartBadgeText: {
//   color: "#fff",
//   fontSize: 10,
//   fontWeight: "bold"
// },

// });

// export default ProductDetailsStyle;

import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ProductDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  scrollView: {
    flex: 1,
  },

  // Header Styles
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    zIndex: 1000,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cartContainer: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },

  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },

  // Image Gallery Styles
  imageContainer: {
    position: 'relative',
    height: height * 0.5,
    backgroundColor: '#f8f9fa',
  },

  imageWrapper: {
    width: width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  productImage: {
    width: width * 0.8,
    height: '80%',
    resizeMode: 'contain',
  },

  imageIndicators: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginHorizontal: 4,
  },

  activeIndicator: {
    backgroundColor: '#4CAF50',
    width: 20,
  },

  favoriteBtn: {
    position: 'absolute',
    top: 70,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  // Product Info Styles
  productInfo: {
    padding: 20,
    backgroundColor: '#fff',
  },

  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },

  categoryText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    textTransform: 'uppercase',
  },

  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    lineHeight: 32,
    marginBottom: 12,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  ratingStars: {
    flexDirection: 'row',
    marginRight: 8,
  },

  ratingText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  currentPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4CAF50',
    marginRight: 12,
  },

  originalPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 12,
  },

  discountBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  discountText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },

  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 20,
  },

  feature: {
    alignItems: 'center',
    flex: 1,
  },

  featureText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '500',
  },

  // Quantity Selector Styles
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f8f9fa',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },

  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  quantityBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    minWidth: 40,
    textAlign: 'center',
  },

  // Description Styles
  descriptionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
    marginBottom: 8,
  },

  readMoreText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },

  // Bottom Actions Styles
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  buyNowBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    elevation: 3,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  buyNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  addToCartBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    elevation: 3,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  // Additional Styles for better UX
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },

  retryBtn: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },

  retryBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ProductDetailsStyle;
