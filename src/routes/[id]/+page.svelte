<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import PhotoGrid from '$lib/components/PhotoGrid.svelte';
	import IconGrid2 from '$lib/images/grid-2.svg';
	import IconGrid3 from '$lib/images/grid-3.svg';
	import IconGrid4 from '$lib/images/grid-4.svg';
	import IconGrid5 from '$lib/images/grid-5.svg';
	import IconGrid6 from '$lib/images/grid-6.svg';
	import IconGrid7 from '$lib/images/grid-7.svg';
	import IconGrid8 from '$lib/images/grid-8.svg';
	import { Button, Heading, Popover } from 'flowbite-svelte';
	import { TrashBinOutline, UsersGroupOutline, BadgeCheckOutline } from 'flowbite-svelte-icons';
	import type { ActionData, PageData } from './$types';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;
	export let form: ActionData;

	let photogridGrid: PhotoGrid;

	let LAYOUT_STYLES = [
		{ value: 'grid-2', imageCount: 2, name: '2 image grid', icon: IconGrid2 },
		{ value: 'grid-3', imageCount: 3, name: '3 image grid', icon: IconGrid3 },
		{ value: 'grid-4', imageCount: 4, name: '4 image grid', icon: IconGrid4 },
		{ value: 'grid-5', imageCount: 5, name: '5 image grid', icon: IconGrid5 },
		{ value: 'grid-6', imageCount: 6, name: '6 image grid', icon: IconGrid6 },
		{ value: 'grid-7', imageCount: 7, name: '7 image grid', icon: IconGrid7 },
		{ value: 'grid-8', imageCount: 8, name: '8 image grid', icon: IconGrid8 }
	];
	$: selectedLayout = data.layout;
	let gridBusy = false;
	$: images =
		data.images?.map((i) => (i ? `/.netlify/images?url=/${data.id}/image/${i}` : null)) ?? [];
	$: downloadEnabled =
		LAYOUT_STYLES.find((l) => l.value === selectedLayout)?.imageCount ===
		images.filter((i) => i !== null).length;
	$: conflictUpdateOnLayoutSet = form?.updateConflict;
	let conflictUpdateOnUpload = false;
	let conflictUpdateOnDelete = false;
	$: hadConflict = conflictUpdateOnLayoutSet || conflictUpdateOnUpload || conflictUpdateOnDelete;
	$: lastModified = data.lastModified;

	async function onImageUpload(imagePos: number, imageFile: File) {
		gridBusy = true;
		const res = await fetch(`/${data.id}/image/${imagePos}`, {
			method: 'PUT',
			body: imageFile,
			headers: {
				'last-modified': `${lastModified}`
			}
		});
		const { updateConflict }: { updateConflict: boolean } = await res.json();
		conflictUpdateOnUpload = updateConflict;
		await invalidateAll();
		gridBusy = false;
	}

	async function onImageDelete(imagePos: number) {
		gridBusy = true;
		const res = await fetch(`/${data.id}/image/${imagePos}`, {
			method: 'DELETE',
			headers: {
				'last-modified': `${lastModified}`
			}
		});
		const { updateConflict }: { updateConflict: boolean } = await res.json();
		conflictUpdateOnDelete = updateConflict;
		await invalidateAll();
		gridBusy = false;
	}

	function copyUrl() {
		const url = window.location.origin + window.location.pathname;
		navigator.clipboard.writeText(url);
	}
</script>

<div class="flex h-full flex-col py-4 md:flex-row">
	<div class="flex flex-col border-2 border-black px-4 py-4 dark:border-white md:flex-1">
		<div class="flex flex-row-reverse pb-4">
			<Button
				size="md"
				class="ml-4 rounded-none bg-black pl-3 pr-4 font-medium text-white dark:bg-white dark:text-black"
				on:click={() => photogridGrid.downloadAsPng()}
				disabled={!downloadEnabled}><TrashBinOutline class="mr-2" />DOWNLOAD</Button
			>
			<Button
				id="btn-collaborate"
				size="md"
				class="ml-4 rounded-none bg-black pl-3 pr-4 font-medium text-white dark:bg-white dark:text-black"
				on:click={copyUrl}><UsersGroupOutline class="mr-2" />COLLABORATE</Button
			>
			<Popover
				class="flex flex-row items-center rounded-none border-2 !border-green-900 bg-green-200 text-sm text-green-900 dark:!border-green-200 dark:bg-green-700 dark:text-green-100"
				triggeredBy="#btn-collaborate"
				placement="left"
				trigger="click"
				><span class="font-bold"><BadgeCheckOutline class="mr-2 inline" />Link Copied!</span> Share this
				link with your friends to start collaborating</Popover
			>
		</div>
		{#if hadConflict}
			<div
				class="mb-4 border-2 border-orange-900 bg-orange-200 p-2 text-orange-900 dark:border-orange-50 dark:bg-orange-600 dark:text-orange-50"
			>
				<span class="pe-1 font-bold">INFO:</span>
				<span
					>Your change was discarded since the Photogrid was updated by another person. The latest
					changes are refreshed now</span
				>
			</div>
		{/if}
		<div class="flex flex-1 items-center justify-center">
			<PhotoGrid
				bind:this={photogridGrid}
				style={selectedLayout}
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
				method="post"
				action="?/set-layout"
				use:enhance={() =>
					async ({ result }) => {
						if (result.type === 'success') {
							// @ts-ignore
							data = result.data;
							// @ts-ignore
							conflictUpdateOnLayoutSet = result.data.updateConflict;
						} else {
							// may be the gallery is updated by someone else
							await applyAction(result); // apply the result first
							await invalidateAll(); // but reload the data to load what the user has uploaded
						}
					}}
			>
				<input hidden value={lastModified} name="last-modified" />
				<div
					class="grid aspect-square grid-cols-3 gap-4 px-6 py-6 pb-4 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-3"
				>
					{#each LAYOUT_STYLES as layout}
						<div>
							<label class="hidden" for={layout.value}>{layout.name}</label>
							<input
								class="inline-block !h-full !w-full cursor-pointer !rounded-none !border-2 !border-black bg-contain bg-origin-content checked:bg-contain checked:ring-2 checked:ring-black dark:!border-white"
								type="radio"
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
