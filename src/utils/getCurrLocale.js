// "use server";
// import { cookies, headers } from "next/headers";

// import { getCurrPage } from "./getCurrPage";
// import { DEFAULT_LOCALE } from "../config/config";

// const getCurrLocale = async (): Promise<string> => {
//   const cookieStore = await cookies();
//   return cookieStore.get("NEXT_LOCALE")?.value || DEFAULT_LOCALE;
// };

// // regex to capture content inside the pair of angle brackets
// const regex = /<([^>]+)>/g;
// const getCurrPageFromHeader = async (): Promise<string> => {
//   const headersList = await headers();
//   const link = headersList.get("link") || "";
//   const referer = headersList.get("referer") || "";
//   //  find all matches in the input string
//   const match = link.match(regex);

//   let l = referer;
//   // select second and Remove the angle brackets from the matched string
//   if (match && match[1]) l = match[1]?.slice(1, -1);
//   const page = `"${getCurrPage(l)}"`;

//   return page;
// };

// export { getCurrLocale, getCurrPageFromHeader };
