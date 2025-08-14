// "use client";
// import { useEffect } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// type TUseTab = {
//   val: string;
//   list: { [x: string]: string };
// };

// type RTUseTab = {
//   activeTab: string;
//   getActiveTab: () => string;
//   onTabChange: (i: string) => void;
// };
// export const useTabRoute = ({ val, list }: TUseTab): RTUseTab => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const params = new URLSearchParams(searchParams);

//   const getActiveTab = () => {
//     const pathArr = pathname.split("/");
//     const searchArr = pathArr[pathArr.length - 1].split("?");
//     const tabVal = searchArr[0];
//     return tabVal;
//   };

//   const isValidTabVal = (v: string) => Object.keys(list).includes(v);

//   const changeUrl = (t: string) => {
//     const tabVal = getActiveTab();
//     const activeTab = isValidTabVal(tabVal) ? tabVal : val;
//     if (t === activeTab && activeTab === tabVal) return;
//     const url = `${pathname}?${params.toString()}`.replace(tabVal, t);
//     router.replace(url);
//   };

//   useEffect(() => {
//     console.info({
//       getActiveTab: getActiveTab(),
//       isValidTabVal: isValidTabVal(getActiveTab()),
//     });
//     if (!isValidTabVal(getActiveTab())) {
//       changeUrl(val);
//     }
//   }, []);

//   const onTabChange = (t: string) => {
//     changeUrl(t);
//   };

//   return {
//     onTabChange,
//     getActiveTab,
//     activeTab: getActiveTab() || val,
//   };
// };
