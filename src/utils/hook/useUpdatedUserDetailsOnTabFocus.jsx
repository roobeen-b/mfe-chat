// import { type TUserCookie } from "../../api/interface";
// import { getUser } from "../userHelper";
// import { useEffect, useState } from "react";

// export const useUpdatedUserDetailsOnTabFocus = () => {
//   const [user, setUser] = useState<null | TUserCookie>(getUser() || null);

//   useEffect(() => {
//     const handleOnFocus = () => {
//       const updatedUser = getUser();
//       setUser(updatedUser);
//     };

//     window.addEventListener("focus", handleOnFocus);
//     return () => window.removeEventListener("focus", handleOnFocus);
//   }, []);

//   return user;
// };
