/// <reference types="@sveltejs/kit" />

import type { postJSON } from "$lib/utils";
import type { CollectionReference } from "firebase/firestore";

interface firbaseDefault extends firebase {
    default : firebase
}

declare module 'firbase' {
    const firebase : firbaseDefault
    export default firebase
}


type dir = 'desc' | 'asc'

declare global {
    type postJSON = (url: string, obj : JSON) => Promise<Response>
    type getFirestoreData = (collectionRef: CollectionReference<DocumentData>, sortBy: string, direction: dir, uid: string) =>  Promise<Array<object>>
} 




