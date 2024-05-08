import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getStore } from '@netlify/blobs';

export const GET: RequestHandler = async ({ params }) => {
	const galleryId = params.id;
	const imageId = params.image;

	const store = getStore('photogrid');

	const image = await store.get(`${galleryId}#image-${imageId}`, {
		type: 'stream' // use 'stream' to avoid loading images into memory
	});

	if (!image) {
		throw error(404, 'Not found');
	}

	return new Response(image, {
		status: 200
	});
};
