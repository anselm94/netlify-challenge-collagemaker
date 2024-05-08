<script lang="ts">
	import { LAYOUTS } from '$lib/utils';
	import Dropzone from 'svelte-file-dropzone';
	import { Image } from '@unpic/svelte';

	export let style = 'grid-8';
	$: currentLayout = LAYOUTS[style];
</script>

<div
	class="grid aspect-square w-full grid-flow-row grid-cols-8 grid-rows-8 gap-2 md:max-w-96 lg:max-w-[42rem]"
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
				<Image
					class="w-full h-full"
					src="https://picsum.photos/id/800/800"
					layout="constrained"
					width={cell.width}
					height={cell.height}
					alt="A lovely bath"
				/>
			{/if}
		</div>
	{/each}
</div>
