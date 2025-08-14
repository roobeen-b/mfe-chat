// import { useState } from "react";
// import { useIntl } from "react-intl";

// import { UploadImage } from ".";
// import { TCusFileType } from "../../../utils";
// import { UploadImageIcon2 } from "./UploadImageIcon2";

// type TAttachFiles = {
//   className?: string;
//   type?: TCusFileType;
//   dClassName?: string;
//   helperText?: string;
//   val: (File | string)[];
//   onChange: (v: File[]) => void;
// };

// export const AttachFiles = ({
//   val,
//   type,
//   onChange,
//   className,
//   dClassName,
//   helperText,
// }: TAttachFiles) => {
//   const t = useTranslations("DropZone");

//   const [uploading, setUploading] = useState(false);
//   const dCN = dClassName ? dClassName : "w-32 h-32 overflow-hidden";

//   return (
//     <UploadImage
//       className={className}
//       helperText={helperText}
//       hasError={Boolean(helperText)}
//       dropZoneProps={{
//         val,
//         type,
//         onChange,
//         uploading,
//         maxFile: 5,
//         setUploading,
//         className: dCN,
//       }}
//     >
//       <div className={"w-full p-2 border border-th-p-m bg-slate-200"}>
//         <UploadImageIcon2 label={t("click_or_drag")} />
//       </div>
//     </UploadImage>
//   );
// };
