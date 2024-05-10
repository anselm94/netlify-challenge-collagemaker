import { getStore } from "@netlify/blobs";
import type { APIRoute } from "astro";
import type { GridMetadata } from "../../../../lib/types";

export const POST: APIRoute = async ({ params, request }) => {
  const gridId = params.gridId;
  const { selectedLayout } = await request.json();

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

  gridMetadata.layout = selectedLayout;
  gridMetadata.lastModified = Date.now();
  await store.setJSON(`${gridId}|metadata`, gridMetadata);

  return new Response(JSON.stringify(gridMetadata), {
    status: 200,
    headers: {
      "last-modified": gridMetadata.lastModified.toString(),
    },
  });
};
