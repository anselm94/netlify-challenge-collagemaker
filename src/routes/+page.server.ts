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
			id: galleryId,
			lastModified: Date.now(),
			layout: 'grid-2',
			images: new Array(8).fill(null) // create placeholders for upto 8 images
		};
		await store.setJSON(`${galleryId}|metadata`, galleryMetadata);

		redirect(302, `/${galleryId}`);
	}
} satisfies Actions;
