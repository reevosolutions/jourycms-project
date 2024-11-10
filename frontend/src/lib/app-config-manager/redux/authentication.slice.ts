import AppConfigManager from "@lib/app-config-manager";
import initLogger from "@lib/logging";
import { createAppSlice } from "@redux/create-app-slice";

const logger = initLogger("REDUX", "authentication");

type TStateStatus = "loading" | "idle" | "failed";
export interface SliceState {
  isLoaded: boolean;
  status: TStateStatus;
  lastUpdated?: string;
  // eslint-disable-next-line no-undef
  roles: Levelup.CMS.V1.Auth.Entity.Role[];
  // eslint-disable-next-line no-undef
  permissions: Levelup.CMS.V1.Auth.Entity.Permission[];
}

export const initialState: SliceState = {
  status: "loading",
  isLoaded: false,
  roles: [],
  permissions: [],
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const slice = createAppSlice({
  name: "authentication",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    load: create.asyncThunk<Partial<SliceState>, boolean>(
      async (forceLoadFormServer = false): Promise<Partial<SliceState>> => {
        try {
          logger.event("load", "triggered");
          const manager = AppConfigManager.getInstance();
          const data = await manager.getAuthenticationData(forceLoadFormServer);
          logger.value("load", data?.roles?.length);
          return data
            ? {
                ...data,
                lastUpdated: (data.lastUpdated || new Date()).toString(),
                isLoaded: true,
                status: "idle",
              }
            : { ...initialState, status: "failed" };
        } catch {
          return {
            status: "failed",
          };
        }
      },
      {
        pending: state => {
          logger.debug("load", "pending", {
            ...state,
          });
          state.status = "loading";
        },
        fulfilled: (state, { payload }) => {
          logger.success("load", "fulfilled", {
            ...payload,
          });
          state.status = "idle";
          state.isLoaded = true;
          state.lastUpdated = (payload.lastUpdated || new Date()).toString();
          state.roles = payload.roles || [];
          state.permissions = payload.permissions || [];
        },
        rejected: state => {
          logger.error("load", "rejected", {
            state,
          });
          state.status = "failed";
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectStatus: state => state.status,
    selectRoles: state => state.roles,
    selectPermissions: state => state.permissions,
  },
});

// Action creators are generated for each case reducer function.
export const { load: loadAuthenticationConfig } = slice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectStatus, selectRoles, selectPermissions } = slice.selectors;
