
<script>
import { onMount } from "svelte";


    export let tab;
    import 'firebase/auth'
    import firebase from "firebase/app";
    import { firebaseConfig }  from '$lib/firebase'

    
    let auth
    let isSignedIn = false
    let email;



    onMount(() => {

        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        auth = firebase.auth()
        


        auth.onAuthStateChanged((user) => {
            if (user) {
                isSignedIn = true;
                email = user.email;
            } else {
                isSignedIn = false;
            }
        })

        
    
    
    })
    const handleSignOut = () => {
            auth.signOut()
                .then(() => {

                })
                .catch(e => {
                    console.log(e)
                })
        }



</script>

<nav id="bar">
    <a class={tab == 0 ? 'bold' : ''} href=".">home</a>

    {#if isSignedIn}
    <a class={tab == 1 ? 'bold' : ''} href="/dashboard">dashboard</a>

    <div id="userInfo">
        <p> {email}</p>
        <button class="link" on:click={handleSignOut}>Sign out</button>
        </div>
    {:else}
    <a class={tab == 2 ? 'bold' : ''} href="/login">login</a>
    {/if}
</nav>

<style lang='scss'>
    @import "../main.scss";

    p {
        font-size: small;
    }

    nav {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center; 
        background-color: $primary1;
    }
    a {
        margin: 1em;
        text-decoration: none;
        font-weight: 200;
    }

    .bold {
        font-weight: bolder;
    }

    button {
        padding: 0;
    }

    #userInfo {
        margin: 1em;
        align-self: flex-end;

    }


</style>