import type { EndpointOutput } from '@sveltejs/kit';
import { auth, db} from './_utils/firebase'


export function post(request : Request): EndpointOutput  {
    const token = String(request.body)
    console.log(token)
    auth.verifyIdToken(token)
        .then(decodedToken => {
            const uid = decodedToken.uid
            db.collection('users').doc(uid).set({
                'created': true
            })
        })

    return { };
        
}