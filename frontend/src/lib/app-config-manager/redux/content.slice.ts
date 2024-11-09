import AppConfigManager from "@lib/app-config-manager";
import initLogger from "@lib/logging";
import { createAppSlice } from "@redux/create-app-slice";

const logger = initLogger("REDUX", "content");

type TStateStatus = "loading" | "idle" | "failed";
export interface SliceState {
  isLoaded: boolean;
  status: TStateStatus;
  lastUpdated?: string;
  articleTypes: Levelup.CMS.V1.Content.Entity.ArticleType[];
  states: {
    code: string;
    name: string;
  }[];
  cities: {
    state_code: string;
    code: string;
    name: string;
  }[];
}

export const initialState: SliceState = {
  status: "loading",
  isLoaded: false,
  articleTypes: [],
  states: [],
  cities: [],
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const slice = createAppSlice({
  name: "content",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    load: create.asyncThunk<Partial<SliceState>, boolean>(
      async (forceLoadFormServer = true): Promise<Partial<SliceState>> => {
        try {
          logger.event("load", "triggered");
          const manager = AppConfigManager.getInstance();
          const data = await manager.getContentData(forceLoadFormServer);
          logger.value("manager.getContentData.data", data);
          return data
            ? {
                ...data,
                lastUpdated: (data.lastUpdated || new Date()).toString(),
                isLoaded: true,
                status: "idle",
              }
            : { ...initialState, status: "failed" };
        } catch (error: any) {
          logger.error(error.message, error);
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
          state.articleTypes = payload.articleTypes || [];
          state.states = payload.states || [];
          state.cities = payload.cities || [];
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
    selectArticleTypes: state => state.articleTypes,
    selectStates: state => state.states,
    selectCities: state => state.cities,
    selectStateCities: (state, state_code: string) =>
      state.cities.filter(i => (i.state_code = state_code)),
  },
});

// Action creators are generated for each case reducer function.
export const { load: loadContentConfig } = slice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectStatus,
  selectCities,
  selectArticleTypes,
  selectStateCities,
  selectStates,
} = slice.selectors;
