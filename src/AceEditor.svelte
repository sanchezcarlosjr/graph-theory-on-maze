<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy } from "svelte";
    import * as ace from "ace-builds";
    ace.config.set("basePath", "https://unpkg.com/ace-builds@1.5.0/src-noconflict");
    ace.require("ace/ext/language_tools");
    const dispatch = createEventDispatcher();
    let editorElement;
    let editor;
    let contentBackup = "";
    export let value = "";
    onDestroy(() => {
        if (editor) {
            editor.destroy();
            editor.container.remove();
        }
    });

    onMount(() => {
        editor = ace.edit(editorElement);
        editor.setOptions({
            fontSize: "14px",
            useWorker:true
        });
        dispatch("init", editor);
        editor.$blockScrolling = Infinity;
        editor.setTheme("ace/theme/tomorrow");
        editor.session.setMode("ace/mode/javascript");
        editor.setValue(value);
        contentBackup = value;
        setEventCallBacks();
    });
    $: watchValue(value);
    function watchValue(val: string) {
        if (contentBackup !== val && editor && typeof val === "string") {
            editor.session.setValue(val);
            contentBackup = val;
        }
    }
    function setEventCallBacks() {
        editor.getSession().on("changeAnnotation",  () => {
            const isValidSyntax = editor.getSession().getAnnotations().length === 0;
            const algorithm = editor.getSession().getValue(0);
            dispatch("input", {
                "validSyntax": isValidSyntax,
                "value": algorithm
            });
            if (isValidSyntax) {
                localStorage.setItem("algorithm", algorithm);
            }
        });
    }
</script>

<div style="width: 40%; height: 90vh">
    <div bind:this={editorElement} style="width: 100%; height: 100%"></div>
</div>
