<script  lang="ts">
    import AceEditor from "./AceEditor";
    let code = ``;
    const execute = (obj) => {
        if (obj.validSyntax) {
            code = obj.value;
        }
    }
</script>

<section class="container">
    <AceEditor
            on:input={(obj) => execute(obj.detail)}
            width='100%'
            height='300px'
            lang="json"
            theme="chrome"
            value={`function foo(items) {
    var x = "All this is syntax highlighted";
    return x;
}
`} />
    <section>
        {code}
    </section>
</section>


<style>
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
    }
</style>
