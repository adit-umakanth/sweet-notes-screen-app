<script lang="ts">
  export let key: string;
  let field_text: string = "";

  function setKey() {
    localStorage.setItem("ak", field_text);
    key = field_text;
  }

  $: {
    if (field_text.length > 10) {
      setKey();
    }
  }
</script>

<form on:submit|preventDefault={setKey}>
  <div class="grid grid-cols-1 gap-3 w-full">
    <input
      placeholder="API Key"
      type="password"
      autocomplete="current-password"
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
      bind:value={field_text}
    />
    <div>
      <input
        type="submit"
        class="w-full bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded"
        value="Enter API Key"
      />
    </div>
  </div>
</form>
