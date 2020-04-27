/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList, Modal} from 'react-native';
import colors from './Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {
} from 'react-native/Libraries/NewAppScreen';
import tempData from './tempData';
import ToDoList from './components/toDoList';
import AddListModal from './components/AddListModal';

export default class App extends React.Component{
  state = {
    addTodoVisible: false,
    lists : tempData
  }
  toggleAddTodoModal() {
    this.setState({
      addTodoVisible: !this.state.addTodoVisible
    })
  }
  renderList = (list) => {

    return <ToDoList list={list}  updateList={this.updateList}/>
  }
  addList = list => {
this.setState({
  lists : [...this.state.lists, {...list, id: this.state.lists.lenght+1, todos: []}]
})
  }
  updateList = list => {
   this.setState({
     lists :  this.state.lists.map(item=> {
     return item.id ===list.id ? list : item
   })
  })
  }
  render() {
return (
  <View style={styles.container}>
  <Modal animationType="slide" visible={this.state.addTodoVisible} onRequestClose={()=> this.toggleAddTodoModal()}>
  <AddListModal closeModal={()=> this.toggleAddTodoModal()} addList={this.addList}/>
  </Modal>
<View style={{flexDirection:"row"}}>

<Text style={styles.title}>
Money <Text style={{fontWeight: "300", color:colors.white}}>Transactions</Text>
</Text>
<View style={styles.divider}/>
</View>
<View style={{marginVertical: 48}}>
<TouchableOpacity style={styles.addList} onPress={()=> this.toggleAddTodoModal()}>
<Icon name="plus" sie={16} color={colors.white}/>
</TouchableOpacity>
<Text style={styles.add}>AddList</Text>
</View>
<View style={{height: 275, paddingLeft: 32}}>
<FlatList data={this.state.lists} 
keyExtractor={item=>item.name} 
horizontal={true} 
showsHorizontalScrollIndicator={false}
renderItem={({item})=> this.renderList(item)}
keyboardShouldPersistTaps="always"
/>
</View>
  </View>
  
)
  }
  
}

const styles = StyleSheet.create({
  container : {
    flex: 1, 
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: '#39CCCC'
  },
  divider: {
    backgroundColor:colors.white,
    height: 3, 
    flex: 1,
    alignSelf:"center"
    }, title : {
      fontSize: 38,
      fontWeight:"800",
      color: colors.black,
      paddingHorizontal: 64
    }, addList : {
      borderWidth: 3,
      borderColor: colors.white,
      borderRadius: 4,
      padding:16,
      alignItems: "center",
      justifyContent: "center"
    }, add : {
      color: colors.white,
      fontWeight: "600",
      fontSize: 14,
      marginTop: 8
    }
});
