<script lang="ts">
  export let key = "";
</script>

<div
  class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
>
  <input
    placeholder="API Key"
    type="password"
    autocomplete="current-password"
    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
  /><br />
  <div class="flex flex-row justify-center py-3">
    <button
      class="w-full bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded"
    >
      Set API Key
    </button>
  </div>
</div>
