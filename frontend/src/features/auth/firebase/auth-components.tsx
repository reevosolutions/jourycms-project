import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useCallback } from "react";
import FirebaseManager from "@lib/firebase-manager";
import initLogger, { LoggerContext } from "@lib/logging";
const logger = initLogger(LoggerContext.COMPONENT, "firebase-auth");

export const FirebaseGoogleAuthButton: React.FC<{}> = () => {
  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const handleGoogleSignIn = useCallback(async () => {
    const firebaseManager = FirebaseManager.getInstance();
    const auth = getAuth();

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(result => {
        logger.success("Google sign in success", result);

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch(error => {
        logger.error("Google sign in error", error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return <button onClick={handleGoogleSignIn}>Sign in with Google</button>;
};

export const FirebaseLogoutButton: React.FC<{}> = () => {
  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const handleSignout = useCallback(async () => {
    const firebaseManager = FirebaseManager.getInstance();
    const { auth } = firebaseManager.initializeFirebase();
    await auth.signOut();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return <button onClick={handleSignout}>Sign out</button>;
};
