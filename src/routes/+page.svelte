<script>
	import { Button, Heading, Img } from 'flowbite-svelte';
	import ImgHero from '$lib/images/hero.png';
</script>

<div
	class="mx-2 mb-4 flex flex-col-reverse border-2 border-black sm:mx-auto md:flex-row dark:border-white"
>
	<div class="flex flex-1 flex-col items-start justify-center px-8 py-4">
		<Heading
			tag="h2"
			class="my-4 font-black leading-relaxed text-red-600 dark:text-red-700"
			customSize="text-3xl">Effortlessly Craft Stunning Photo Collages in Seconds</Heading
		>
		<Heading
			tag="h1"
			class="my-4 font-black leading-tight text-black dark:text-white"
			customSize="text-8xl">Unleash Your Creativity with Our Photo Collage Maker</Heading
		>
		<Button
			size="sm"
			class="my-4 rounded-none bg-red-600 hover:bg-red-700 dark:bg-red-700 hover:dark:bg-red-600"
			>Start Creating Now</Button
		>
	</div>
	<div class="flex-1">
		<Img imgClass="p-12" src={ImgHero} alt="Cover image" />
	</div>
</div>
