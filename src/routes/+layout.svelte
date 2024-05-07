<script lang="ts">
	import { Button, DarkMode, NavBrand, Navbar } from 'flowbite-svelte';
	import NavContainer from 'flowbite-svelte/NavContainer.svelte';
	import Logo from '$lib/images/logo-photogrid.svg.svelte';
	import '../app.css';
</script>

<Navbar class="w-full bg-white dark:bg-black">
	<NavContainer class="border-2 border-black px-5 py-2 dark:border-white">
		<NavBrand href="/">
			<Logo />
		</NavBrand>
		<div class="flex md:order-2">
			<DarkMode
				btnClass="inline-block rounded-none px-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black hover:text-white dark:hover:text-black border-2 border-black dark:border-white"
			/>
			<Button size="sm" class="ml-4 rounded-none bg-red-600 dark:bg-red-700 hover:bg-red-700 hover:dark:bg-red-600"
				>Create a Collage</Button
			>
		</div>
	</NavContainer>
</Navbar>

<main class="h-full w-full bg-white dark:bg-slate-950">
	<div class="container mx-auto h-full w-full">
		<slot />
	</div>
</main>
