<script lang="ts">
  import { Image } from "@unpic/svelte";
  import download from "downloadjs";
  import { Button, Spinner } from "flowbite-svelte";
  import { TrashBinOutline } from "flowbite-svelte-icons";
  import { toPng } from "html-to-image";
  import Dropzone from "svelte-file-dropzone";
  import { LAYOUTS } from "../lib/utils";

  export let mode: "EDIT" | "VIEW" = "EDIT";
  export let gridId;
  export let lastModified;
  export let selectedLayout = "grid-8";
  export let images: Array<string | null> = [];
  export let busy = false;

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
      <Spinner class="w-24 h-24 aspect-square" color="red" />
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
              priority={true}
              layout="constrained"
              width={cell.width}
              height={cell.height}
              alt="Photogrid image - {i}"
            />
            {#if mode === "EDIT"}
              <form
                method="POST"
                action={`/${gridId}/image/${i}?lastmodified=${lastModified}`}
              >
                <input hidden name="operation" value="delete" />
                <Button
                  name="delete"
                  class="absolute bottom-2 right-2 w-10 h-10 rounded-none border-2 border-white p-2 bg-black hover:bg-gray-800 dark:border-black dark:bg-white hover:dark:bg-gray-200"
                  aria-label="Delete"
                  type="submit"
                  ><TrashBinOutline
                    class="mx-auto h-4 w-4 text-white dark:text-black"
                  /></Button
                >
              </form>
            {/if}
          </div>
        {:else}
          <form
            id={`form-dropzone-${i}`}
            class="h-full"
            method="POST"
            action={`/${gridId}/image/${i}?lastmodified=${lastModified}`}
            enctype="multipart/form-data"
          >
            <input hidden name="operation" value="upload" />
            <Dropzone
              containerClasses="flex flex-col h-full items-center justify-center p-8 text-center text-gray-500 dark:text-gray-500 text-sm border-dashed border-2 border-gray-600 bg-gray-200 dark:bg-gray-800"
              disableDefaultStyles
              required
              multiple={false}
              maxSize={1_048_576}
              accept="image/*"
              name="image"
              on:drop={(e) => {
                let form = document.getElementById(`form-dropzone-${i}`);
                // @ts-ignore
                form.submit();
              }}
            />
          </form>
        {/if}
      </div>
    {/each}
  {/if}
</div>
