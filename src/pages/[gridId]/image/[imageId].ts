import { getStore } from "@netlify/blobs";
import type { APIRoute } from "astro";
import { generate } from "xksuid";
import type { GridMetadata } from "../../../lib/types";

export const GET: APIRoute = async ({ params }) => {
  const gridId = params.gridId;
  const imageId = params.imageId;

  const store = getStore({
    name: "photogrid",
    consistency: "strong",
  });

  const image = await store.get(`${gridId}/image-${imageId}`, {
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
      "Netlify-CDN-Cache-Control": "public, max-age=0, s-maxage=86400, must-revalidate", // cache for 24 hours since every uploaded image has new id
    },
  });
};

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const gridId = params.gridId;
  const imagePos = parseInt(params.imageId ?? "0");
  let hasConflict = false;

  const form = await request.formData();

  const store = getStore({
    name: "photogrid",
    consistency: "strong",
  });
  const gridMetadata: GridMetadata = await store.get(`${gridId}/metadata`, {
    type: "json",
  });

  if (
    gridMetadata.lastModified ===
    parseInt(new URL(request.url).searchParams.get("lastmodified") as string)
  ) {
    const operation = form.get("operation") as "upload" | "delete";
    if (operation === "upload") {
      // upload the image
      const imageId = generate();
      const image = form.get("image") as File;
      await store.set(`${gridId}/image-${imageId}`, image);

      // update the grid metadata
      gridMetadata.images[imagePos] = imageId;
    } else {
      // delete the image
      const imageId = gridMetadata.images[imagePos];
      await store.delete(`${gridId}/image-${imageId}`);

      // update the grid metadata
      gridMetadata.images[imagePos] = null;
    }
    gridMetadata.lastModified = Date.now();
    await store.setJSON(`${gridId}/metadata`, gridMetadata);
  } else {
    hasConflict = true;
  }

  return redirect(
    `/${gridId}?lastmodified=${gridMetadata.lastModified}&hasconflict=${hasConflict}`,
    307
  );
};
