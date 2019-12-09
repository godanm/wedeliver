import firebase from './Firebase';

    export async function retrieveData () {
    //retrieveData('-1LvHs2Rw3_WK1sM127i8','trips', 'grouptrips', snap => console.log('TRIPS', snap)); // Trips for the group
    //retrieveData('-1LvHs2Rw3_WK1sM127i8','members', 'groupmembers', snap => console.log('MEMBERS', snap)); //Members of the group
    //retrieveData('-4LvHs2Rw4_WK1sM127i8','members', 'tripmembers', snap => console.log('MEMBERS1', snap)); // Members of the trip
    //retrieveData('-2LvHs2Rw3_WK1sM127i8','trips', 'mytrips', snap => console.log('MEMBER1121', snap)); // My trips
    //retrieveData('-2LvHs2Rw3_WK1sM127i8','groups', 'mygroups', snap => console.log('MEM111BER1121', snap)); // My Groups
    //await Auth.confirmSignUp(username, authCode)
    /* return new Promise(function (resolve, reject) {
        const pKeysRef = firebase.database().ref(pKey); //trips
        const fKeysRef = firebase.database().ref(fKey); //grouptrips
        fKeysRef.child(key).on('child_added', snap => {
            let pKeyRef = pKeysRef.child(snap.key);
            pKeyRef.once('value').then(function(snapshot) {
                return resolve(snapshot);
            });
         });
        //return reject("Cannot divide by 0");
    }); */
    var list = [];
    let itemsRef = firebase.database().ref('groups');
    console.log("DUD", itemsRef)
    await itemsRef.once('value', snapshot => {
        let data = snapshot.val();
        let keys = Object.keys(data);
        keys.forEach((key) => {
            list.push(data[key]);
        });
        console.log("SSS", list)
        return list;
    });
}
