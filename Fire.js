import firebase from 'firebase';
import '@firebase/firestore'
var firebaseConfig = {
    apiKey: "AIzaSyBGOilPNPseCx8CkhIyzY2xM_Nc7yDhJLs",
    authDomain: "moneytransactions-601fa.firebaseapp.com",
    databaseURL: "https://moneytransactions-601fa.firebaseio.com",
    projectId: "moneytransactions-601fa",
    storageBucket: "moneytransactions-601fa.appspot.com",
    messagingSenderId: "719423944708",
    appId: "1:719423944708:web:9f0ee5929014bfe6d9dd51"
}
class Fire {
    constructor(callback) {
        this.init(callback);
    }
    init(callback) {
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user=>{
            if(user) {
                callback(null, user);

            } else{
                firebase.auth().signInAnonymously().catch(error=> {
                  callback(error);
                })
            }
        } )

    }

    getLists(callback) {
       let ref= this.ref.orderBy("name");
        this.unsubscribe = ref.onSnapshot(snapshot=> {
            lists =[];
             snapshot.forEach(doc=> {
                 lists.push({id: doc.id,...doc.data()})
             })
             callback(lists);
        })
        
    }
    get userId() {
       return firebase.auth().currentUser.uid;
    }
    updateList(list) {
        let ref = this.ref;
        ref.doc(list.id).update(list);
    }
    addList(list){
let ref = this.ref;
ref.add(list);
    }    
    get ref() {
        return firebase
        .firestore()
        .collection('users')
        .doc(this.userId)
        .collection("lists");
    }
    detach() {
        this.unsubscribe();
    }
}
export default Fire;