import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Global from './Global';

const Firestore = firestore();
const Auth = auth();


export function skipLogIn(callback) {
    
    Auth
    .signInAnonymously()
    .then(callback)
    .catch(error => {
        console.error(error);
    });
}

export function onUserLogIn() {
    console.log("auth state changed!!!!");
}

export function getProperties() {
    return;
    const [loading, setLoading] = Global.useLoading();
    Firestore
    .collection('properties')
    .get()
    .then(querySnapshot => {
        console.log('Total properties: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
            console.log('Property', documentSnapshot.id + ': ', documentSnapshot.data());
        });
    });
}

export function signOut(callback) {
    
    Auth
    .signOut(auth)
    .then(callback)
    .catch((error) => {
        // An error happened.
    });
}