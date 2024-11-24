import {
  logout,
  selectAuthApp,
  selectAuthIsAuthenticated,
  selectAuthStatus,
  selectAuthUser,
} from "@features/auth/redux/slice";
import initLogger from "@lib/logging";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {useCallback, useMemo} from "react";

import AuthenticationManager from "@/features/auth/lib/authentication-manager";
import {ArticleTypeSlug, TMiqatRole} from "@/themes/miqat/config";

const logger = initLogger("HOOK", "useAuth");

const useAuth = () => {
  const dispatch = useAppDispatch();

  const authManager = useMemo(() => AuthenticationManager.getInstance(), []);

  const authStatus = useAppSelector(selectAuthStatus);
  const currentApp = useAppSelector(selectAuthApp);
  const currentUser:
    | (Omit<Levelup.CMS.V1.Users.Entity.ExposedUser, "role"> & {
        role: TMiqatRole;
      })
    | null = useAppSelector(selectAuthUser) as any;
  const permissions = useAppSelector(state => state.authentication.permissions);

  const isAuthenticated = useAppSelector(selectAuthIsAuthenticated);

  const hasPermission: (permissionName: string | string[]) => boolean =
    useCallback(
      permissionName => {
        if (!permissionName) return true;
        if (Array.isArray(permissionName) && permissionName.length === 0)
          return true;

        // logger.debug('hasPermission', permissionName, currentUser?.email);

        let perms: string[] = [];
        let permsObject: {[Name: string]: string} = {};
        if (typeof permissionName === "string") perms.push(permissionName);
        else
          for (const p of permissionName) {
            perms.push(p);
          }

        for (const p of permissions) {
          if (perms.includes(p.name)) permsObject[p.name] = p._id;
        }

        // logger.debug('hasPermission', {
        //   perms,
        //   permsObj,
        //   permissions,
        //   currentUserPermissions: currentUser?.permissions,
        // });

        let granted = false;
        if (!currentUser || currentUser === null) {
          /* empty */
        } else if (typeof permissionName === "string") {
          granted = currentUser.permissions.includes(
            permsObject[permissionName],
          );
        } else {
          // TODO manage multiple permissions

          // eslint-disable-next-line unicorn/no-array-reduce
          granted = permissionName.reduce(
            (previous: boolean, _permissionName: string) => {
              return (
                previous ||
                currentUser?.permissions?.includes(permsObject[_permissionName])
              );
            },
            false,
          );
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
      [currentUser, permissions],
    );

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    authManager,
    authStatus,
    currentApp,
    currentUser,
    isAuthenticated,
    hasPermission,
    logout: handleLogout,
  };
};

export default useAuth;
