<script>
    import Tableview from "./tableview.svelte";
    import AddSub from "./addSub.svelte";
    import Loader from './loader.svelte'
    import { onMount } from "svelte";
    import { auth, db } from '$lib/firebase'
    import { getFirestore, collection, query, where, getDocs, deleteDoc, doc, addDoc, updateDoc } from "@firebase/firestore";
    import { getAuth, onAuthStateChanged } from "@firebase/auth";
    import { getFirestoreData, dateToSeconds, toDateTime, dateToString } from '$lib/utils'

    let queryData = []
    let currentUser
    let subRef

    onMount(() => {
        onAuthStateChanged(auth, user => {
        if (user) {
            //subRef = db.collection('users').doc(user.uid).collection('subs')
            subRef = collection(db, 'users', user.uid, 'subs')

            currentUser = user
            getFirestoreData(subRef, 'start', 'desc', user.uid)
                .then(data => {
                    data.forEach(sub => {
                        sub['start'] = dateToString(toDateTime(sub['start']))
                        queryData = [...queryData, sub]
                    })
                })
        } else {
            currentUser = null
        }

        })
    })




    const headings = ['title', 'amount', 'renews', 'start']

    const handleDelete = (e) => {
        let rowIndex = e.detail.rowIndex
        let id = queryData[rowIndex].id

        deleteDoc(doc(subRef, id))
        queryData = queryData.filter((item) => {return queryData.indexOf(item) !== rowIndex;})
    }

    const handleEntry = (e) => {
        const entry = e.detail.entry

        if (currentUser) {
            const payload = {
                'title': entry.title,
                'amount': entry.amount,
                'renews': entry.renews,
                'uid': currentUser.uid,
                'id': '',
                'start': dateToSeconds(entry.start),
                'last' : dateToSeconds(entry.start)
            }

            addDoc(subRef, payload)
                .then(docRef => {
                    entry['id'] = docRef.id
                    queryData = [entry, ...queryData] // Add to UI only when ID is created

                    updateDoc(docRef, {
                        'id': docRef.id // update the expense id with firebase automatically generated id for doc
                    })
                }).catch(e => {
                    console.log(e)
                })
        }

    }
</script>

{#if queryData.length > 0}


<AddSub on:entry={handleEntry}/>
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