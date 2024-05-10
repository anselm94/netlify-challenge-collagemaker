import { getStore } from "@netlify/blobs";
import type { APIRoute } from "astro";
import { generate } from "xksuid";
import type { GridMetadata } from "../../../lib/types";

export const POST: APIRoute = async ({ redirect }) => {
  const gridId = generate();

  const store = getStore("photogrid");

  const gridMetadata: GridMetadata = {
    id: gridId,
    lastModified: Date.now(),
    layout: "grid-2",
    images: new Array(8).fill(null), // create placeholders for upto 8 images
  };
  await store.setJSON(`${gridId}/metadata`, gridMetadata);

  return redirect(`/${gridId}`, 307);
};
