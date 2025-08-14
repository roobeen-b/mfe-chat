// import {
//   Box,
//   Radio,
//   InputLabel,
//   RadioGroup,
//   FormControl,
//   type SelectProps,
//   type TextFieldProps,
//   FormControlLabel,
//   type CheckboxProps,
//   type RadioGroupProps,
// } from "@mui/material";
// import type { MouseEventHandler } from "react";
// import { useIntl } from "react-intl";
// import { Control, Controller, FieldErrors } from "react-hook-form";

// // import { TQuillEditor } from "./WYSIWYG/QuillEditor";
// import { FormFieldType } from "@utils/enum/formFieldType";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// import { Checkbox } from "./Checkbox";
// import { InputField } from "./InputField";
// import { SelectField } from "./SelectField";
// import Warning from "@components/_icons/Warning";
// // import { QuillEditorField } from "./WYSIWYG/QuillEditorField";

// type CustomFormFieldProps = {
//   rules?: any;
//   name: string;
//   label?: string;
//   required?: boolean;
//   fullWidth?: boolean;
//   placeholder?: string;
//   control: Control<any>;
//   showInfoIcon?: boolean;
//   showPassword?: boolean;
//   fieldType: FormFieldType;
//   // quillProps?: TQuillEditor;
//   setShowPassword?: (value: boolean) => void;
//   selectOptions?: { value: any; label: string }[];
//   renderSkeleton?: (field: any) => React.ReactNode;
//   setShowInfoModal?: MouseEventHandler<HTMLSpanElement>;
// } & Partial<TextFieldProps> &
//   Partial<SelectProps> &
//   Partial<CheckboxProps> &
//   Partial<RadioGroupProps>;

// export const getNestedError = (errors: any, name: string) => {
//   const keys = name.split(".");
//   let error = errors;

//   for (const key of keys) {
//     if (error && error[key]) {
//       error = error[key];
//     } else {
//       return undefined;
//     }
//   }

//   return error;
// };

// const COUNTRY_CODES = [
//   {
//     value: "+81",
//     label: "+81",
//   },
// ];

// const RenderField = ({
//   field,
//   props,
//   errors,
// }: {
//   field: any;
//   errors?: FieldErrors<any>;
//   props: CustomFormFieldProps;
// }) => {
//   const {
//     name,
//     label,
//     fieldType,
//     // quillProps,
//     placeholder,
//     showPassword,
//     renderSkeleton,
//     setShowPassword,
//     fullWidth = true,
//     selectOptions = [{ value: "", label: "" }],
//     ...rest
//   } = props;

//   switch (fieldType) {
//     case FormFieldType.INPUT:
//       return (
//         <div>
//           <FormControl fullWidth={fullWidth}>
//             <InputField
//               type="text"
//               size="small"
//               inputRef={field.ref}
//               fullWidth={fullWidth}
//               onBlur={field.onBlur}
//               value={field.value || ""}
//               onChange={field.onChange}
//               placeholder={placeholder}
//               error={!!getNestedError(errors, name)}
//               helperText={getNestedError(errors, name)?.message || ""}
//               {...rest}
//             />
//           </FormControl>
//         </div>
//       );

//     case FormFieldType.PASSWORD:
//       return (
//         <div>
//           <FormControl fullWidth={fullWidth}>
//             <InputField
//               size="small"
//               inputRef={field.ref}
//               fullWidth={fullWidth}
//               onBlur={field.onBlur}
//               value={field.value || ""}
//               placeholder={placeholder}
//               onChange={field.onChange}
//               error={!!getNestedError(errors, name)}
//               type={showPassword ? "text" : "password"}
//               helperText={getNestedError(errors, name)?.message || ""}
//               endAdornment={
//                 <span
//                   onClick={(e) => e.preventDefault()}
//                   onMouseUp={() => setShowPassword && setShowPassword(false)}
//                   onMouseDown={() => setShowPassword && setShowPassword(true)}
//                 >
//                   {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
//                 </span>
//               }
//               {...rest}
//             />
//           </FormControl>
//         </div>
//       );

//     case FormFieldType.NUMBER:
//       return (
//         <FormControl fullWidth={fullWidth}>
//           <InputField
//             size="small"
//             type="number"
//             inputRef={field.ref}
//             fullWidth={fullWidth}
//             onBlur={field.onBlur}
//             value={field.value || ""}
//             placeholder={placeholder}
//             onChange={field.onChange}
//             error={!!getNestedError(errors, name)}
//             helperText={getNestedError(errors, name)?.message || ""}
//             {...rest}
//           />
//         </FormControl>
//       );

//     case FormFieldType.PHONE:
//       return (
//         <FormControl fullWidth={fullWidth}>
//           <InputField
//             size="small"
//             type="number"
//             inputRef={field.ref}
//             fullWidth={fullWidth}
//             onBlur={field.onBlur}
//             value={field.value || ""}
//             placeholder={placeholder}
//             onChange={field.onChange}
//             error={!!getNestedError(errors, name)}
//             helperText={getNestedError(errors, name)?.message || ""}
//             startAdornment={
//               <SelectField
//                 disabled
//                 size="small"
//                 value={"+81"}
//                 disableUnderline
//                 variant="standard"
//                 inputRef={field.ref}
//                 fullWidth={fullWidth}
//                 options={COUNTRY_CODES}
//                 onChange={field.onChange}
//               />
//             }
//             {...rest}
//           />
//         </FormControl>
//       );

