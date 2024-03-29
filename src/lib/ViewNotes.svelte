<script lang="ts">
  import dayjs from "dayjs";
  import axios from "axios";
  import { fromShortcode } from "../util/CalcInstagramID";
  import { wrapTextToLines } from "../util/CheckLines";

  const ig_url_re = /^https:\/\/www\.instagram\.com\/\w*\/(.*)\//;

  export let key;
  enum Action {
    NONE,
    VIEW,
    NEW,
    ADD,
    EDIT,
  }
  let action: Action = Action.NONE;

  let selected_date: string = dayjs().add(1, "day").format("YYYY-MM-DD");
  let messageAndLink = { qrcaption: "", qrlink: "", message: "" };

  $: {
    if (selected_date !== null) {
      getMessageAndLink();
    }
  }

  function getMessageAndLink() {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/dml/${dayjs(selected_date).format(
        "YYYY-MM-DD"
      )}`,
      headers: {
        "x-api-key": key,
      },
    })
      .then((res) => {
        action = Action.VIEW;
        messageAndLink = res.data;
      })
      .catch((err) => {
        if (err.response.status === 404) {
          messageAndLink = { qrcaption: "", qrlink: "", message: "" };
          action = Action.NEW;
        }
      });
  }

  function addMessageAndLink() {
    for (let word of messageAndLink.message.split(" ")) {
      if (word.length > 33) {
        alert("Word in message is too long!");
        return;
      }
    }
    for (let word of messageAndLink.qrcaption.split(" ")) {
      if (word.length > 37) {
        alert("Word in QR caption is too long!");
        return;
      }
    }
    if (wrapTextToLines(messageAndLink.message, 33).length > 5) {
      alert("Message is too long!");
      return;
    }

    if (wrapTextToLines(messageAndLink.qrcaption, 37).length > 3) {
      alert("QR caption is too long!");
      return;
    }

    let match = ig_url_re.exec(messageAndLink.qrlink);
    if (match !== null && match.length == 2) {
      let mediaCode = match[1];
      messageAndLink.qrlink = `instagram://media?id=${fromShortcode(
        mediaCode
      )}`;
    }
    messageAndLink.message = messageAndLink.message.replaceAll("’", "'");
    messageAndLink.qrcaption = messageAndLink.qrcaption.replaceAll("’", "'");
    axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/dml/${dayjs(selected_date).format(
        "YYYY-MM-DD"
      )}`,
      data: messageAndLink,
      headers: {
        "x-api-key": key,
      },
    }).then(() => getMessageAndLink());
  }

  function deleteMessageAndLink() {
    axios({
      method: "delete",
      url: `${import.meta.env.VITE_API_URL}/dml/${dayjs(selected_date).format(
        "YYYY-MM-DD"
      )}`,
      headers: {
        "x-api-key": key,
      },
    }).then(() => getMessageAndLink());
  }
</script>

<div
  class="flex flex-col h-screen gap-4 md:gap-10 items-center justify-start pt-32"
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <svg
    class="h-20"
    fill="#000000"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    on:click={() => {
      localStorage.removeItem("ak");
      key = "";
    }}
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
  <div class="w-full grid grid-cols-10 gap-1">
    <button
      on:click={() => {
        selected_date = dayjs(selected_date)
          .subtract(1, "day")
          .format("YYYY-MM-DD");
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="#292D32"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.26 15.53L9.73999 12L13.26 8.46997"
          stroke="#292D32"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <input
      bind:value={selected_date}
      type="date"
      class="self-center col-start-2 col-span-8 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
    />
    <button
      on:click={() => {
        selected_date = dayjs(selected_date).add(1, "day").format("YYYY-MM-DD");
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="#292D32"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.74 15.53L14.26 12L10.74 8.46997"
          stroke="#292D32"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
  {#if action === Action.VIEW}
    <p class="font-serif">View Note & Link</p>
  {:else if action === Action.EDIT}
    <p class="font-serif">Edit Note & Link</p>
  {:else if action === Action.ADD}
    <p class="font-serif">Add Note & Link</p>
  {:else if action === Action.NEW}
    <p class="font-serif">No Message & Link For This Date</p>
  {/if}

  {#if action !== Action.NONE && action !== Action.NEW}
    <div class="w-full">
      <label for="message">Message:</label>
      <textarea
        id="message"
        readonly={action === Action.VIEW}
        bind:value={messageAndLink.message}
        class="col-span-8 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
        placeholder="Main message on SNS"
      />
    </div>
    <div class="w-full">
      <label for="qrcaption">QR Caption:</label>
      <input
        id="qrcaption"
        readonly={action === Action.VIEW}
        bind:value={messageAndLink.qrcaption}
        class="col-span-8 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
        placeholder="Text under QR code"
      />
    </div>
    <div class="w-full">
      <label for="qrlink">QR Link</label>
      <input
        id="qrlink"
        readonly={action === Action.VIEW}
        bind:value={messageAndLink.qrlink}
        class="col-span-8 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
        placeholder="Link converted to QR code"
      />
      {#if messageAndLink.qrlink.length >= 104}<p class="text-red-600">
          Link is over 104 characters
        </p>{/if}
    </div>
    {#if action === Action.VIEW}
      <div class="w-full pt-10 grid grid-cols-2 gap-4">
        <button
          on:click={() => {
            action = Action.EDIT;
          }}
          class="w-full bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded"
          >Edit</button
        >
        <button
          on:click={deleteMessageAndLink}
          class="w-full bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          >Delete</button
        >
      </div>
    {/if}
    {#if [Action.EDIT, Action.ADD].includes(action)}
      <div class="w-full pt-10 grid grid-cols-5 gap-4">
        <button
          on:click={getMessageAndLink}
          class="col-span-2 w-full bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          >Cancel</button
        >
        {#if messageAndLink.qrlink.length < 104}
          <button
            on:click={addMessageAndLink}
            class="col-span-3 w-full bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded"
            >Apply</button
          >{/if}
      </div>
    {/if}
  {/if}
  {#if action === Action.NEW}
    <button
      on:click={() => {
        action = Action.ADD;
      }}
      class="mt-10 w-full bg-transparent hover:bg-emerald-500 text-emerald-700 font-semibold hover:text-white py-2 px-4 border border-emerald-500 hover:border-transparent rounded"
      >Add</button
    >
  {/if}
</div>

<style>
</style>
