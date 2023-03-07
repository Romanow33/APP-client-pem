import { useRouter } from "next/router";
import * as React from "react";
import PageTemplate from "../../../components/PageTemplate";
import SlideGallery from "../../../components/SlideGallery";

export default function projectionPage() {
  const router = useRouter();

  return (
      <SlideGallery slideId={router.query.slideId} />
  );
}
