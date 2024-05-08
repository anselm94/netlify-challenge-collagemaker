<script lang="ts">
	import Logo from '$lib/images/logo-photogrid.svg.svelte';
	import '@fontsource/roboto/300.css';
	import '@fontsource/roboto/400.css';
	import '@fontsource/roboto/500.css';
	import '@fontsource/roboto/700.css';
	import '@fontsource/roboto/900.css';
	import { Button, DarkMode, NavBrand, Navbar } from 'flowbite-svelte';
	import NavContainer from 'flowbite-svelte/NavContainer.svelte';
	import '../app.css';
</script>

<Navbar class="w-full bg-white font-sans dark:bg-black">
	<NavContainer class="border-2 border-black px-5 py-2 dark:border-white">
		<NavBrand href="/">
			<Logo />
		</NavBrand>
		<div class="flex md:order-2">
			<DarkMode
				btnClass="inline-block rounded-none px-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black hover:text-white dark:hover:text-black border-2 border-black dark:border-white hidden md:block"
			/>
			<form method="POST" action="/?/create-new">
				<Button
					size="sm"
					class="ml-4 rounded-none font-medium bg-red-600 hover:bg-red-700 dark:bg-red-700 hover:dark:bg-red-600"
					type="submit">CREATE A PHOTOGRID</Button
				>
			</form>
		</div>
	</NavContainer>
</Navbar>

<main class="h-full w-full bg-white font-sans dark:bg-black">
	<div class="container mx-auto h-full w-full">
		<slot />
	</div>
</main>
