// import { PostLink } from "../link";
// import { GetApi } from "../api";

// const link = `${PostLink}/global-search?offset=0&limit=10&search_query=`;

// // http://52.68.1.178:3008/api/v1/en/post/global-search?offset=0&limit=10&type=user&search_query=c

// export const loadGlobalSearchOpts = async (v, cb) => {
//     try {
//         const p = { arg: { endpoint: "main" } };
//         const o = await GetApi(`${link}${v}`, p);
//         const a = o?.data?.rows;
//         cb?.(
//             a?.map((i) => ({
//                 label: i.email,
//                 extra: { ...i },
//                 value: `${i.id}`,
//             }))
//         );
//         return a;
//     } catch (error) {
//         console.error({ handleIndTypeLoadOptsErr: error });
//         cb?.([]);
//         return [];
//     }
// };
