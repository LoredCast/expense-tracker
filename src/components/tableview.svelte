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

<table on:mouseleave={handleMouseOut}>
    <tr id="header">
        <th style="width: 20px;"></th>
        {#each columnNames as heading}
            <th>{heading}</th>
        {/each}
        <th></th>
    </tr>
    {#each rows as row, index}
    <tr on:mouseover={handleMouseOver} 
        on:focus={(e) => {}}>
        
        <td>
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

<style lang="scss">

    @import '../main.scss';

    table {
        border-spacing: 0;
        width: 100%;
    }
    th {
        padding: 0.5em 1em 0.5em 1em;
        color: $background;
        text-align: left;
    }

    #header {
        
        background-color: rgb(238, 238, 238);
    }

    tr:nth-child(2n-1) {
        background-color: rgba(255, 255, 255, 0.055);
    }
    
    td {
        padding: 0.5em 1em 0.5em 1em;
        text-align: left;
        font-weight: lighter;
        cursor: default;
        
    }
    
    tr:hover {
        background-color: rgba(255, 255, 255, 0.863);
        color: $background;

    }

    button {
        background-color: rgba(0, 0, 0, 0);
        margin: 0;
        padding: 0;
        color: $primary1;
        padding: 0.2em;
        transition: 80ms; 
    }

    button:hover {
        background-color: rgba(0, 0, 0, 0);
        font-weight: bold;
    }
    button:active {
        background-color: rgba(0, 0, 0, 0);
        color: $accent1;
    }

    
</style>