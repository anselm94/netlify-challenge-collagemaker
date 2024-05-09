<script lang="ts">
	import { LAYOUTS } from '$lib/utils';
	import { Image } from '@unpic/svelte';
	import download from 'downloadjs';
	import { Button } from 'flowbite-svelte';
	import { TrashBinOutline } from 'flowbite-svelte-icons';
	import { toPng } from 'html-to-image';
	import Dropzone from 'svelte-file-dropzone';

	let elGrid: HTMLDivElement;

	export let mode: 'EDIT' | 'VIEW' = 'EDIT';
	export let style = 'grid-8';
	$: currentLayout = LAYOUTS[style];

	export async function downloadAsPng() {
		let lastMode = mode;
		mode = 'VIEW';
		const dataUrl = await toPng(elGrid);
		mode = lastMode;
		download(dataUrl, `photogrid.png`);
	}
</script>

<div
	bind:this={elGrid}
	class="grid aspect-square w-full grid-flow-row grid-cols-8 grid-rows-8 gap-2 border-2 border-black bg-white p-2 dark:border-white md:max-w-96 lg:max-w-[42rem]"
>
	{#each currentLayout.cells as cell}
		<div class="col-span-{cell.colspan} row-span-{cell.rowspan} overflow-hidden">
			{#if false}
				<Dropzone
					containerClasses="flex flex-col h-full items-center justify-center p-8 text-center text-gray-500 dark:text-gray-500 text-sm border-dashed border-2 border-gray-600 bg-gray-200 dark:bg-gray-800"
					disableDefaultStyles
					required
					multiple={false}
					maxSize={2097152}
					accept="image/*"
				/>
			{:else}
				<div class="relative h-full w-full">
					<Image
						class="h-full w-full"
						src="https://picsum.photos/id/800/800"
						layout="constrained"
						width={cell.width}
						height={cell.height}
						alt="A lovely bath"
					/>
					{#if mode === 'EDIT'}
						<Button
							class="absolute bottom-2 right-2 aspect-square w-8 rounded-none border-2 border-white bg-black p-0 hover:bg-gray-800 dark:border-black dark:bg-white hover:dark:bg-gray-200"
							aria-label="Delete"
							><TrashBinOutline class="h-4 w-4 text-white dark:text-black" /></Button
						>
					{/if}
				</div>
			{/if}
		</div>
	{/each}
</div>
