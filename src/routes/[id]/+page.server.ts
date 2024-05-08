import type { GalleryMetadata } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';
import { getStore } from '@netlify/blobs';

export const load: PageServerLoad = async ({ params }) => {
	const galleryId = params.id;

	const store = getStore('photogrid');

	const galleryMetadata: GalleryMetadata = await store.get(`${galleryId}#metadata`, {
		type: 'json'
	});

	return {
		layoutStyle: galleryMetadata.layout,
		gallery: galleryMetadata.gallery
	};
};

export const actions = {
	'set-layout': async ({ request, params }) => {
		const galleryId = params.id;
		const formData = await request.formData();

		const store = getStore('photogrid');
		const galleryMetadata: GalleryMetadata = await store.get(`${params.id}#metadata`, {
			type: 'json'
		});

		galleryMetadata.layout = formData.get('layout-style') as GalleryMetadata['layout'];
		await store.setJSON(`${galleryId}#metadata`, galleryMetadata);

		return galleryMetadata;
	}
} satisfies Actions;
