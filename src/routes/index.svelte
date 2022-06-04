<script lang="ts">
    import {onMount} from "svelte";
    import {Algorithm} from "$lib/application/algorithm";
    import {LocalStorageRepository} from "$lib/infrastructure/algorithms";
    import {PriorityQueue} from "$lib/domain/data_structures/PriorityQueue";
    import AceEditor from "$lib/components/AceEditor.svelte";
    import Maze from "$lib/components/Maze.svelte";
    import {Graph} from "../lib/domain/data_structures/Graph";

    onMount(async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.PriorityQueue = PriorityQueue;
    });
    const algorithm = new Algorithm(new LocalStorageRepository());
    const algorithms = algorithm.loadAlgorithms();
    let algorithmID = algorithm.loadDefault();
    let graph = new Graph();
    let source = "";
    let goal = "";
    let path = [];
    let algorithmCode = "";
    const execute = (obj) => {
        if (obj.validSyntax && algorithmCode !== obj.value.trim()) {
            algorithmCode = obj.value;
            path = algorithm.execute(algorithmCode)(graph, source, goal);
            algorithm.save(algorithmCode);
        }
    }
</script>
<svelte:head>
    <title>Graph Theory Visualizer: Maze</title>
</svelte:head>

<header>
    <h1>Graph Theory Visualizer: Maze</h1>
    <section class="options">
        <select bind:value={algorithmID}>
            {#each algorithms as element}
                <option value={element.id}>
                    {element.name}
                </option>
            {/each}
        </select>
    </section>
</header>

<section class="environment">
    <AceEditor
            bind:value={algorithms[algorithmID].algorithm}
            on:input={(obj) => execute(obj.detail)}
            --width="47%"
    />
    <Maze
            bind:graph={graph}
            bind:goal={goal}
            bind:source={source}
            bind:path={path}
            --width="53%"
    />
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
