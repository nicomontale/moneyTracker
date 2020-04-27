import React, { Component } from 'react'
import { Text, StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native'
import  Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../Colors';
import tempData from '../tempData';
export default class AddListModal extends Component {
    backgroundColor= ["red", "orange","lightgray", "blue"]
    state = {
        name: "",
        color: this.backgroundColor[1]
    }
    creatCart =()=> {
        const {name, color}= this.state;
       const list ={name, color}
       this.props.addList(list);
        this.setState({
            name: ""
        })

        this.props.closeModal();
    }
    renderColor() {
        return this.backgroundColor.map(color=>{
            return (
                <TouchableOpacity key={color} style={[styles.colorSelect, {backgroundColor: color}]}
                onPress={()=>this.setState({color})}/>
                
        )})
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
            
            <TouchableOpacity style={{position:"absolute", top:64, right:32}} onPress={this.props.closeModal}>
            <Icon name="close" size={24} color={Colors.black}/>
            
            
            </TouchableOpacity>
            <View style={{alignSelf: "stretch", marginHorizontal: 32}}>
            <Text style={styles.title}>Create Cart</Text>
            <TextInput style={styles.input} placeholder="Name" onChangeText={text=> this.setState({name: text})}/>
            <View style={{flexDirection:"row", justifyContent: "space-between", marginTop: 12}}>
            {this.renderColor()}
            </View>
            <TouchableOpacity style={[styles.createCart, {backgroundColor: this.state.color} ]} onPress={this.creatCart}>
            <Text style={{color: Colors.white, fontWeight: "600"}}>Create</Text>
            </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#39CCCC'
    }, title: {
        fontSize: 28,
        fontWeight: "800",
        color: Colors.white,
        alignSelf: "center",
        marginBottom: 16
    }, 
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.white,
        height: 50,
        marginTop: 8,
        borderRadius: 6,
        paddingHorizontal: 16,
        fontSize: 18,
        borderWidth: 2

    }, createCart : {
        marginTop: 24,
        height: 50,
        borderRadius:6,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect : {
        width: 30,
        height: 30,
        borderRadius: 4,

    }
})
