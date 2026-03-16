import { StyleSheet } from 'react-native';

const EditProfileStyle = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  title: {
  fontSize: 22,
  fontWeight: 'bold',
  marginLeft: 10,
  flex: 1,               
},
  subTitle: { fontSize: 18, fontWeight: '600', marginVertical: 10 },

  editHeader: {
  flexDirection: "row",
  alignItems: "center",      
  paddingVertical: 15,
  paddingHorizontal: 10,
  backgroundColor: "#fff",   
  borderBottomWidth: 1,
  borderBottomColor: "#eee",
},

  inputLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    fontWeight: '500'
  },



  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },

  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: { color: 'white', fontWeight: '600', fontSize: 16 },

  addressCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },

  addressButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  smallButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#444',
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },

  smallButtonText: { color: '#fff', fontSize: 14 },
});

export default EditProfileStyle;