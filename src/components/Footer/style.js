// import { StyleSheet } from 'react-native';

// const FooterStyle = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     height: 60,
//     backgroundColor: '#f2f2f2',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     width: '100%',
//     position: 'absolute',
//     bottom: 0,
//   },
//   navItem: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   navItemActive: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#e0e0e0',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//   },
//   navText: {
//     fontSize: 12,
//     marginTop: 4,
//     color: '#333',
//   },
//   navTextActive: {
//     fontSize: 12,
//     marginTop: 4,
//     color: '#000',
//     fontWeight: '600',
//   },
// });

// export default FooterStyle;

// import { StyleSheet } from 'react-native';

// const FooterStyle = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     height: 70,
//     backgroundColor: '#ffffff',
//     alignItems: 'center',
//     justifyContent: 'space-between',

//     position: 'absolute',
//     bottom: 0,
//     width: '100%',

//     paddingHorizontal: 20,

//     borderTopLeftRadius: 18,
//     borderTopRightRadius: 18,

//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 10
//   },

//   navItem: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },

//   navItemActive: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },

//   navText: {
//     fontSize: 12,
//     marginTop: 3,
//     color: '#777'
//   },

//   navTextActive: {
//     fontSize: 12,
//     marginTop: 3,
//     color: '#000',
//     fontWeight: '600'
//   }
// });

// export default FooterStyle;

import { StyleSheet } from 'react-native';

const FooterStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',

    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    paddingHorizontal: 10,

    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 10
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6
  },

  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#e8f0ff',
    paddingVertical: 6,
    borderRadius: 12
  },

  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#777'
  },

  navTextActive: {
    fontSize: 12,
    marginTop: 4,
    color: '#2f6cff',
    fontWeight: '600'
  }
});

export default FooterStyle;