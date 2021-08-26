/// <reference types="@sveltejs/kit" />

import type { postJSON } from "$lib/utils";
import type firebase from "firebase";

interface firbaseDefault extends firebase {
    default : firebase
}

declare module 'firbase' {
    const firebase : firbaseDefault
    export default firebase
}




declare global {
    type postJSON = (url: string, obj : JSON) => Promise<Response>
} 


