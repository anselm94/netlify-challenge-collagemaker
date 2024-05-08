<script lang="ts">
	import { enhance } from '$app/forms';
	import CollageGrid from '$lib/components/CollageGrid.svelte';
	import IconGrid2 from '$lib/images/grid-2.svg';
	import IconGrid3 from '$lib/images/grid-3.svg';
	import IconGrid4 from '$lib/images/grid-4.svg';
	import IconGrid5 from '$lib/images/grid-5.svg';
	import IconGrid6 from '$lib/images/grid-6.svg';
	import IconGrid7 from '$lib/images/grid-7.svg';
	import IconGrid8 from '$lib/images/grid-8.svg';
	import { Button, Heading } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let LAYOUT_STYLES = [
		{ value: 'grid-2', name: '2 image grid', icon: IconGrid2 },
		{ value: 'grid-3', name: '3 image grid', icon: IconGrid3 },
		{ value: 'grid-4', name: '4 image grid', icon: IconGrid4 },
		{ value: 'grid-5', name: '5 image grid', icon: IconGrid5 },
		{ value: 'grid-6', name: '6 image grid', icon: IconGrid6 },
		{ value: 'grid-7', name: '7 image grid', icon: IconGrid7 },
		{ value: 'grid-8', name: '8 image grid', icon: IconGrid8 }
	];
	let selectedLayout = data.layoutStyle;
</script>

<div class="flex h-full flex-col py-4 md:flex-row">
	<div class="flex flex-col border-2 border-black px-4 py-4 dark:border-white md:flex-1">
		<div class="flex flex-row-reverse">
			<Button
				size="md"
				class="ml-4 rounded-none bg-black font-medium text-white dark:bg-white dark:text-black"
				>DOWNLOAD</Button
			>
		</div>
		<div class="flex flex-1 items-center justify-center">
			<CollageGrid style={selectedLayout} />
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
				method="post"
				action="?/set-layout"
				use:enhance={() =>
					({ result }) => {
						if (result.type === 'success') {
							// @ts-ignore
							selectedLayout = result.data?.layout;
						}
					}}
			>
				<div
					class="grid grid-cols-3 gap-4 px-6 py-6 pb-4 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-3"
				>
					{#each LAYOUT_STYLES as layout}
						<label class="hidden" for={layout.value}>{layout.name}</label>
						<input
							class="h-20 w-20 cursor-pointer !rounded-none !border-2 !border-black bg-contain bg-origin-content checked:bg-contain checked:ring-2 checked:ring-black dark:!border-white xl:h-16 xl:w-16 2xl:h-24 2xl:w-24"
							type="radio"
							id={layout.value}
							name="layout-style"
							value={layout.value}
							style="background-image: url('{layout.icon}');"
							checked={layout.value === selectedLayout}
						/>
					{/each}
				</div>
				<div class="flex flex-row-reverse pe-4">
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
