import JouryCMSSdk, {
  initSdk,
  LevelupClientAppApiCallHeaders,
} from "jourycms-sdk";
import config from "@config/index";
import AuthenticationManager from "@/features/auth/lib/authentication-manager";

export const useSdk = (id: string = "DEFAULT") => {
  return initSdkForLevelupClientApp(id);
};

export async function levelupApiCallHeadersInjector(): Promise<LevelupClientAppApiCallHeaders> {
  const authManager = AuthenticationManager.getInstance();
  const authData = await authManager.getAuthData();
  if (!authData) return {};

  const headers: { [key: string]: string } = {};

  const token = await authManager.loadAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // if (authData.app && authData.app._id === authData.user?.app) {
  //   headers["X-App-Id"] = authData.app._id;
  // }

  return headers;
}

export async function refreshTokenHandler(
  sdk: Levelup.CMS.V1.SDK.ISdk,
): Promise<void> {
  const authManager = AuthenticationManager.getInstance();
  const authData = await authManager.getAuthData();
  const refreshToken = await authManager.loadRefreshToken();
  if (!authData || !refreshToken) return;

  const response = await (sdk as JouryCMSSdk).auth.auth.refreshToken({
    data: { refresh_token: refreshToken },
  });

  if (!response.data.token) {
    await authManager.logout();
    return;
  }

  authManager.authenticate(response.data);
}

export function initSdkForLevelupClientApp(id: string = "DEFAULT") {
  return initSdk(
    "frontend",
    {
      ...config.sdk,
      headersInjector: levelupApiCallHeadersInjector,
      refreshTokenHandler: refreshTokenHandler,
    },
    id,
  );
}
