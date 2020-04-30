/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList, Modal, ActivityIndicator} from 'react-native';
import colors from './Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {
} from 'react-native/Libraries/NewAppScreen';
import tempData from './tempData';
import ToDoList from './components/toDoList';
import AddListModal from './components/AddListModal';
import Fire from './Fire';

export default class App extends React.Component{
  state = {
    addTodoVisible: false,
    lists : [],
    user: {},
    loading: true
  }
  componentDidMount() {
    firebase = new Fire((error, user)=>{
      if(error) {
        return alert("Errore")
      }
 
      firebase.getLists(lists=> {
        this.setState({lists, user}, ()=>{
this.setState({loading: false})
        })
      })
      this.setState({
        user
      })
    }
    );
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
firebase.addList({
  name: list.name,
  color: list.color,
  todos:[]
})
  }
  updateList = list => {
   firebase.updateList(list)
  }
  render() {
    if(this.state.loading) {
      return(
        <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.yellow}/>
        </View>
      )
    }
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
keyExtractor={item=>item.id.toString()} 
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
    backgroundColor: '#344955'
  },
  divider: {
    backgroundColor:colors.white,
    height: 3, 
    flex: 1,
    alignSelf:"center"
    }, title : {
      fontSize: 38,
      fontWeight:"800",
      color: 'yellow',
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
