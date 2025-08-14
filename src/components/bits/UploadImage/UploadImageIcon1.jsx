// import clsx from "clsx";
// import { CameraIcon } from "@heroicons/react/24/solid";

// type TUploadImageIcon1 = {
//   label?: string;
//   className?: string;
//   labelClassName?: string;
// };
// export const UploadImageIcon1 = ({
//   label,
//   className,
//   labelClassName,
// }: TUploadImageIcon1) => {
//   return (
//     <div
//       className={clsx(
//         "flex gap-2 bg-th-p-l items-center justify-center cursor-pointer",
//         `${Boolean(className) ? className : "w-full h-full flex-col"}`
//       )}
//     >
//       <CameraIcon className="w-1/2 h-1/2 max-w-[100px] max-h-[100px] text-th-p-m opacity-70" />
//       {label && (
//         <span
//           className={
//             Boolean(labelClassName)
//               ? labelClassName
//               : "text-xs px-3 text-justify text-th-p-m opacity-80"
//           }
//         >
//           {label}
//         </span>
//       )}
//     </div>
//   );
// };
