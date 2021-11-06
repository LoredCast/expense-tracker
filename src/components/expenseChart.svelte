<script>
import { onMount } from "svelte";

    import Line from "./line.svelte";
    import { auth } from '$lib/firebase'
    import { onAuthStateChanged } from '@firebase/auth'
    import { postJSON } from '$lib/utils'

    let payload = {
        'type': 'monthly'
    }

    onMount(() => {
        onAuthStateChanged(auth, (user) => {
            user.getIdToken()
                    .then((token) => {
                        payload['token'] = token
                        postJSON('/api/charts/chartData', payload)
                            .then(res => {
                                
                            })                        
                })
        })
    })


</script>

<Line ratio={2}></Line>