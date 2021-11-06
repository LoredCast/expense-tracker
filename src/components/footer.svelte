<script>
    import img from '../../static/GitHub-Mark-Light-64px.png'
</script>

<div class="footer">
    <div id="footer-container">


        <div id="elements">
            <p>Made with ❤ in Germany</p>
            <a href="https://github.com/LoredCast/expense-tracker">
                <img src={img}>
                <p>Github </p>
            </a>

        </div>
    </div>

</div>

<style>
    p {
        margin: 0;
        color: rgba(255, 255, 255, 0.411);
        display: inline;
        margin-right: 1em;

    }

    #footer-container {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2em;
    }
    #elements {
        max-width: 75%;
        min-width: 25%;
        display: flex;
        justify-content: space-around;
    }

    img {
        display: inline;
        height: 1em;
        margin-right: 3px;
        opacity: 0.411;
    }

    a {
        text-decoration: none;
        background: none;
        color: rgba(255, 255, 255, 0.411) ;
        display: flex;
        align-items: center;
    }

    a:hover {
        background: none;
        text-decoration: underline;
    }

    a:active {
        background: none;
        color: #ffffff86
    }
</style>