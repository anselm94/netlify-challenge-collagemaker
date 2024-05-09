import type { GalleryMetadata } from '$lib/types';
import { getStore } from '@netlify/blobs';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { generate } from 'xksuid';

export const GET: RequestHandler = async ({ params }) => {
	const galleryId = params.id;
	const imageId = params.image;

	const store = getStore('photogrid');

	const image = await store.get(`${galleryId}|image-${imageId}`, {
		type: 'stream' // use 'stream' to avoid loading images into memory
	});

	if (!image) {
		throw error(404, 'Not found');
	}

	return new Response(image, {
		status: 200
	});
};

export const PUT: RequestHandler = async ({ params, request }) => {
	const galleryId = params.id;
	const imagePos = parseInt(params.image);

	const image = await request.blob();

	const store = getStore('photogrid');
	const galleryMetadata: GalleryMetadata = await store.get(`${galleryId}|metadata`, {
		type: 'json'
	});

	if (galleryMetadata.lastModified !== parseInt(request.headers.get('last-modified') as string)) {
		return json({
			updateConflict: true
		});
	}

	// upload the image
	const imageId = generate();
	await store.set(`${galleryId}|image-${imageId}`, image);

	// update the gallery metadata
	galleryMetadata.images[imagePos] = imageId;
	galleryMetadata.lastModified = Date.now();
	await store.setJSON(`${galleryId}|metadata`, galleryMetadata);

	return json({
		updateConflict: false
	});
};

export const DELETE: RequestHandler = async ({ request, params }) => {
	const galleryId = params.id;
	const imagePos = parseInt(params.image);

	const store = getStore('photogrid');
	const galleryMetadata: GalleryMetadata = await store.get(`${galleryId}|metadata`, {
		type: 'json'
	});

	if (galleryMetadata.lastModified !== parseInt(request.headers.get('last-modified') as string)) {
		return json({
			updateConflict: true
		});
	}

	// delete the image
	const imageId = galleryMetadata.images[imagePos];
	await store.delete(`${galleryId}|image-${imageId}`);

	// update the gallery metadata
	galleryMetadata.images[imagePos] = null;
	galleryMetadata.lastModified = Date.now();
	await store.setJSON(`${galleryId}|metadata`, galleryMetadata);

	return json(
		{
			success: true
		},
		{
			status: 200
		}
	);
};
