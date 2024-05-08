import { getStore } from '@netlify/blobs';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { generate } from 'xksuid';
import type { GalleryMetadata } from '$lib/types';

export const actions = {
	'create-new': async ({ request }) => {
		const galleryId = generate();

		const store = getStore('photogrid');

		const galleryMetadata: GalleryMetadata = {
			layout: 'grid-2',
			gallery: []
		};
		await store.setJSON(`${galleryId}#metadata`, galleryMetadata);

		redirect(302, `/${galleryId}`);
	}
} satisfies Actions;
