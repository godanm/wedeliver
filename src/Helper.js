import firebase from "../Firebase";

export const getValueOnKey=(rootKey, rootId, node) => {
    let activitiesref = firebase.database().ref(rootKey + '/'+rootId);

}