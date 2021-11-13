<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();


    export let columnNames : string[];
    export let rows : any;
    
    let currentRowIndex;
    let mouseOut = true;

    const handleMouseOver = (e) => {
        e.preventDefault()
        currentRowIndex = e.currentTarget.rowIndex - 1
        mouseOut = false
    }

    const handleMouseOut = (e) => {
        e.preventDefault()
        mouseOut = true
        currentRowIndex = undefined
    }

    const clickHandler = () => {
        // dispatch event if remove button is clicked
        dispatch('removedRow', {
            rowIndex: currentRowIndex
        });

        currentRowIndex = undefined
    }


</script>
<div id="table">


    <table on:mouseleave={handleMouseOut}>
        <tr id="header">
            <th id="delete"></th>
            {#each columnNames as heading}
                <th>{heading}</th>
            {/each}
            <th></th>
        </tr>
        {#each rows as row, index}
        <tr on:mouseover={handleMouseOver} 
            on:focus={(e) => {}}>
            
            <td id="delete-entry">
                {#if index === currentRowIndex}
                    <button on:click={clickHandler}>X</button>
                {/if}
            </td>
    
            {#each columnNames as prop}
                <td>{row[prop]}</td>
            {/each}
            <td>{index}</td>
    
        </tr>
        
        {/each}
    </table>
</div>


<style lang="scss">

    @import '../main.scss';

    #table {
        max-height: 50vh;
        overflow-y: scroll;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    #table::-webkit-scrollbar {
        display: none;
    }


    table {
        border-spacing: 0;
        width: 100%;
        height: 10px;
        overflow-y: scroll;

    }

    
    th {
        padding: 0.2em 0.2em 0.2em 0.2em;
        color: $background;
        text-align: left;
        width: min-content;
    }

    #header {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        background-color: rgb(238, 238, 238);
    }

    tr:nth-child(2n-1) {
        background-color: rgba(255, 255, 255, 0.021);
    }
    
    td {
        padding: 0.3em 0.7em 0.3em 0.7em;
        text-align: left;
        font-weight: lighter;
        cursor: default;
        width: min-content;
        
    }
    
    tr:hover {
        background-color: rgba(255, 255, 255, 0.137);

    }

    button {
        background-color: rgba(0, 0, 0, 0);
        margin: 0;
        color: $textlight;
        padding: 0em;
        transition: 80ms; 
    }

    button:hover {
        background-color: rgba(0, 0, 0, 0);
        color: $accent1;
        font-weight: bold;
    }
    button:active {
        background-color: rgba(0, 0, 0, 0);
        color: $accent1;
    }

    #delete {
        width: 10px;
        padding: 0.6em;
    }

    
</style>