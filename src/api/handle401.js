import { getEndPoint } from "./endpoint";
import { reduxStore } from "@store/store";
import { setToken } from "@store/authSlice";
import { setCookie } from "@utils/storageHelpers";
import { extractFromCookies } from "@utils/stringHelpers";
import { isDev } from "@utils/myFunc";

let refreshPromise = null;

const refreshAccessToken = async (rt, headers) => {
  const tokens = extractFromCookies("token");
  const link = getEndPoint("common") + "/en/refresh";
  const body = JSON.stringify({ refresh_token: rt?.split("Bearer ")[1] });

  const response = await fetch(link, { body, headers, method: "POST" });

  if (!response.ok) {
    // handlelogout
    throw new Error("Failed to refresh access token");
  }

  const responseJson = await response.json();
  const { access_token, refresh_token, token_type } = responseJson;
  const token = {
    id_token: tokens?.id_token,
    access_token: `${token_type} ${access_token}`,
    refresh_token: `${token_type} ${refresh_token}`,
  };

  console.log({ token });

  setCookie("token", JSON.stringify(token));
  reduxStore.dispatch(setToken(token));

  return token?.access_token;
};

const handle401AndRetry = async (url, reqInit, reqHeaders) => {
  const headers = new Headers({ ...reqHeaders });
  const tokens = extractFromCookies("token");
  let latestAccessToken = "";

  if (!refreshPromise) {
    const refreshTok = tokens?.refresh_token;
    if (!refreshTok) throw new Error("No refresh token available.");
    headers.set("Content-Type", "application/json");

    refreshPromise = refreshAccessToken(refreshTok, headers)
      .then((v) => {
        if (isDev) console.info({ "latestAccessToken------->": v });
        latestAccessToken = v;
      })
      .catch((e) => {
        console.error({ handle401AndRetryErr: e });
      })
      .finally(() => {
        console.info({ finally: "refreshAccessToken--finally" });
        refreshPromise = null;
        return null;
      });
  }

  await refreshPromise;

  const accessToken =
    latestAccessToken || extractFromCookies("token")?.access_token;

  if (isDev) console.log({ accessToken });
  if (accessToken) {
    headers.set("Authorization", accessToken);
    console.info(
      "[handle401AndRetry] --- Retrying request with new access token:"
    );
  } else {
    console.warn(
      "[handle401AndRetry] --- No access token found after refresh."
    );
  }

  const retryReqInit = { ...reqInit, headers };

  console.info("------------- Waiting for refresh to finish -----------");
  console.info("[RETRY] Headers before fetch:", headers.get("Content-Type"));

  const retryRes = await fetch(url, retryReqInit);
  console.info("-------------retryRes end------------");

  return handleResponse(retryRes);
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorMessage = await response.text();
    console.error({ handleResponse: errorMessage });
    throw new Error(errorMessage);
  }

  return await response.json();
};

export { handleResponse, handle401AndRetry };
