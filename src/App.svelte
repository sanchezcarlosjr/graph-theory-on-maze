<script lang="ts">
    import AceEditor from "./AceEditor";
    import Maze from './Maze.svelte';
    import {find_shortest_path_by_dijkstra} from "./algorithms";
    const defaultAlgorithm = localStorage.getItem("algorithm") ?? find_shortest_path_by_dijkstra;
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
            value={defaultAlgorithm}/>
    <Maze/>
</section>

<style>
    .container {
        display: flex;
        flex-flow: row wrap;
        margin: 1em 1em 1em 1em;
        justify-content: space-between;
    }
</style>
