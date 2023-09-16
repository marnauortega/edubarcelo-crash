"use client";

import Masonry from "@/components/Masonry/Masonry";
import { useState } from "react";
import LightboxSwiper from "../LightboxSwiper/LightboxSwiper";

const MasonryAndLightbox = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <Masonry
        items={projects}
        ofProducts={false}
        setSelectedProject={setSelectedProject}
        setLightboxOpen={setLightboxOpen}
      />
      {lightboxOpen && (
        <LightboxSwiper projects={projects} selectedProject={selectedProject} setLightboxOpen={setLightboxOpen} />
      )}
    </>
  );
};

export default MasonryAndLightbox;
