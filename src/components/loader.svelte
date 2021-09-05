<div class="loader"></div>

<style>
    

    .loader {
        border: 16px solid rgba(243, 243, 243, 0); /* Light grey */
        border-top: 16px solid rgba(255, 255, 255, 0.808); /* Blue */
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>