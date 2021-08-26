<script>
    import Nav from "../components/nav.svelte";
    import { auth, db } from "../lib/firebase"
    import { goto } from '$app/navigation'
    import { onMount } from "svelte";
    import { postJSON } from '$lib/utils'



    let showLogin = true
    let success = false

    let email;
    let password;


    let warning;


    const handleSignup = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(credential => {
                let user = credential.user;

                user.getIdToken()
                    .then((token) => {
                        postJSON('/api/createuser', token)
                            .then()
                        
                    success = true
                    setTimeout(() => goto('/dashboard'), 1000)
                })

                
                
                

            })
            .catch(e => {
                
                console.log(e)
                warning = e.message;
            })
    }

    const handleLogin = () => {
        console.log(email)
        auth.signInWithEmailAndPassword(email, password)
            .then(credential => {
                let user = credential.user;

                success = true
                setTimeout(() => goto('/dashboard'), 1000)
            })
            .catch(e => {
                warning = e.message;
            })
    }
</script>

<Nav tab={2}></Nav>


<div class="panel">

    
{#if showLogin}
    <h1>Log in</h1>
    <form on:submit|preventDefault={handleLogin}>
        <input bind:value={email} type="email" placeholder="email">
        <input bind:value={password} type="password" placeholder="password">
        <button>login</button>
    </form>
{:else}
    <h1>Create your account</h1>
    <form on:submit|preventDefault={handleSignup}>
        <input bind:value={email} type="email" placeholder="email">
        <input bind:value={password} type="password" placeholder="choose password">
        <button>Create</button>
    </form>
{/if}


<button class="link" on:click={() => showLogin = !showLogin}>{showLogin ? 'create account' : 'login'}</button>

{#if warning}
    <div class="warning">{warning}</div>
{:else if success}
    <div class="success">Success!</div>
{/if}

</div>


<style lang='scss'>
    @import '../main.scss';

    input {
        margin-bottom: 1em;
        background-color: $primary2;
        border: none;
        color: $textlight;
        padding: 0.5em;
    }
    
    .warning {
        margin-top: 1em;
        background-color: none;
        color: rgb(192, 78, 78);
        padding: 0.5em;
        font-size: small;
        border-radius: 10px;
        border: brown solid 1px ;
    }

    .success {
        margin-top: 1em;
        background-color: none;
        color: greenyellow;
        padding: 0.5em;
        font-size: small;
        border-radius: 10px;
        border: greenyellow solid 1px ;
        
    }

    .panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 2em;
    }

    form {
        display: flex;
        flex-direction: column;
        margin-top: 2em;

    }

</style>
  