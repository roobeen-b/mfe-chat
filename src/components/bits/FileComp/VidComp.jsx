// import { useEffect, useRef } from "react";
// import { getRandomString } from "../../../utils";

// type TVidComp = React.VideoHTMLAttributes<HTMLVideoElement> & {
//   id?: string;
//   lang?: string;
// };

// const VidComp: React.FC<TVidComp> = ({
//   src = "",
//   lang = "jp",
//   id = getRandomString(5),
//   ...rest
// }: TVidComp) => {
//   const vidRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     const videoElement = vidRef.current;

//     if (videoElement) {
//       const handleContextMenu = (e: Event) => e.preventDefault();
//       videoElement.src = src;
//       videoElement.addEventListener("contextmenu", handleContextMenu);

//       return () => {
//         videoElement.removeEventListener("contextmenu", handleContextMenu);
//       };
//     }
//   }, [vidRef, src]);

//   return (
//     <video id={id} src={src} ref={vidRef} {...rest}>
//       <SourceP src={src} lang={lang} />
//     </video>
//   );
// };

// type TSourceP = {
//   src: string;
//   lang: string;
// };

// const SourceP = ({ src, lang }: TSourceP) => (
//   <>
//     <source src={src} />
//     <p>
//       {lang === "jp"
//         ? "お使いのブラウザはHTML5ビデオに対応していません。"
//         : "Your browser doesn't support HTML5 video."}
//       <span onClick={() => window.open(src, "_blank")}>
//         {lang === "jp"
//           ? "ここでは、代わりに動画へのリンクをご紹介します。"
//           : "Here is a link to the video instead."}
//       </span>
//     </p>
//   </>
// );

// export type { TVidComp };
// export { VidComp };
