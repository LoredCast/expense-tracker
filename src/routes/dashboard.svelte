<script lang="ts">
    import Nav from "../components/nav.svelte";
    import MainTable from "../components/mainTable.svelte"
    import { onMount } from "svelte";

    

</script>

<Nav tab={1}></Nav>

<div class="wrapper">
    <div class=panel>
        <MainTable></MainTable>
    </div>
</div>

<style lang="scss">
    @import '../main.scss';
    
    
    #bar {
        font-weight: bolder;
    }

    .panel {
        max-width: 93%;
    }

    .wrapper {
        display: flex;
        justify-content: center;
        margin-top: 2em;
    }
</style>