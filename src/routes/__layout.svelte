

<style lang="scss">
    @import "../main.scss";
</style>

<script>
    import { onMount } from "svelte";
    import firebase from 'firebase/app'
    import { firebaseConfig }  from '$lib/firebase'

    onMount(() => {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
    })
</script>


<slot/>