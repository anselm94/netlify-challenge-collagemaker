import { getStore } from "@netlify/blobs";
import type { APIRoute } from "astro";
import { generate } from "xksuid";
import type { GridMetadata } from "../../../../../lib/types";

export const GET: APIRoute = async ({ params }) => {
  const gridId = params.gridId;
  const imageId = params.imageId;

  const store = getStore("photogrid");

  const image = await store.get(`${gridId}|image-${imageId}`, {
    type: "stream", // use 'stream' to avoid loading images into memory
  });

  if (!image) {
    return new Response(null, {
      status: 404,
    });
  }

  return new Response(image, {
    status: 200,
    headers: {
      "cache-control": "public, max-age=0, s-maxage=86400, must-revalidate", // cache for 24 hours since every uploaded image has new id
    },
  });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const gridId = params.gridId;
  const imagePos = parseInt(params.imageId ?? "0");

  const image = await request.blob();

  const store = getStore("photogrid");
  const gridMetadata: GridMetadata = await store.get(`${gridId}|metadata`, {
    type: "json",
  });

  if (
    gridMetadata.lastModified !==
    parseInt(request.headers.get("last-modified") as string)
  ) {
    return new Response(JSON.stringify(gridMetadata), {
      status: 412,
      headers: {
        "last-modified": gridMetadata.lastModified.toString(),
      },
    });
  }

  // upload the image
  const imageId = generate();
  await store.set(`${gridId}|image-${imageId}`, image);

  // update the grid metadata
  gridMetadata.images[imagePos] = imageId;
  gridMetadata.lastModified = Date.now();
  await store.setJSON(`${gridId}|metadata`, gridMetadata);

  return new Response(JSON.stringify(gridMetadata), {
    status: 200,
    headers: {
      "last-modified": gridMetadata.lastModified.toString(),
    },
  });
};

export const DELETE: APIRoute = async ({ request, params }) => {
  const gridId = params.gridId;
  const imagePos = parseInt(params.imageId ?? "0");

  const store = getStore("photogrid");
  const gridMetadata: GridMetadata = await store.get(`${gridId}|metadata`, {
    type: "json",
  });

  if (
    gridMetadata.lastModified !==
    parseInt(request.headers.get("last-modified") as string)
  ) {
    return new Response(JSON.stringify(gridMetadata), {
      status: 412,
      headers: {
        "last-modified": gridMetadata.lastModified.toString(),
      },
    });
  }

  // delete the image
  const imageId = gridMetadata.images[imagePos];
  await store.delete(`${gridId}|image-${imageId}`);

  // update the grid metadata
  gridMetadata.images[imagePos] = null;
  gridMetadata.lastModified = Date.now();
  await store.setJSON(`${gridId}|metadata`, gridMetadata);

  return new Response(JSON.stringify(gridMetadata), {
    status: 200,
    headers: {
      "last-modified": gridMetadata.lastModified.toString(),
    },
  });
};
