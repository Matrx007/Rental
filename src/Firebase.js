import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


export function onUserLogIn() {
    console.log("auth state changed!!!!");
}

export function getProperties() {
    firestore()
    .collection('properties')
    .get()
    .then(querySnapshot => {
        console.log('Total properties: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
            console.log('Property', documentSnapshot.id + ': ', documentSnapshot.data());
        });
    });
}