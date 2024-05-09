import type { GalleryMetadata } from '$lib/types';
import { getStore } from '@netlify/blobs';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

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
	const imageId = params.image;

	const image = await request.blob();

	const store = getStore('photogrid');

	// upload the image
	await store.set(`${galleryId}|image-${imageId}`, image);

	// update the gallery metadata
	const galleryMetadata: GalleryMetadata = await store.get(`${galleryId}|metadata`, {
		type: 'json'
	});
	galleryMetadata.images[parseInt(imageId)] = imageId;
	await store.setJSON(`${galleryId}|metadata`, galleryMetadata);

	return new Response(image, {
		status: 201
	});
};

export const DELETE: RequestHandler = async ({ params }) => {
	const galleryId = params.id;
	const imageId = params.image;

	const store = getStore('photogrid');

	// delete the image
	await store.delete(`${galleryId}|image-${imageId}`);

	// update the gallery metadata
	const galleryMetadata: GalleryMetadata = await store.get(`${galleryId}|metadata`, {
		type: 'json'
	});
	galleryMetadata.images[parseInt(imageId)] = null;
	await store.setJSON(`${galleryId}|metadata`, galleryMetadata);

	return new Response(null, {
		status: 204
	});
};
