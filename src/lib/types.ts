export type GalleryMetadata = {
    id: string;
    layout: "grid-2" | "grid-3" | "grid-4" | "grid-5" | "grid-6" | "grid-7" | "grid-8";
    images: Array<string | null>;
}