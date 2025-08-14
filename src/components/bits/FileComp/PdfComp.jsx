// import * as pdfjsLib from "pdfjs-dist";
// import { useEffect, useRef, useState } from "react";

// import { AvatarComp } from "./Avatar";
// import { getEndPoint } from "../../../api/endpoint";
// import { StorageLink } from "../../../api/link";

// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// type TPdfComp = {
//   pdfUrl: string;
//   title: string;
// };

// const FilesLinkLang = `${getEndPoint("main")}${StorageLink}`;
// const PdfComp: React.FC<TPdfComp> = ({ pdfUrl, title }) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

//   useEffect(() => {
//     const renderThumbnail = async () => {
//       try {
//         // Use the CORS proxy URL with the PDF URL as a query parameter
//         const e_src = encodeURIComponent(pdfUrl);
//         const proxyUrl = `${FilesLinkLang}/get-pdf-proxy?url=${e_src}`;

//         // Use fetch to get the PDF data
//         const response = await fetch(proxyUrl);
//         const arrayBuffer = await response.arrayBuffer();

//         // Fetch the PDF from the provided URL
//         const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
//         const pdf = await loadingTask.promise;

//         // Load the first page of the PDF
//         const page = await pdf.getPage(1);

//         // Set the scale to adjust the image size (change as needed)
//         const scale = 0.5;
//         // Get the viewport of the page
//         const viewport = page.getViewport({ scale });

//         // Prepare the canvas for rendering
//         const canvas = canvasRef.current;
//         if (!canvas) {
//           throw "Canvas element not found.";
//         }
//         const context = canvas.getContext("2d");
//         if (!context) {
//           throw "Canvas context not found.";
//         }

//         // Set canvas dimensions
//         canvas.width = viewport.width;
//         canvas.height = viewport.height;

//         // Render the first page on the canvas as an image
//         const renderContext = {
//           viewport: viewport,
//           canvasContext: context,
//         };

//         await page.render(renderContext).promise;

//         // Thumbnail loaded successfully
//         setThumbnailLoaded(true);
//       } catch (error) {
//         console.error("Error rendering PDF thumbnail:", error);
//       }
//     };

//     renderThumbnail();
//   }, [pdfUrl]);

//   return (
//     <>
//       {!thumbnailLoaded && (
//         <AvatarComp
//           src={pdfUrl}
//           alt={title}
//           title={title}
//           className="app-comp"
//         />
//       )}
//       <canvas
//         title={title}
//         ref={canvasRef}
//         className={thumbnailLoaded ? "canvas" : "canvas-hide"}
//       />
//     </>
//   );
// };

// export type { TPdfComp };
// export { PdfComp };
