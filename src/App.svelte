<script lang="ts">
  import GetKey from "./lib/GetKey.svelte";
  import ViewNotes from "./lib/ViewNotes.svelte";
  let key: string = "";
</script>

<main>
  <div class="grid grid-cols-11 h-screen place-items-center">
    <div class="col-start-2 col-end-11 md:col-start-5 md:col-span-3 w-full">
      {#if !key}
        <GetKey bind:key />
      {:else}
        <ViewNotes bind:key />
      {/if}
    </div>
  </div>
</main>

<style>
</style>
