<script lang="ts">
	import Dropzone from 'svelte-file-dropzone';
</script>

<div
	class="grid aspect-square w-full grid-flow-row grid-cols-8 grid-rows-8 gap-2 md:max-w-96 lg:max-w-[42rem]"
>
	<Dropzone
		containerClasses="flex flex-col items-center justify-center p-8 text-center text-black dark:text-white border-dashed border-2 border-gray-600 col-span-8 row-span-4 bg-gray-200 dark:bg-gray-800"
		disableDefaultStyles
		required
		multiple={false}
		maxSize={2097152}
		accept="image/*"
	/>
	<Dropzone
		containerClasses="flex flex-col items-center justify-center p-8 text-center text-black dark:text-white border-dashed border-2 border-gray-600 col-span-4 row-span-4 bg-gray-200 dark:bg-gray-800"
		disableDefaultStyles
		required
		multiple={false}
		maxSize={2097152}
		accept="image/*"
	/>
	<Dropzone
		containerClasses="flex flex-col items-center justify-center p-8 text-center text-black dark:text-white border-dashed border-2 border-gray-600 col-span-4 row-span-4 bg-gray-200 dark:bg-gray-800"
		disableDefaultStyles
		required
		multiple={false}
		maxSize={2097152}
		accept="image/*"
	/>
</div>
