import type { EndpointOutput } from '@sveltejs/kit';
import { auth, db } from '../_utils/firebase'
import { toDateTime } from '../_utils/utils';

const makeTableData = (raw) => {
    
    

}



export async function post(request : Request): Promise<EndpointOutput>  {
    const data = request.body

    console.log(data)
    const token = data['token']
    const type = data['type']


    const decodedToken = await auth.verifyIdToken(token)

    const query = await db.collection('users')
                        .doc(decodedToken.uid)
                        .collection('expenses')
                        .orderBy('date', 'desc')
                        .get();

    

    
    query.forEach((e) => {
        console.log(e.data())
    })
    


    return { };
        
}