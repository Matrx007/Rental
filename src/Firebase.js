import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Global from './Global';

export const Firestore = firestore();
export const Auth = auth();

export function signUp(email, password, callback) {
    
    Auth
    .createUserWithEmailAndPassword(email, password)
    .then(callback)
    .catch(error => {
        console.error(error);
    });
}

export function logIn(email, password, callback) {
    
    Auth
    .signInWithEmailAndPassword(email, password)
    .then(callback)
    .catch(error => {
        console.error(error);
    });
}

export function skipLogIn(callback) {
    
    Auth
    .signInAnonymously()
    .then(callback)
    .catch(error => {
        console.error(error);
    });
}

export function getRandomProperties(callback) {
    Firestore.collection('properties').limit(5).get().then(querySnapshot => {
        callback(querySnapshot.docs);
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