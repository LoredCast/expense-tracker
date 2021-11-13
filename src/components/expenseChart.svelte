<script>
import { onMount } from "svelte";

import Line from "./line.svelte";
import { auth } from '$lib/firebase'
import { onAuthStateChanged } from '@firebase/auth'
import { postJSON } from '$lib/utils'
import { compute_slots } from "svelte/internal";

    let payload = {
        'type': 'monthly'
    }

    let labels
    let sums
    let ratio = 2
    let currentUser

    const getData = (user) => {
        user.getIdToken()
                    .then((token) => {
                        payload['token'] = token
                        postJSON('/api/charts/chartData', payload)
                            .then(res => {
                                res.json()
                                    .then(d => {
                                        let data = JSON.parse(d["response"])
                                        labels = data['labels']
                                        sums = data['sums']
                                    })
                            })                        
                })
        
    }

    onMount(() => {
        onAuthStateChanged(auth, (user) => {
            currentUser = user
            getData(currentUser)
        })

    })

    const handleReload = () => {
        getData(currentUser)
        console.log('reloading')
    }


</script>

{#if labels}
<div id="wrapper">
        <div id="panel">
            <button on:click={handleReload}>Reload</button>
            <Line ratio={ratio} labels={labels} sums={sums}></Line>
    </div>
</div>
   
{/if}

<style>
    #wrapper {
        max-width: 88%;
        width: 88%;
        height: 100%;
    }

    #panel {
        width: 100%;
        max-width: 100%;
        flex-basis: 0;
        margin: 0.5em;
        padding: 1em;
        border: solid rgba(255, 255, 255, 0.247) 1px;
        border-radius: 1em;
    }
    
</style>