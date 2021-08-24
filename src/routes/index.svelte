<script>
  import Nav from "../components/nav.svelte";
  

  
</script>



<Nav tab={0}></Nav>

<div id="head">
  <div>
    <h1>Expense Tracker</h1>
    <p>Simple dashboard for tracking your expenses</p>
  </div>
</div>


<style lang='scss'>
  @import '../main.scss';  
  
  #head {
      display: flex;
      justify-content: center;
      margin-top: 2em;
  }
  
</style>
