import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput, Keyboard, Animated } from 'react-native'
import  Icon from 'react-native-vector-icons/AntDesign';
import  Icon2 from 'react-native-vector-icons/Ionicons';
import Colors from '../Colors';
import { gray, lightgray } from 'color-name';

export default class CartModal extends Component {
    state= {
       newTodo: "",
       newCash: 0,
       total: this.somma()
    }
    toggleCompleted = index => {
        let list = this.props.list;
        list.todos[index].compleated = ! list.todos[index].compleated;

       this.props.updateList(list);
    }
    addTransacions = ()=> {
        let list = this.props.list;
        list.todos.push({where: this.state.newTodo, title: this.state.newCash, compleated: false})
        this.props.updateList(list);
        
        this.setState({newTodo: "", total: this.somma()});
        Keyboard.dismiss();
    }
     somma() {
        var z = 0;
        var i;
        for (i in this.props.list.todos) {
        z = z + parseFloat(this.props.list.todos[i].title);
        }
        return z;
        }
        renderTransactions=(transactions, index) =>{
          
            return (
            
                <View style={styles.transactionsContainer}>
                <TouchableOpacity  onPress={()=>this.toggleCompleted(index)}>
                <Icon2 name={transactions.compleated ? "ios-square" : "ios-square-outline"}size={24}
                color='#39CCCC' style={{width: 32}}/>
              
                
                </TouchableOpacity>
             
                <Text style={[styles.todo, {textDecorationLine : transactions.compleated ? "line-through": "none", color: transactions.compleated ? colors.lightgray : colors.black }]}>
                {transactions.where}</Text>
                <Text style={[styles.todo, {textDecorationLine : transactions.compleated ? "line-through": "none", color: transactions.compleated ? colors.lightgray : colors.black }]}>
                   {transactions.title} €</Text>
                   <Icon name="delete" size={24}
                color='#39CCCC' style={{width: 32}}/>
                </View>
               
               
            )
        }
        rightActions=(dragX, index)=> {
            return(
                <TouchableOpacity>
                <Animated.View>
                <Animated.Text>
                Delete
                </Animated.Text>
                </Animated.View>
                </TouchableOpacity>
            )
        }
    render() {
        const count = this.props.list.todos.lenght;
        const list = this.props.list;
        
        return (
            
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={{position: 'absolute', top: 64, right: 32, zIndex:10}}> 
                <Icon name="close" size={24} color ={Colors.white} onPress={()=> this.props.closeModal()}/>
                </TouchableOpacity>
                <View style={[styles.section, styles.header, {borderBottomColor: list.color}]}>
                <View>
                <Text style={styles.title}>{list.name}</Text>
                <Text style={styles.count}>{this.state.total} € </Text>
                </View>
                </View>
                <View style={[styles.section, {flex:3}]}>
                
                <FlatList data={list.todos} renderItem={({item, index}) => this.renderTransactions(item, index)} 
                keyExtractor={(_, index)=> index.toString()}
                vertical={true}
                contentContainerStyle={{paddingHorizontal: 32, paddingVertical:64}}
                showsVerticalScrollIndicator={false}

                />
                </View>
                <KeyboardAvoidingView style={[styles.section, styles.footer]} behavior="padding">

                
                <TextInput placeholder="Topic" placeholderTextColor=" rgba(255, 255, 255, 0.5)"  style={[styles.input, {borderColor: this.state.color}]} onChangeText={text =>  this.setState({
                    newTodo : text
                })} value={this.state.newTodo}/>
                <TextInput placeholder="Money" placeholderTextColor=" rgba(255, 255, 255, 0.5)" style={[styles.input, {borderColor: this.state.color}]} keyboardType={'numeric'} onChangeText={text =>  this.setState({
                    newCash : text
                })} value={this.state.newCash}/>
                <TouchableOpacity style={[styles.addTransacions], {backgroundColor: this.state.color}} onPress={()=>this.addTransacions()}>
                <Icon name="plus" size={16} style={{marginLeft:10}} color={Colors.white}/>
                </TouchableOpacity>
                </KeyboardAvoidingView>
                
                
                
         
                
                
                
            </SafeAreaView>
            </KeyboardAvoidingView>
        
        )
    }
}
const styles = StyleSheet.create({
   container : {
      flex: 1,
      justifyContent: "center",
      alignItems : "center",
      backgroundColor: '#344955'
      
   }, section : {
    
       flex: 1,
       alignSelf: "stretch"
   }, header : {
       justifyContent: "flex-end",
       marginLeft : 64,
       borderBottomWidth: 3

   }, title : {
       fontSize : 30,
       fontWeight: "800",
      color : 'white'
   }, 
   count: {
       marginTop: 4,
       marginBottom: 16,
       color: Colors.lightgray,
       fontWeight: "600",
       fontSize: 20
   }, 
   footer : {
       paddingHorizontal: 32,
       flexDirection: "row",
       alignItems:"center"
   },
   input : {
      flex: 1,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: Colors.white,
      height: 48,
      marginTop: 8,
      borderRadius: 6,
      paddingHorizontal: 16,
      fontSize: 18,
      borderWidth: 2,
      marginLeft: 5,
      color: 'white'
     
      
   },
   addTransacions: {
       borderRadius: 4,
       padding: 16,
       alignItems: "center",
       justifyContent: "center"
   }, transactionsContainer: {
  borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal:16,
       flexDirection: "row",
       alignItems: "center",
       justifyContent: "space-between",
       borderBottomColor: "white",
       borderBottomWidth: 1,
       backgroundColor: 'white',
       marginBottom: 10,
       shadowOpacity: 4,
       shadowRadius: 0.5,
       
   },
   todo : {
       color: Colors.black,
       fontWeight: "700",
       fontSize: 20
   },  
   todos : {
   
   }
})