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
				btnClass="inline-block rounded-none px-2 hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white border-2 border-black dark:border-white"
			/>
			<Button size="sm" class="ml-4 rounded-none bg-red-600 dark:bg-red-700"
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
