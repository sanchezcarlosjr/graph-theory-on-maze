<script lang="ts">
    import {makeAGraphMaze} from "./Graph";
    const graph = makeAGraphMaze(30);
</script>
<div class="maze">
    {#each [...graph.vertices] as vertex, i}
        <div class="tile" class:floor="{vertex.cost === 0}"></div>
    {/each}
</div>


<style>
    .maze {
        display: flex;
        flex-wrap: wrap;
        --n: 30;
        width: 55%;
    }

    .tile {
        background-size: cover;
        width: calc((100% - (var(--n) - 1) * 0px) / var(--n));
        aspect-ratio: 1;
        background: #1919A6 center;
    }

    .floor {
        background: black;
    }
</style>