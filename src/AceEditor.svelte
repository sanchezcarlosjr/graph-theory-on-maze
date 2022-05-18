<script>
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
    function setEventCallBacks() {
        editor.getSession().on("changeAnnotation",  () => {
            dispatch("input", {
                "validSyntax": editor.getSession().getAnnotations().length === 0,
                "value": editor.getSession().getValue(0)
            });
        });
    }
</script>

<div style="width:500px;height:500px">
    <div bind:this={editorElement} style="width:500px;height:500px"></div>
</div>
