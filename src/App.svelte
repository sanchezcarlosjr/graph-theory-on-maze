<script lang="ts">
    import AceEditor from "./AceEditor";
    import Maze from './Maze.svelte';
    import {algorithms} from "./algorithms";
    let defaultAlgorithm: {id: number, name: string, algorithm: string} = {
        id: algorithms.length+1,
        name: "User Algorithm",
        algorithm: localStorage.getItem("algorithm") ?? `function find_shortest_path_by_me(G, source_vertex) {
    return path;
}`
    };
    algorithms.push(defaultAlgorithm);
    let algorithm = ``;
    const execute = (obj) => {
        if (obj.validSyntax) {
            algorithm = obj.value;
        }
    }
</script>

<header>
    <h1>Graph Theory Visualizer: Maze</h1>
    <select bind:value={defaultAlgorithm}>
        {#each algorithms as element}
            <option value={element}>
                {element.name}
            </option>
        {/each}
    </select>
</header>

<section class="environment">
    <AceEditor
            on:input={(obj) => execute(obj.detail)}
            bind:value={defaultAlgorithm.algorithm}/>
    <Maze/>
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
</style>
