<script>
    import { db, auth } from '../lib/firebase'

    //import firebase from 'firebase/app'
    import Tableview from "./tableview.svelte";
    import AddEntry from "./addEntry.svelte"

    

    let headings = ['title', 'amount', 'date']

    let queryData = []
    let currentUser



    const toDateTime = (secs) => {
        var t = new Date(1970, 0, 1); // Epoch https://stackoverflow.com/a/4611809
        t.setSeconds(secs);
        return t;
    }

    const dateToString = (date) => {
        return date.getFullYear() + '-'+ 
            String((date.getMonth()+1)).padStart(2, '0') + '-'+ 
            String(date.getDate()).padStart(2, '0');
    }

    const dateToSeconds = (date) => {
        date = new Date(date)
        return date.getTime() / 1000
    }

    const getData = () => {
        console.log("getting data")
        auth.onAuthStateChanged((user) => {
        if (user) {
            currentUser = user
            const expensesRef = db.collection('users').doc(user.uid).collection('expenses').where('uid', '==', user.uid).orderBy("date", "desc")
            queryData = []
            expensesRef.get()
                .then((query) => {
                    query.forEach(doc => {
                        let entry = doc.data()
                        entry['date'] = dateToString(toDateTime(entry['date']))
                        queryData = [...queryData, entry]
                    })
                })
                .catch(e => console.log(e))  
            } else {
                currentUser = null
            }
        }) 
    }

    

    const handleEntry = (e) => {
        let payload = e.detail.entry
        
        if (currentUser) {
            payload['uid'] = currentUser.uid
            payload['id'] = ''
            payload['date'] = dateToSeconds(payload['date'])

            db.collection('users').doc(currentUser.uid).collection('expenses').add(payload)
                .then(docRef => {
                    docRef.update({
                        'id': docRef.id
                    })
                    .then(() => {
                        payload['date'] = dateToString(toDateTime(payload['date']))
                        queryData = [...queryData, payload]
                    })
                }).catch(e => console.log(e))
            
        }
        
    }

    const handleDelete = (e) => {
        let rowIndex = e.detail.rowIndex
        let id = queryData[rowIndex].id

        queryData = queryData.filter((item) => {return queryData.indexOf(item) !== rowIndex;})
        db.collection('users').doc(currentUser.uid).collection('expenses').doc(id).delete()
    }


    getData()

</script>

{#if currentUser}
<AddEntry on:entry={handleEntry}/>
<Tableview 
    columnNames={headings} 
    rows={queryData} 
    on:removedRow={handleDelete}
/>
{:else}
    <p>Create an account or log in to view your dashboard</p>
{/if}