//     case FormFieldType.SELECT:
//       return (
//         <SelectField
//           size="small"
//           variant="outlined"
//           value={field.value}
//           inputRef={field.ref}
//           fullWidth={fullWidth}
//           onBlur={field.onBlur}
//           options={selectOptions!}
//           onChange={field.onChange}
//           error={!!getNestedError(errors, name)}
//           {...rest}
//         />
//       );
//     // case FormFieldType.TEXTAREA:
//     //   return (
//     //     <div>
//     //       <QuillEditorField
//     //         id="message"
//     //         className="form-field"
//     //         placeholder={placeholder}
//     //         inputClassName="form-field-quill"
//     //         error={!!getNestedError(errors, name)}
//     //         quillProps={{ ...field, hideToolbar: true, ...quillProps }}
//     //         helperText={getNestedError(errors, name)?.message || ""}
//     //       />
//     //     </div>
//     //   );

//     case FormFieldType.CHECKBOX:
//       return (
//         <FormControl>
//           <div>
//             <Checkbox
//               id={name}
//               name={name}
//               slotProps={{
//                 input: {
//                   ref: field.ref,
//                 },
//               }}
//               checked={field.value}
//               onBlur={field.onBlur}
//               onChange={field.onChange}
//               {...rest}
//             />
//             <label htmlFor={name} className="checkbox-label">
//               {label}
//             </label>
//           </div>
//         </FormControl>
//       );

//     case FormFieldType.SKELETON:
//       return renderSkeleton ? renderSkeleton(field) : null;

//     case FormFieldType.DATEPICKER:
//       return (
//         <FormControl fullWidth={fullWidth}>
//           <InputField
//             type="date"
//             size="small"
//             inputRef={field.ref}
//             fullWidth={fullWidth}
//             onBlur={field.onBlur}
//             value={field.value || ""}
//             onChange={field.onChange}
//             placeholder={placeholder}
//             error={!!getNestedError(errors, name)}
//             helperText={getNestedError(errors, name)?.message || ""}
//             {...rest}
//           />
//         </FormControl>
//       );

//     case FormFieldType.TIMEPICKER:
//       return (
//         <FormControl fullWidth={fullWidth}>
//           <InputField
//             type="time"
//             size="small"
//             inputRef={field.ref}
//             fullWidth={fullWidth}
//             onBlur={field.onBlur}
//             value={field.value || ""}
//             onChange={field.onChange}
//             placeholder={placeholder}
//             error={!!getNestedError(errors, name)}
//             helperText={getNestedError(errors, name)?.message || ""}
//             {...rest}
//           />
//         </FormControl>
//       );

//     case FormFieldType.RADIO:
//       return (
//         <FormControl>
//           <RadioGroup
//             onBlur={field.onBlur}
//             value={field.value || ""}
//             onChange={field.onChange}
//             aria-labelledby="radio-buttons-group"
//             {...rest}
//           >
//             {selectOptions &&
//               selectOptions.map((item) => (
//                 <FormControlLabel
//                   key={item?.value}
//                   value={item?.value}
//                   label={item?.label}
//                   control={<Radio slotProps={{ input: { ref: field.ref } }} />}
//                 />
//               ))}
//           </RadioGroup>
//         </FormControl>
//       );

//     default:
//       break;
//   }
// };

// const CustomFormField = (props: CustomFormFieldProps) => {
//   const t = useTranslations("HookForm");
//   const {
//     sx,
//     name,
//     label,
//     rules,
//     control,
//     fieldType,
//     setShowInfoModal,
//     required = false,
//     showInfoIcon = false,
//   } = props;

//   return (
//     <Box
//     // sx={{
//     //   marginBottom: `${
//     //     fieldType !== FormFieldType.CHECKBOX ? "1rem" : "0.5rem"
//     //   }`,
//     // }}
//     >
//       <Controller
//         name={name}
//         control={control}
//         rules={{
//           required: {
//             value: required,
//             message: t("required"),
//           },
//           ...rules,
//         }}
//         render={({ field, formState: { errors } }) => (
//           <div>
//             {fieldType !== FormFieldType.CHECKBOX && label && (
//               <InputLabel
//                 required={required}
//                 sx={{
//                   color: "text.primary",
//                   fontSize: "0.9rem",
//                   lineHeight: "1.3rem",
//                   position: "relative",
//                   ...sx,
//                 }}
//               >
//                 {label}{" "}
//                 {showInfoIcon && (
//                   <Box
//                     component="span"
//                     aria-label="button"
//                     sx={{
//                       cursor: "pointer",
//                       marginLeft: "1rem",
//                       position: "absolute",
//                     }}
//                     onClick={setShowInfoModal}
//                   >
//                     <Warning />
//                   </Box>
//                 )}
//               </InputLabel>
//             )}
//             <RenderField field={field} props={props} errors={errors} />
//           </div>
//         )}
//       />
//     </Box>
//   );
// };

// export default CustomFormField;
