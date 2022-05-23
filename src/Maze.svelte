<script lang="ts">
    import {makeAGraphMaze} from "./Graph";
    const n = 30;
    const toCoordinates = (vertex) => [Math.floor(vertex/n), vertex % n];
    let [graph, source, goal] = makeAGraphMaze(n);
    const goalCoordinates = toCoordinates(parseInt(goal));
    const sourceCoordinates = toCoordinates(parseInt(source));
</script>
<div class="maze">
    <div class="aim goal" style="--topGoal: {goalCoordinates[0]};--leftGoal: {goalCoordinates[1]};"></div>
    <div class="aim player" style="--topPlayer: {sourceCoordinates[0]};--leftPlayer: {sourceCoordinates[1]};"></div>
    {#each [...graph.vertices] as vertex, i}
        <div class="tile" class:floor="{vertex.cost === 0}"></div>
    {/each}
</div>


<style>
    .aim {
        position: absolute;
        transition: left 0.2s ease, top 0.2s ease;
        transform-origin: center;
        transform:scale(0.6);
        border-radius: 100%;
        width: calc(100%/ var(--n));
        aspect-ratio: 1;
    }
    .player {
        background-color: #90ee90;
        top: calc(100%/var(--n)*var(--topPlayer));
        left: calc(100%/var(--n)*var(--leftPlayer));
    }
    .goal {
        background-color: #FFD700;
        top: calc(100%/var(--n)*var(--topGoal));
        left: calc(100%/var(--n)*var(--leftGoal));
    }
    .maze {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        --n: 30;
        width: 55%;
    }

    .tile {
        background-size: cover;
        width: calc((100% - (var(--n) - 1) * 0px) / var(--n));
        aspect-ratio: 1;
        background: #000 center;
    }

    .floor {
        background: darkgray;
    }
</style>