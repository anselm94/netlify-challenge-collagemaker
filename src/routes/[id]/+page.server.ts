import type { GalleryMetadata } from '$lib/types';
import { getStore } from '@netlify/blobs';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const galleryId = params.id;

	const store = getStore('photogrid');

	const galleryMetadata = await store.get(`${galleryId}|metadata`, {
		type: 'json'
	});

	if (galleryMetadata === null) {
		return fail(404);
	}

	return galleryMetadata as GalleryMetadata;
};

export const actions = {
	'set-layout': async ({ request, params }) => {
		const galleryId = params.id;
		const formData = await request.formData();

		const store = getStore('photogrid');
		const galleryMetadata: GalleryMetadata = await store.get(`${params.id}|metadata`, {
			type: 'json'
		});

		if (galleryMetadata.lastModified !== parseInt(formData.get('last-modified') as string)) {
			return fail(412, {
				updateConflict: true
			});
		}

		galleryMetadata.layout = formData.get('layout-style') as GalleryMetadata['layout'];
		galleryMetadata.lastModified = Date.now();
		await store.setJSON(`${galleryId}|metadata`, galleryMetadata);

		return {
			...galleryMetadata,
			updateConflict: false
		};
	}
} satisfies Actions;
