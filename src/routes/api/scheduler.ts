import cron from 'node-cron'
import { db } from './_utils/firebase'


const isDaysApart = (days, start) => {
    const currentSeconds = Date.now() / 1000
    const daysInSeconds = days * 24 * 60 * 60

    if (currentSeconds > (start + daysInSeconds)) {
        return true
    } 

}


const addSubExpense = (uid, title, amount) => {
    const expenseData = {
        'uid' : uid,
        'title' : title,
        'amount' : amount,
        'date' : Date.now() / 1000,
        'sub': true,
        'id' : ''
    }

    db.collection('users').doc(uid).collection('expenses').add(expenseData)
        .then(doc => {
            doc.update({
                id: doc.id
            })
        })
}

const updateSubLast = (uid, subID) => {
    db.collection('users')
        .doc(uid)
        .collection('subs')
        .doc(subID)
        .update( {
            'last': Date.now() / 1000
        })
}


cron.schedule('* * * * *', async () => {
    // schedules to check every minute if any of the subs on any user must be renewed and added to this users expenses
    const userQuery = await db.collection('users').get()

    userQuery.forEach(userDoc => {
        db.collection('users').doc(userDoc.id).collection('subs').get()
            .then(subs => {
                subs.forEach(sub => {
                    const data = sub.data()

                    if (isDaysApart(data['renews'], data['last'])) {
                        addSubExpense(userDoc.id, data['title'], data['amount'])
                        updateSubLast(userDoc.id, data['id'])
                        console.log('updated ', data['title'])
                    }
                })
                
            })
    })   
})