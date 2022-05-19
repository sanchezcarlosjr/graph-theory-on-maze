<div class="maze">
    {#each Array(81) as _, i}
        <div class="tile" class:floor="{Math.random() >= 0.5}"></div>
    {/each}
</div>


<style>
    .maze {
        display: flex;
        flex-wrap: wrap;
        --n: 10;
        width: 55%;
    }

    .tile {
        background-size: cover;
        width: calc((100% - (var(--n) - 1) * 1px) / var(--n));
        aspect-ratio: 1;
        border: 1px solid grey;
        background: lightgrey center;
    }

    .floor {
        background: skyblue;
    }
</style>