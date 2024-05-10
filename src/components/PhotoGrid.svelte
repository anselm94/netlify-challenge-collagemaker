<script lang="ts">
  import { LAYOUTS } from "../lib/utils";
  import { Image } from "@unpic/svelte";
  import download from "downloadjs";
  import { Button, Spinner } from "flowbite-svelte";
  import { TrashBinOutline } from "flowbite-svelte-icons";
  import { toPng } from "html-to-image";
  import { createEventDispatcher } from "svelte";
  import Dropzone from "svelte-file-dropzone";
  import { generate } from "xksuid";

  export let mode: "EDIT" | "VIEW" = "EDIT";
  export let selectedLayout = "grid-8";
  export let images: Array<string | null> = [];
  export let busy = false;

  const dispatch = createEventDispatcher();
  let elGrid: HTMLDivElement;
  $: currentLayout = LAYOUTS[selectedLayout];

  export async function downloadAsPng() {
    let lastMode = mode;
    mode = "VIEW";
    const dataUrl = await toPng(elGrid);
    mode = lastMode;
    download(dataUrl, `photogrid.png`);
  }
</script>

<div
  bind:this={elGrid}
  class="grid aspect-square w-full grid-flow-row grid-cols-8 grid-rows-8 gap-2 border-2 border-black bg-white p-2 dark:border-white md:max-w-96 lg:max-w-[42rem]"
>
  {#if busy}
    <div
      class="col-span-8 row-span-8 flex flex-col items-center justify-center"
    >
      <Spinner color="white" />
    </div>
  {:else}
    {#each currentLayout.cells as cell, i (i)}
      <div
        class="col-span-{cell.colspan} row-span-{cell.rowspan} overflow-hidden"
      >
        {#if images[i]}
          <div class="relative h-full w-full">
            <Image
              class="h-full w-full"
              src={images[i] ?? ""}
              layout="constrained"
              width={cell.width}
              height={cell.height}
              alt="A lovely bath"
            />
            {#if mode === "EDIT"}
              <Button
                class="absolute bottom-2 right-2 w-10 h-10 rounded-none border-2 border-white p-2 bg-black hover:bg-gray-800 dark:border-black dark:bg-white hover:dark:bg-gray-200"
                aria-label="Delete"
                on:click={() => dispatch("delete", { position: i })}
                ><TrashBinOutline
                  class="mx-auto h-4 w-4 text-white dark:text-black"
                /></Button
              >
            {/if}
          </div>
        {:else}
          <Dropzone
            containerClasses="flex flex-col h-full items-center justify-center p-8 text-center text-gray-500 dark:text-gray-500 text-sm border-dashed border-2 border-gray-600 bg-gray-200 dark:bg-gray-800"
            disableDefaultStyles
            required
            multiple={false}
            maxSize={1_048_576}
            accept="image/*"
            on:drop={(e) => {
              if (e.detail.fileRejections.length > 0) {
                alert(e.detail.fileRejections[0]?.errors[0]?.message);
              } else {
                dispatch("upload", {
                  position: i,
                  file: e.detail.acceptedFiles[0],
                });
              }
            }}
          />
        {/if}
      </div>
    {/each}
  {/if}
</div>
