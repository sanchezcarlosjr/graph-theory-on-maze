<script  lang="ts">
    import AceEditor from "./AceEditor";
    import {
        find_shortest_path_by_dijkstra,
        build_function
    } from "./algorithms";
    let algorithm = ``;
    const execute = (obj) => {
        if (obj.validSyntax) {
            algorithm = obj.value;
        }
    }
</script>

<section class="container">
    <AceEditor
            on:input={(obj) => execute(obj.detail)}
            value={find_shortest_path_by_dijkstra.toString()} />
    <section>
        {build_function(algorithm)("Graph", "Source")}
    </section>
</section>


<style>
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: center;
        align-content: stretch;
    }
</style>
