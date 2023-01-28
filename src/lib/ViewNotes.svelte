<script lang="ts">
  import dayjs from "dayjs";
  let selected_date;

  $: {
    console.log(`Updated date: ${dayjs(selected_date).format("YYYY-MM-DD")}`);
  }

  selected_date = dayjs().format("YYYY-MM-DD");
</script>

<div class="grid grid-cols-1 place-items-center h-screen">
  <div class="w-full grid grid-cols-10 gap-2">
    <input
      bind:value={selected_date}
      type="date"
      class="col-span-8 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
    />
    <button class="col-span-2">
      <svg
        fill="#000000"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          id="secondary"
          d="M3,9V20a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V9Zm11.06,5.91c-.05.06-.09.12-.15.18L12,17l-1.91-1.91C10,15,10,15,9.94,14.91a1.23,1.23,0,0,1,1.89-1.55,1.18,1.18,0,0,1,.17.22,1.18,1.18,0,0,1,.17-.22,1.23,1.23,0,0,1,1.89,1.55Z"
          style="fill: rgb(236, 72, 153); stroke-width: 2;"
        /><path
          id="primary"
          d="M20,21H4a1,1,0,0,1-1-1V9H21V20A1,1,0,0,1,20,21ZM21,5a1,1,0,0,0-1-1H4A1,1,0,0,0,3,5V9H21ZM16,3V6M8,3V6m6.06,8.91a1.23,1.23,0,0,0-1.89-1.55,1.18,1.18,0,0,0-.17.22,1.18,1.18,0,0,0-.17-.22,1.23,1.23,0,0,0-1.89,1.55c.05.06.09.12.15.18L12,17l1.91-1.91C14,15,14,15,14.06,14.91Z"
          style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"
        /></svg
      >
    </button>
  </div>
</div>

<style>
  input[type="date"]::-webkit-inner-spin-button,
  input[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
  }
</style>
