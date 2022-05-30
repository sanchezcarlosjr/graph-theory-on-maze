<script lang="ts">
    import AceEditor from "./AceEditor";
    import Maze from './Maze.svelte';
    import {algorithms, build_function} from "./algorithms";
    import {Graph} from "./data_structures/Graph";
    let n = 20;
    let graph = new Graph();
    let source = "";
    let goal = "";
    let path = [];
    let defaultAlgorithm: {id: number, name: string, algorithm: string} = {
        id: algorithms.length+1,
        name: "User Algorithm",
        algorithm: localStorage.getItem("algorithm") ?? `function find_shortest_path_by_me(G, source_vertex) {
    return path;
}`
    };
    algorithms.push(defaultAlgorithm);
    let algorithm = "";
    const execute = (obj) => {
        if (obj.validSyntax && algorithm !== obj.value) {
            path = build_function(obj.value)(graph, source);
            algorithm = obj.value;
        }
    }
</script>

<header>
    <h1>Graph Theory Visualizer: Maze</h1>
    <section class="options">
        <select bind:value={defaultAlgorithm}>
            {#each algorithms as element}
                <option value={element}>
                    {element.name}
                </option>
            {/each}
        </select>
    </section>
</header>

<section class="environment">
    <AceEditor on:input={(obj) => execute(obj.detail)} bind:value={defaultAlgorithm.algorithm}/>
    <Maze bind:graph={graph} bind:goal={goal} bind:source={source} bind:path={path}/>
</section>

<style>
    .environment {
        display: flex;
        flex-flow: row wrap;
        margin: 1em 1em 1em 1em;
        justify-content: space-between;
    }
    header {
        display: flex;
        flex-flow: row wrap;
        margin: 1em 1em 1em 1em;
        justify-content: space-between;
    }
    .options {
        display: flex;
        flex-flow: row wrap;
        margin: 1em 1em 1em 1em;
        justify-content: space-around;
    }
</style>
