// "use client";
// import { useSelector } from "react-redux";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// import { TabScreenSize } from "../../_config/config";
// import { getScreenWidth } from "../../_store/settingsSlice/selectors";

// // import { getCurrPage } from "../getCurrPage";

// // const pStaticPage = ["/platform/own", "/platform/own"];

// export const useExtendHideMenu = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const params = new URLSearchParams(searchParams);

//   const screenWidth = useSelector(getScreenWidth);
//   // const currPage = getCurrPage(pathname);
//   const isTabScreen = screenWidth < TabScreenSize;

//   // console.log({ pathname, currPage });
//   // const alwaysFalse =
//   //   currPage.includes("/platform") && !pStaticPage.includes(currPage);
//   //   alwaysFalse
//   //   ? false
//   // :
//   const isExtend = isTabScreen
//     ? params.get("extend") === "true"
//     : params.get("extend") !== "false";

//   const handleExpandClick = () => {
//     const n = isExtend ? "false" : "true";
//     params.set("extend", n);
//     router.replace(`${pathname}?${params.toString()}`);
//   };
//   return {
//     isExtend,
//     handleExpandClick,
//   };
// };
