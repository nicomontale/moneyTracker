import firebase from 'firebase';
import '@firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCJzL72tBR9_c8j4nj0gCXPsGsVrqGMAaA",
    authDomain: "moneytracker-e9d7d.firebaseapp.com",
    databaseURL: "https://moneytracker-e9d7d.firebaseio.com",
    projectId: "moneytracker-e9d7d",
    storageBucket: "moneytracker-e9d7d.appspot.com",
    messagingSenderId: "666360611723",
    appId: "1:666360611723:web:9add86580a49b009f7658e"
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
        let ref = firebase
        .firestore()
        .collection('users')
        .doc(this.userId)
        .collection("lists");
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
    detach() {
        this.unsubscribe();
    }
}
export default Fire;