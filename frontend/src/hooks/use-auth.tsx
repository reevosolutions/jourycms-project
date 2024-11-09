import AuthenticationManager from "@/features/auth/lib/authentication-manager";
import {
  logout,
  selectAuthApp,
  selectAuthIsAuthenticated,
  selectAuthUser,
} from "@features/auth/redux/slice";
import initLogger from "@lib/logging";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useCallback, useMemo } from "react";

const logger = initLogger("HOOK", "useAuth");

const useAuth = () => {
  const dispatch = useAppDispatch();

  const authManager = useMemo(() => AuthenticationManager.getInstance(), []);

  const currentApp = useAppSelector(selectAuthApp);
  const currentUser = useAppSelector(selectAuthUser);
  const permissions = useAppSelector((state) => state.authentication.permissions);

  const isAuthenticated = useAppSelector(selectAuthIsAuthenticated);

  const hasPermission: (permissionName: string | string[]) => boolean = useCallback(
    (permissionName) => {
      if (!permissionName) return true;
      if (permissionName instanceof Array && permissionName.length === 0) return true;

      // logger.debug('hasPermission', permissionName, currentUser?.email);

      let perms: string[] = [];
      let permsObj: { [Name: string]: string } = {};
      if (typeof permissionName === "string") perms.push(permissionName);
      else
        permissionName.forEach((p) => {
          perms.push(p);
        });

      permissions.forEach((p) => {
        if (perms.indexOf(p.name) > -1) permsObj[p.name] = p._id;
      });

      // logger.debug('hasPermission', {
      //   perms,
      //   permsObj,
      //   permissions,
      //   currentUserPermissions: currentUser?.permissions,
      // });

      let granted = false;
      if (!currentUser || currentUser === null) {
      } else if (typeof permissionName === "string") {
        granted = currentUser.permissions.indexOf(permsObj[permissionName]) > -1;
      } else {
        // TODO manage multiple permissions

        granted = permissionName.reduce((prev: boolean, _permissionName: string) => {
          return prev || currentUser?.permissions?.includes(permsObj[_permissionName]);
        }, false);
        // return permissionName.reduce((prev: boolean, _permissionName: string) => {
        // 	return userAndLoadedState.user && userAndLoadedState.user !== null ?
        // 		 prev && userAndLoadedState.user.permissions.includes(
        // 					permsObj[_permissionName]
        // 				) : false;
        // }, true);
      }
      // logger.debug("hasPermission", 'current user is', {
      // 	user: currentUser ? buildUserFullName(currentUser.profile) : null,
      // 	permissionName: typeof permissionName === "string" ? permissionName : permissionName?.join(', '),
      // 	granted
      // });
      return granted;
    },
    [currentUser, permissions]
  );



  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    authManager,
    currentApp,
    currentUser,
    isAuthenticated,
    hasPermission,
    logout: handleLogout,
  };
};

export default useAuth;
