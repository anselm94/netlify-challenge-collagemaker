import { getStore } from "@netlify/blobs";
import type { APIRoute } from "astro";
import type { GridMetadata } from "../../lib/types";

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const gridId = params.gridId;
  let hasConflict = false;
  const formData = await request.formData();

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
    gridMetadata.layout =
      (formData.get("layout-style")?.toString() as GridMetadata["layout"]) ??
      "grid-2";
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
