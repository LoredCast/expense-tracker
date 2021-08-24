<script>
    import { createEventDispatcher } from 'svelte';

    

    const dispatch = createEventDispatcher();

    
    let today = new Date();
    let date = today.getFullYear() + '-'+ 
            String((today.getMonth()+1)).padStart(2, '0') + '-'+ 
            String(today.getDate()).padStart(2, '0');

    let entry = {
        "title": "",
        "amount": "",
        "date": date
    };


    const handleSubmit = () => {
        dispatch('entry', {
            entry: entry
        });

        entry = {
        "title": "",
        "amount": "",
        "date": date
        };
    };
</script>

<div class="wrapper">
    <form on:submit|preventDefault={handleSubmit}>
        <input type="text" bind:value={entry.title} placeholder="Title">
        <input type="number" bind:value={entry.amount} placeholder="Amount">
        <input type="date" bind:value={entry.date}>
        <button>Add</button>
    </form>
</div>


<style lang="scss">
    @import '../main.scss';


    .wrapper {
        
    }

    form {
        margin-bottom: 1em;
        display: flex;
        

        
    }

    
    input {
        background-color: $primary2;
        color: white;
        border: none;
        padding: 0.5em 1em 0.5em 1em;
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
    }
    button:hover {
        background-color: $accent1dark;
    }

    button:active {
        background-color: #c2741a;
    }

</style>
