// "use client";
// import download from "downloadjs";
// import { toPng } from "html-to-image";
// import { type RefObject, useState } from "react";

// import { SnackBar } from "..";

// type TElementToPNGDownload = {
//   ref: RefObject<HTMLDivElement | null>;
//   name?: string;
//   pixelRatio?: number;
// };
// export const useElementToPNGDownload = ({
//   ref,
//   pixelRatio = 2,
//   name = "SKYSALES",
// }: TElementToPNGDownload) => {
//   const [isDownloading, setIsDownloading] = useState(false);

//   const downloadPng = () => {
//     setIsDownloading(true);
//     const toastId = SnackBar({ message: "loading" }, "loading");
//     try {
//       if (ref?.current) {
//         toPng(ref.current, { pixelRatio })
//           .then((dataUrl) => {
//             download(dataUrl, name);
//             setIsDownloading(false);
//             SnackBar({ message: "" }, "dismiss", toastId);
//           })
//           .catch((error) => {
//             setIsDownloading(false);
//             SnackBar({ message: "" }, "dismiss", toastId);
//             SnackBar({ message: "error_downloading" }, "error");
//             console.error({ downloadPngError: error });
//           });
//       }
//     } catch (error) {
//       console.error(error);
//       setIsDownloading(false);
//       SnackBar({ message: "" }, "dismiss", toastId);
//       SnackBar({ message: "error_downloading" }, "error");
//     }
//   };

//   return { isDownloading, downloadPng };
// };
