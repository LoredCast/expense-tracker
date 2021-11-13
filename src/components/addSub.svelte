<script>
    import { createEventDispatcher } from 'svelte';
    

    const dispatch = createEventDispatcher();

    let entry = {
        "title": "",
        "amount": "",
        "renews": 30,
        "start": ""
    };

    const handleSubmit = () => {
        dispatch('entry', {
            entry: entry
        });

        entry = { // resets entry for new input
            "title": "",
            "amount": "",
            "renews": 30,
            "start": ""
        };
    };
</script>

<div class="wrapper">
    <form on:submit|preventDefault={handleSubmit}>
        <input type="text" bind:value={entry.title} placeholder="Title">
        <input type="number" bind:value={entry.amount} step=0.01 placeholder="Amount">
        <input type="number" bind:value={entry.renews} placeholder="Period">
        <input type="date" bind:value={entry.start}>

        <button>+</button>
    </form>
</div>


<style lang="scss">
    @import '../main.scss';

    form {
        margin-bottom: 1em;
        display: flex;
    }

    input {
        background-color: $primary2;
        color: white;
        border: none;
        padding: 0.4em 1em 0.4em 1em;
        border-radius: 0;
        margin: 0;
        width: 100%;
    }

    input:focus {
        outline: none;
    }

    button {
        background-color: $accent1;
        border-radius: 0;
        font-weight: bolder;

    }
    button:hover {
        background-color: $accent1dark;
    }

    button:active {
        background-color: #c2741a;
    }

</style>
