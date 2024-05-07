<script lang="ts">
	import { LAYOUTS } from '$lib/utils';
	import Dropzone from 'svelte-file-dropzone';

	export let style = 'grid-8';
	$: currentLayout = LAYOUTS[style];
</script>

<div
	class="grid aspect-square w-full grid-flow-row grid-cols-8 grid-rows-8 gap-2 md:max-w-96 lg:max-w-[42rem]"
>
	{#each currentLayout.cells as cell}
		<Dropzone
			containerClasses="flex flex-col items-center justify-center p-8 text-center text-gray-500 dark:text-gray-500 text-sm border-dashed border-2 border-gray-600 bg-gray-200 dark:bg-gray-800 col-span-{cell.colspan} row-span-{cell.rowspan}"
			disableDefaultStyles
			required
			multiple={false}
			maxSize={2097152}
			accept="image/*"
		/>
	{/each}
</div>
