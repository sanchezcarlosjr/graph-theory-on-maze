<script lang="ts">
	import { onMount } from 'svelte';
	import { Algorithm } from '$lib/application/algorithm';
	import { LocalStorageRepository } from '$lib/infrastructure/algorithms';
	import { PriorityQueue } from '$lib/domain/data_structures/PriorityQueue';
	import AceEditor from '$lib/components/AceEditor.svelte';
	import Maze from '$lib/components/Maze.svelte';
	import { browser } from '$app/env';
	import { Graph } from '../lib/domain/data_structures/Graph';
	import {Queue} from "../lib/domain/data_structures/Queue";
	import {QueueRecorder} from "../lib/domain/data_structures/QueueRecorder";
	onMount(async () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		window.PriorityQueue = PriorityQueue;
		// @ts-ignore
		window.Queue = Queue;
		// @ts-ignore
		window.QueueRecorder = QueueRecorder;
	});
	const algorithm = new Algorithm(new LocalStorageRepository());
	const algorithms = algorithm.loadAlgorithms();
	let algorithmID = algorithm.loadDefault();
	let graph = new Graph();
	let source = '';
	let n = browser ? parseInt(localStorage.getItem("size") ?? "20") : 20;
	let goal = '';
	let path = [];
	let lastCode = {validSyntax: false, value: ''};
	const execute = (obj) => {
		if (obj.validSyntax && lastCode !== obj.value.trim()) {
			lastCode = obj;
			path = algorithm.execute(lastCode.value)(graph, source, goal);
			algorithm.save(lastCode.value);
		}
	};
	const executeNewGraph = (graph) => {
		if(browser) {
			localStorage.setItem("size", n.toString());
		}
		execute(lastCode);
	};
	$: executeNewGraph(graph);
</script>

<svelte:head>
	<title>Graph Theory Visualizer: Maze</title>
</svelte:head>

<header>
	<h1>Graph Theory Visualizer: Maze</h1>
	<section class="options">
		<fieldset>
			<legend>Size</legend>
			<select bind:value={n}>
				{#each [5,10,20,40] as graphSize}
					<option value={graphSize}>
						{graphSize}
					</option>
				{/each}
			</select>
		</fieldset>
		<fieldset>
			<legend>Algorithm</legend>
			<select bind:value={algorithmID}>
				{#each algorithms as element}
					<option value={element.id}>
						{element.name}
					</option>
				{/each}
			</select>
		</fieldset>
		<fieldset>
			<legend>Level</legend>
			<select>
				{#each [{level: 2, name: "Find shortest path"}, {level: 3, name: "Score"}, {level: 1, name: "Find path"}] as element}
					<option value={element.level}>
						{element.name}
					</option>
				{/each}
			</select>
		</fieldset>
	</section>
</header>
<section class="environment">
	<AceEditor
		bind:value={algorithms[algorithmID].algorithm}
		on:input={(obj) => execute(obj.detail)}
		--width="47%"
	/>
	<Maze bind:n bind:graph bind:goal bind:source bind:path --width="53%" />
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
