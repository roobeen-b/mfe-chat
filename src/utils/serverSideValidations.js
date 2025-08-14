// import { cookies } from "next/headers";
// import { DEFAULT_LOCALE } from "@/config/config";
// import { redirect } from "@translations/routing";

// const validateToken = async () => {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token");
//   const locale = cookieStore.get("NEXT_LOCALE")?.value || DEFAULT_LOCALE;

//   if (token) return "";

//   redirect({ href: "/app", locale });
// };

// const redirectIfToken = async () => {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token");
//   const locale = cookieStore.get("NEXT_LOCALE")?.value || DEFAULT_LOCALE;

//   if (token) redirect({ locale, href: "/" });
// };
// export { validateToken, redirectIfToken };
