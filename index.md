<html>

<head>
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript" src="covid.js"></script>
    <link rel="stylesheet" href="https://dudnic.com/assets/main.css">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <section class="heading">
        <label for="country">COVID-19 cases in </label><select id="country"></select>
        <label> as by <span id="lastApiUpdate"></span>, latest 14 days history</label>
        <aside>
            <!-- <label>Today data:</label> -->
            <label for="confirmed">⚑ confimed ☛</label><input type="number" id="confirmed" name="confirmed">
            <label for="recovered">⚑ recovered ☛</label><input type="number" id="recovered" name="recovered">
            <label for="deaths">⚑ deaths ☛</label><input type="number" id="deaths" name="deaths">
            <!-- <button id="updateData">update</button> -->
        </aside>
    </section>

    <div class="charts-container">
        <article class="new-chart"></article>
        <article class="total-chart"></article>
    </div>

</body>

</html>