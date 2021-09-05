<script lang="ts">
    import Nav from "../components/nav.svelte";
    import MainTable from "../components/mainTable.svelte"
    import SubTable from "../components/subTable.svelte";
    import { onMount } from "svelte";

    

</script>

<Nav tab={1}></Nav>

<div class="wrapper">
    <div id="tables">

        <div class=panel id="maintable">
        <h1>all expenses</h1>
            <MainTable></MainTable>
        </div>
        <div class="panel" id="subtable">
            <h1>current subscriptions</h1>
            <SubTable></SubTable>

        </div>
    </div>
</div>

<style lang="scss">
    @import '../main.scss';
    
    
    #bar {
        font-weight: bolder;
    }

    h1 {
        text-align: left;
        font-size: 1.5em;
        margin-bottom: 1em;
    }

    .panel {
        max-width: 100%;
        flex-basis: 0;
        margin: 0.5em;
        padding: 1em;
        border: solid rgba(255, 255, 255, 0.247) 1px;
        border-radius: 1em;
    }

    #subtable {
        flex-grow: 2;
    }

    #maintable {
        flex-grow: 3;
    }

    .wrapper {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 2em;
    }

    #tables {
        max-width: 99%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
</style>