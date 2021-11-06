
export const postJSON : postJSON = (url, obj) => {
    return fetch(url, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(obj),
    })
}

export const toDateTime = (secs) => {
    const t = new Date(1970, 0, 1); // Epoch https://stackoverflow.com/a/4611809
    t.setSeconds(secs);
    return t;
}

export const dateToString = (date) => {
    return date.getFullYear() + '-'+ 
        String((date.getMonth()+1)).padStart(2, '0') + '-'+ 
        String(date.getDate()).padStart(2, '0');
}

export const dateToSeconds = (date) => {
    date = new Date(date)
    return date.getTime() / 1000
}


/**
 * @return {string} current date in format YYYY-MM-DD
 */
export const getCurrentDate = (): string => {
    const today = new Date()
    const date = today.getFullYear() + '-'+ 
        String((today.getMonth()+1)).padStart(2, '0') + '-'+ 
        String(today.getDate()).padStart(2, '0');

    return date
}
/**
 * 
 * @return {number} current date in seconds
 */
export const getCurrentSeconds = (): number => {
    return Date.now() / 1000
}


import { db } from './firebase'
import { getFirestore, collection, where, getDocs, orderBy, query } from "firebase/firestore";


/**
 * Fetches the Firestore for all documents in a given collection where auth user id matches documents owner
 * @param collectionRef Firebase Collection Reference
 * @param sortBy Field value to sort by
 * @param direction either 'asc' or 'desc'
 * @returns {JSON[]} Array of fetched data
 */
export const getFirestoreData : getFirestoreData = async (collectionRef, sortBy, direction, uid) => {
    let returnData : object[] = []


    const q = query(collectionRef, where('uid', '==', uid), orderBy(sortBy, direction))
    const data = await getDocs(q)

    data.forEach(doc => {
        returnData = [...returnData, doc.data()]
    });

    return returnData

}

// export const getFirestoreData : getFirestoreData = async (collectionRef, sortBy, direction, uid) => {
//     let returnData : object[] = []

//     const query = collectionRef.where('uid', '==', uid).orderBy(sortBy, direction)
//     const data = await query.get()
//     data.forEach(doc => {
//         returnData = [...returnData, doc.data()]
//     });

//     return returnData

// }