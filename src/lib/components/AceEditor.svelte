<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import javascriptWorkerUrl from 'ace-builds/src-noconflict/worker-javascript.js?url';
	let editorElement;
	export let value;
	let contentBackup = '';
	let editor;
	onDestroy(() => {
		if (editor) {
			editor.destroy();
			editor.container.remove();
		}
	});
	$: watchValue(value);
	function watchValue(val: string) {
		if (contentBackup !== val && editor && typeof val === 'string') {
			editor.session.setValue(val);
			contentBackup = val;
		}
	}
	const dispatch = createEventDispatcher();
	onMount(async () => {
		const ace = await import('ace-builds');
		ace.config.setModuleUrl('ace/mode/javascript_worker', javascriptWorkerUrl);
		await import('ace-builds/src-noconflict/theme-dawn');
		await import('ace-builds/src-noconflict/mode-javascript');
		editor = ace.edit(editorElement);
		editor.setTheme('ace/theme/dawn');
		editor.session.setMode('ace/mode/javascript');
		editor.setOptions({
			fontSize: '14px',
			useWorker: true
		});
		editor.$blockScrolling = Infinity;
		contentBackup = value;
		editor.setValue(value);
		editor.getSession().on('changeAnnotation', () => {
			const isValidSyntax = editor.getSession().getAnnotations().length === 0;
			const algorithm = editor.getSession().getValue(0);
			dispatch('input', {
				validSyntax: isValidSyntax,
				value: algorithm
			});
		});
	});
</script>

<section>
	<div class="editor" bind:this={editorElement}>{value}</div>
</section>

<style>
	.editor {
		width: 100%;
		height: 100%;
	}

	section {
		width: var(--width, 100%);
		height: var(--height, 80vh);
	}
</style>
