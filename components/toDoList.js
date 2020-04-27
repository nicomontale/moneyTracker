import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import colors  from '../Colors';
import CartModal from './CartModal';


export default class toDoList extends React.Component {
    state= { 
        showVisible:false
    }
    toggleVisible() {
        this.setState({
            showVisible: !this.state. showVisible
        })
      }
    render() {
        const list = this.props.list;
        const completedCount = list.todos.filter(todo=> todo.compleated).length;
        
        return (
            <View>
            <Modal animationType="slide" visible={this.state.showVisible} onRequestClose={()=>this.toggleVisible()}
            >
            <CartModal list={list} closeModal={()=> this.toggleVisible()} updateList={this.props.updateList}/>
            
            </Modal>
            <TouchableOpacity style={[styles.listContainer, {backgroundColor:list.color}]} onPress={()=>this.toggleVisible()}>
            <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
            </Text>
            <View style={{alignItems:"center"}}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subtitle}>Entrata</Text>
            </View>
            <View style={{alignItems:"center"}}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subtitle}>Uscita</Text>
            </View>
            </TouchableOpacity>
            </View>
        )
    }
    
}

const styles= StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal:16,
        borderRadius: 10,
        marginHorizontal: 12,
        alignItems: "center",
        width:200,
       shadowOpacity: 10,
       shadowRadius: 2,
       shadowOffset:{  width: 8,  height: 8,  },
    },
    listTitle : {
        fontSize: 24,
        fontWeight: "700",
        color: colors.black,
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: colors.black
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.black
    }
})