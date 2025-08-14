// import clsx from "clsx";
// import React, { ReactNode, useEffect, useRef } from "react";

// type AudCompProps = {
//   poster?: string;
//   children: ReactNode;
// };

// const AudComp: React.FC<AudCompProps> = ({ poster, children }) => (
//   <div className="w-full h-full flex items-center justify-center">
//     <div className="w-full h-full audio-container">
//       {poster ? (
//         <picture className="w-full h-full">
//           <img
//             src={poster}
//             alt="audio-poster"
//             className="w-full h-full object-cover"
//           />
//           {children}
//         </picture>
//       ) : (
//         children
//       )}
//     </div>
//   </div>
// );

// type SourcePProps = {
//   src: string;
//   lang: string;
// };

// const SourceP: React.FC<SourcePProps> = ({ src, lang }) => (
//   <>
//     <source src={src} />
//     <span>
//       {lang === "jp"
//         ? "お使いのブラウザはHTML5オーディオに対応していません。"
//         : "Your browser doesn't support HTML5 audio."}
//       <a href={src} target="_blank" rel="noopener noreferrer">
//         {lang === "jp"
//           ? "代わりに音声へのリンクをご紹介します。"
//           : "Here is a link to the audio instead."}
//       </a>
//     </span>
//   </>
// );

// type TAudioComp = React.AudioHTMLAttributes<HTMLAudioElement> & {
//   lang?: string;
//   type?: string;
//   poster?: string;
// };

// const AudioComp: React.FC<TAudioComp> = ({
//   type,
//   poster,
//   className,
//   src = "",
//   lang = "jp",
//   ...rest
// }) => {
//   const audRef = useRef<HTMLAudioElement>(null);

//   useEffect(() => {
//     const audioElement = audRef.current;

//     if (audioElement) {
//       const handleContextMenu = (e: Event) => e.preventDefault();
//       audioElement.src = src;
//       audioElement.addEventListener("contextmenu", handleContextMenu);

//       return () => {
//         audioElement.removeEventListener("contextmenu", handleContextMenu);
//       };
//     }
//   }, [audRef, src]);

//   return (
//     <AudComp poster={poster}>
//       <audio
//         loop
//         controls
//         src={src}
//         ref={audRef}
//         preload="auto"
//         data-setup="{}"
//         controlsList="nodownload"
//         className={clsx("w-full video-js", className)}
//         {...rest}
//       >
//         <SourceP src={src} lang={lang} />
//       </audio>
//     </AudComp>
//   );
// };

// export type { TAudioComp };
// export { AudioComp };
