<script lang="ts">
  import PhotoGrid from "./PhotoGrid.svelte";
  import { Button, Heading, Popover } from "flowbite-svelte";
  import {
    TrashBinOutline,
    UsersGroupOutline,
    BadgeCheckOutline,
  } from "flowbite-svelte-icons";
  import type { GridMetadata } from "../lib/types";

  let photogridGrid: PhotoGrid;

  export let gridMetadata: GridMetadata;
  export let LAYOUT_STYLES: {
    value: string;
    imageCount: number;
    name: string;
    icon: string;
  }[] = [];
  let gridBusy = false;

  let hasConflict = false;
  let selectedLayout = gridMetadata.layout;
  $: images =
    gridMetadata.images?.map((i) =>
      i ? `/.netlify/images?url=/api/grid/${gridMetadata.id}/image/${i}` : null
    ) ?? [];
  $: downloadEnabled =
    LAYOUT_STYLES.find((l) => l.value === selectedLayout)?.imageCount ===
    images.filter((i) => i !== null).length;

  async function onImageUpload(imagePos: number, imageFile: File) {
    gridBusy = true;
    const res = await fetch(`/api/grid/${gridMetadata.id}/image/${imagePos}`, {
      method: "PUT",
      body: imageFile,
      headers: {
        "last-modified": `${gridMetadata.lastModified}`,
      },
    });
    hasConflict = res.status == 412;
    gridMetadata = await res.json();
    gridBusy = false;
  }

  async function onImageDelete(imagePos: number) {
    gridBusy = true;
    const res = await fetch(`/api/grid/${gridMetadata.id}/image/${imagePos}`, {
      method: "DELETE",
      headers: {
        "last-modified": `${gridMetadata.lastModified}`,
      },
    });
    hasConflict = res.status == 412;
    gridMetadata = await res.json();
    gridBusy = false;
  }

  async function onLayoutSelect(selectedLayout: string) {
    gridBusy = true;
    const res = await fetch(`/api/grid/${gridMetadata.id}/set-layout`, {
      method: "POST",
      body: JSON.stringify({
        selectedLayout: selectedLayout,
      }),
      headers: {
        "last-modified": `${gridMetadata.lastModified}`,
      },
    });
    hasConflict = res.status == 412;
    gridMetadata = await res.json();
    gridBusy = false;
  }

  function copyUrl() {
    const url = window.location.origin + window.location.pathname;
    navigator.clipboard.writeText(url);
  }
</script>

<div class="flex h-full flex-col py-4 md:flex-row">
  <div
    class="flex flex-col border-2 border-black px-4 py-4 dark:border-white md:flex-1"
  >
    <div class="flex flex-row-reverse pb-4">
      <Button
        size="md"
        class="flex flex-row ml-4 rounded-none bg-black pl-3 pr-4 font-medium text-white dark:bg-white dark:text-black"
        on:click={() => photogridGrid.downloadAsPng()}
        disabled={!downloadEnabled}
        ><TrashBinOutline class="h-6 w-6 mr-2" />DOWNLOAD</Button
      >
      <Button
        id="btn-collaborate"
        size="md"
        class="flex flex-row ml-4 rounded-none bg-black pl-3 pr-4 font-medium text-white dark:bg-white dark:text-black"
        on:click={copyUrl}
        ><UsersGroupOutline class="h-6 w-6 mr-2" />COLLABORATE</Button
      >
      <Popover
        class="px-2 flex flex-row items-center rounded-none border-2 !border-green-900 bg-green-200 text-sm text-green-900 dark:!border-green-200 dark:bg-green-700 dark:text-green-100"
        triggeredBy="#btn-collaborate"
        placement="left"
        trigger="click"
        ><span class="font-bold"
          ><BadgeCheckOutline class="h-6 w-6 me-2 inline" />Link Copied!</span
        > Share this link with your friends to start collaborating</Popover
      >
    </div>
    {#if hasConflict}
      <div
        class="mb-4 border-2 border-orange-900 bg-orange-200 p-2 text-orange-900 dark:border-orange-50 dark:bg-orange-600 dark:text-orange-50"
      >
        <span class="pe-1 font-bold">INFO:</span>
        <span
          >Your change was discarded since the Photogrid was updated by another
          person. The latest changes are refreshed now</span
        >
      </div>
    {/if}
    <div class="flex flex-1 items-center justify-center">
      <PhotoGrid
        bind:this={photogridGrid}
        selectedLayout={gridMetadata.layout}
        busy={gridBusy}
        {images}
        on:upload={(e) => onImageUpload(e.detail.position, e.detail.file)}
        on:delete={(e) => onImageDelete(e.detail.position)}
      />
    </div>
  </div>

  <div class="w-full md:w-64 md:pl-4 lg:w-96">
    <div
      class="flex h-full w-full flex-col border-2 border-black bg-white dark:border-white dark:bg-black"
    >
      <Heading
        class="bg-black px-6 py-6 font-bold text-white dark:bg-white dark:text-black"
        tag="h1"
        customSize="text-base">LAYOUT</Heading
      >
      <form
        action="POST"
        on:submit|preventDefault={(e) => onLayoutSelect(selectedLayout)}
      >
        <div
          class="grid aspect-square grid-cols-3 gap-4 px-6 py-6 pb-4 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-3"
        >
          {#each LAYOUT_STYLES as layout}
            <div>
              <label class="hidden" for={layout.value}>{layout.name}</label>
              <input
                class="inline-block !h-full !w-full cursor-pointer !rounded-none !border-2 !border-black bg-contain bg-origin-content checked:bg-contain checked:ring-2 checked:ring-black dark:!border-white"
                type="radio"
                bind:group={selectedLayout}
                id={layout.value}
                name="layout-style"
                value={layout.value}
                style="background-image: url('{layout.icon}');"
                checked={layout.value === selectedLayout}
              />
            </div>
          {/each}
        </div>
        <div class="flex flex-row-reverse pb-4 pe-4">
          <Button
            size="sm"
            class="ml-4 rounded-none bg-black text-sm font-medium text-white dark:bg-white dark:text-black"
            type="submit">SET</Button
          >
        </div>
      </form>
    </div>
  </div>
</div>
