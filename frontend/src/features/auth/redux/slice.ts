import initLogger from "@lib/logging";
import { createAppSlice } from "@redux/create-app-slice";

import AuthenticationManager from "@/features/auth/lib/authentication-manager";

const logger = initLogger("REDUX", "auth");

type TAuthStateStatus = "loading" | "idle" | "failed";
export interface AuthSliceState {
  isAuthenticated: boolean;
  user: Levelup.CMS.V1.Users.Entity.ExposedUser | null;
  app: Levelup.CMS.V1.System.Entity.App | null;
  status: TAuthStateStatus;
}

export const initialState: AuthSliceState = {
  isAuthenticated: false,
  user: null,
  app: null,
  status: "loading",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const authSlice = createAppSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    loadAuthData: create.asyncThunk(
      async (argument1: void) => {
        try {
          logger.event("loadAuthData", "triggered");
          const authManager = AuthenticationManager.getInstance();
          const data = await authManager.getAuthData();
          logger.debug("_authenticate", "isAuthenticated: ", !!data.user);
          return { ...data, isAuthenticated: !!data.user, status: "idle" };
        } catch {
          return {
            isAuthenticated: false,
            user: null,
            app: null,
            status: "failed",
          };
        }
      },
      {
        pending: state => {
          logger.debug("loadAuthData", "pending", {
            ...state,
          });
          state.status = "loading";
        },
        fulfilled: (state, { payload }) => {
          logger.success("loadAuthData", "fulfilled", {
            ...payload,
          });
          state.status = "idle";
          state.isAuthenticated = payload.isAuthenticated;
          state.user = payload.user;
          state.app = payload.app;
        },
        rejected: state => {
          logger.error("loadAuthData", "rejected", {
            state,
          });
          state.status = "failed";
        },
      },
    ),
    authenticate: create.asyncThunk(
      async (
        data: Levelup.CMS.V1.Utils.NonUndefined<
          Levelup.CMS.V1.Auth.Api.Auth.Signin.Response["data"]
        >,
      ) => {
        try {
          logger.event("_authenticate", "triggered", data);
          const authManager = AuthenticationManager.getInstance();
          const result = await authManager.authenticate(data);
          logger.value("authManager._authenticate", "result", result);
          return {
            ...result,
            isAuthenticated: !!result.user,
            status: "idle" as TAuthStateStatus,
          };
        } catch (error) {
          logger.error("_authenticate", "rejected logging out", error);
          return {
            isAuthenticated: false,
            user: null,
            app: null,
            status: "failed" as TAuthStateStatus,
          };
        }
      },
      {
        pending: state => {
          state.status = "loading";
        },
        fulfilled: (state, { payload }) => {
          logger.success("_authenticate", "fulfilled", {
            ...payload,
          });
          state.status = payload.status;
          state.isAuthenticated = payload.isAuthenticated;
          state.user = payload.user;
          state.app = payload.app;
        },
        rejected: state => {
          state.status = "failed";
        },
      },
    ),
    logout: create.asyncThunk(
      async (argument: void) => {
        try {
          const authManager = AuthenticationManager.getInstance();
          await authManager.logout();
          return {
            isAuthenticated: false,
            user: null,
            app: null,
            status: "idle" as TAuthStateStatus,
          };
        } catch {
          return {
            isAuthenticated: false,
            user: null,
            app: null,
            status: "failed" as TAuthStateStatus,
          };
        }
      },
      {
        pending: state => {
          state.status = "loading";
        },
        fulfilled: (state, { payload }) => {
          state.status = payload.status;
          state.isAuthenticated = payload.isAuthenticated;
          state.user = payload.user;
          state.app = payload.app;
        },
        rejected: state => {
          state.status = "failed";
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectAuthStatus: state => state.status,
    selectAuthIsAuthenticated: state => state.isAuthenticated,
    selectAuthUser: state => state.user,
    selectAuthApp: state => state.app,
  },
});

// Action creators are generated for each case reducer function.
export const { loadAuthData, authenticate, logout } = authSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectAuthStatus,
  selectAuthIsAuthenticated,
  selectAuthUser,
  selectAuthApp,
} = authSlice.selectors;

