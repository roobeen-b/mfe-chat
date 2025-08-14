// "use client";
// import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// import { TUserCookie } from "../api/_interface";
// import { MainSiteLink } from "../api/utils";
// import { removeCookie, extractFromCookies, setItemLocal } from ".";

// const getUser = (): TUserCookie => extractFromCookies("user");

// const getUserImage = (user: TUserCookie): string | undefined => {
//   return user
//     ? user.image || user.contact_person_image || user.logo || user.cover_image
//     : "";
// };

// const getUserName = (user: TUserCookie): string | undefined => {
//   return user
//     ? user.contact_name ||
//         user.company_name ||
//         user.contact_name_katakana ||
//         user.company_name_katakana ||
//         user.username
//     : "";
// };

// const getPhone = (phone: string | number = "", country_code: string = "") => {
//   if (country_code) {
//     if (`${country_code}`.includes("+")) return `${country_code}${phone}`;
//     else return `+${country_code}${phone}`;
//   }
//   return phone || "-";
// };

// const checkCanCreatePlatformAndRedirect = async () => {
//   const extras = extractFromCookies("extra");
//   if (extras.create_platform) {
//     window.open(MainSiteLink(`app/my-platform/create?for=ask`));
//     return true;
//   } else {
//     return false;
//     // SnackBar({ message: "you_do_not_have_permission" }, "error");
//   }
// };

// const userLogout = (router: AppRouterInstance) => {
//   removeCookie("user");
//   removeCookie("token");
//   removeCookie("extra");
//   if (router) router.replace("/app");
//   setItemLocal("skysales-login", "false");
// };

// const getIsLoggedIn = () => Boolean(extractFromCookies("token")?.access_token);

// export {
//   getUser,
//   getPhone,
//   userLogout,
//   getUserName,
//   getUserImage,
//   getIsLoggedIn,
//   checkCanCreatePlatformAndRedirect,
// };
