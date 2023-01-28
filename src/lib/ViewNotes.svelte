<script lang="ts">
  import dayjs from "dayjs";
  import axios from "axios";
  import { fromShortcode } from "../util/CalcInstagramID";

  export let key;

  let action = "add";

  let selected_date;
  let qrcaption;
  let message;
  let qrlink;
  let messageAndLink = { qrcaption: null, qrlink: null, message: null };
  selected_date = dayjs().format("YYYY-MM-DD");

  function getMessageAndLink() {
    let res = axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/dml/${dayjs(selected_date).format(
        "YYYY-MM-DD"
      )}`,
      withCredentials: false,
      headers: {
        "x-api-key": key,
      },
    }).then((res) => {
      action = "view";
      messageAndLink = res.data;
    });
  }
</script>

<div class="flex flex-col h-screen gap-4 md:gap-10 items-center justify-center">
  <div class="w-full grid grid-cols-10 gap-2">
    <input
      bind:value={selected_date}
      type="date"
      class="self-center col-span-8 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
    />
    <button class="col-span-2" on:click={getMessageAndLink}>
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
  {#if action === "view"}
    <p class="font-serif">View Note & Link</p>
  {:else if action === "edit"}
    <p class="font-serif">Edit Note & Link</p>
  {:else if action === "add"}
    <p class="font-serif">Add Note & Link</p>
  {/if}

  {#if action !== "none"}
    <div class="w-full">
      <label for="message">Message:</label>
      <textarea
        id="message"
        bind:value={messageAndLink.message}
        class="col-span-8 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
        placeholder="Main message on SNS"
      />
    </div>
    <div class="w-full">
      <label for="qrcaption">QR Caption:</label>
      <input
        id="qrcaption"
        bind:value={messageAndLink.qrcaption}
        class="col-span-8 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
        placeholder="Text under QR code"
      />
    </div>
    <div class="w-full">
      <label for="qrlink">QR Link</label>
      <input
        id="qrlink"
        bind:value={messageAndLink.qrlink}
        class="col-span-8 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
        placeholder="Link converted to QR code"
      />
    </div>
    <button
      class="w-full bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded"
      >Apply</button
    >
  {/if}
</div>

<style>
</style>
