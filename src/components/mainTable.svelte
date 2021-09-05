<script>
    import { db, auth } from '$lib/firebase'
    import { onMount } from 'svelte';
    import { 
        dateToSeconds, 
        dateToString, 
        toDateTime, 
        getCurrentDate, 
        getCurrentSeconds, 
        getFirestoreData 
    } from '$lib/utils';


    import Loader from './loader.svelte'
    import Tableview from "./tableview.svelte";
    import AddEntry from "./addEntry.svelte"
    import { onAuthStateChanged } from '@firebase/auth';
    import { collection, addDoc, deleteDoc, doc, updateDoc } from '@firebase/firestore';


    const headings = ['title', 'amount', 'date']

    let queryData = []
    let currentUser
    let expensesRef

    onMount(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                currentUser = user
                expensesRef = collection(db, 'users', user.uid, 'expenses')
                getFirestoreData(expensesRef, 'date', 'desc', user.uid)
                    .then(data => {
                        data.forEach(entry => {
                            entry['date'] = dateToString(toDateTime(entry['date']))
                            queryData = [...queryData, entry]
                        })
                    })
            } else {
                currentUser = null
            }
        })
    })



    const handleEntry = (e) => {
        let entry = e.detail.entry

        if (currentUser) {

            // if the entry is from today, make the timestamp more accurate to ensure correct order
            const seconds = dateToSeconds(entry.date)
            const date = getCurrentDate() == entry.date ? getCurrentSeconds() : seconds 

            const payload = {
                'title': entry.title,
                'amount': entry.amount,
                'date': date,
                'uid' : currentUser.uid,
                'id': ''
            }

            addDoc(expensesRef, payload)
                .then(docRef => {
                    entry['id'] = docRef.id
                    queryData = [entry, ...queryData] // Add to UI only when ID is created

                    updateDoc(docRef, {
                        'id': docRef.id // update the expense id with firebase automatically generated id for doc
                    })
                }).catch(e => console.log(e))
        }
    }

    const handleDelete = (e) => {
        let rowIndex = e.detail.rowIndex
        let id = queryData[rowIndex].id


        deleteDoc(doc(expensesRef, id)).then(
            queryData = queryData.filter((item) => {return queryData.indexOf(item) !== rowIndex;})
        )
    }

</script>

{#if queryData.length > 0}
<AddEntry on:entry={handleEntry}/>
<Tableview 
    columnNames={headings} 
    rows={queryData} 
    on:removedRow={handleDelete}
/>
{:else}

<div id="wait">
    <div id="loader">
        <Loader></Loader>
    </div>
</div>

{/if}

<style>
    
    #loader {
        width: 100%;
        display: flex;
        justify-content: center;
        transform: scale(0.2, 0.2);
    }
    p {
        width: 100%;
        text-align: center;
    }

    #wait {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-content: center;
    }


</style>