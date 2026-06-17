---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

<div class="cv-pdf-viewer" data-pdf-url="{{ base_path }}/files/CV_DAP.pdf">
  <div class="cv-pdf-toolbar">
    <button type="button" data-zoom-out>-</button>
    <span data-page-count>Loading CV...</span>
    <button type="button" data-zoom-in>+</button>
  </div>
  <div class="cv-pdf-pages" aria-label="Embedded CV PDF"></div>
</div>

<script type="module">
  import * as pdfjsLib from "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.mjs";

  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.mjs";

  const viewer = document.querySelector(".cv-pdf-viewer");
  const pages = viewer.querySelector(".cv-pdf-pages");
  const pageCount = viewer.querySelector("[data-page-count]");
  const zoomIn = viewer.querySelector("[data-zoom-in]");
  const zoomOut = viewer.querySelector("[data-zoom-out]");
  let pdf;
  let scale = 1.25;

  async function renderPdf() {
    pages.innerHTML = "";
    pageCount.textContent = `Rendering ${pdf.numPages} pages`;

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.setAttribute("aria-label", `CV page ${pageNumber}`);

      pages.appendChild(canvas);
      await page.render({ canvasContext: context, viewport }).promise;
    }

    pageCount.textContent = `${pdf.numPages} pages`;
  }

  pdf = await pdfjsLib.getDocument(viewer.dataset.pdfUrl).promise;
  await renderPdf();

  zoomIn.addEventListener("click", async () => {
    scale = Math.min(scale + 0.15, 2);
    await renderPdf();
  });

  zoomOut.addEventListener("click", async () => {
    scale = Math.max(scale - 0.15, 0.75);
    await renderPdf();
  });
</script>
