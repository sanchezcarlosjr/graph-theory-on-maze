<script  lang="ts">
    import AceEditor from "./AceEditor";
    import {
        find_shortest_path_by_dijkstra
    } from "./algorithms";
    let algorithm = ``;
    const execute = (obj) => {
        if (obj.validSyntax) {
            algorithm = obj.value;
        }
    }
    const algorithmD = find_shortest_path_by_dijkstra.toString();
    const f = new Function("G", "x", `return ${algorithmD}(G, x)`);
    console.log(f("1", "1"));
</script>

<section class="container">
    <AceEditor
            on:input={(obj) => execute(obj.detail)}
            lang="json"
            theme="chrome"
            value={find_shortest_path_by_dijkstra.toString()} />
    <section>
        {algorithm}
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
