import type { EndpointOutput } from '@sveltejs/kit';
import type { JSONResponse } from '@sveltejs/kit/types/endpoint';
import { auth, db } from '../_utils/firebase'
import { toDateTime, secsToMonth } from '../_utils/utils';

const makeTableData = (raw : FirebaseFirestore.DocumentData[]) : Object => {
    let monthlySum  = {}
    let labels = []
    let sums = []
    raw.forEach(expense => {
        let date = toDateTime(expense["date"])
        let month = secsToMonth(expense["date"])
        let year = date.getFullYear()
        let key = month + ' ' + year

        if (monthlySum[key]) {
            monthlySum[key] = monthlySum[key] + expense["amount"]  
        } else {
            labels.push(key)
            monthlySum[key] = expense["amount"]
        }
    })
    
    labels.forEach((key, i) => {
        sums[i] = monthlySum[key]
    })

    const data = {
        'labels' : labels.reverse(),
        'sums' : sums.reverse()
    }
    
    return data
}



export async function post(request : Request): Promise<EndpointOutput>  {
    const data = request.body

    const token = data['token']
    const type = data['type']


    const decodedToken = await auth.verifyIdToken(token)

    const query = await db.collection('users')
                        .doc(decodedToken.uid)
                        .collection('expenses')
                        .orderBy('date', 'desc')
                        .get();

    
    let raw = []
    
    query.forEach((e) => {
        raw.push(e.data())
    })

    const response : JSONResponse = JSON.stringify(makeTableData(raw))

    return { "body" : { response } };
        
}