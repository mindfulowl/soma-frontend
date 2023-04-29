import React, {
  createContext,
  SetStateAction,
  useState,
  Dispatch,
  useEffect,
} from "react";
import { Amplify, Auth } from "aws-amplify";
import axios from "axios";
import {
  IdTokenData,
  User,
} from "../../routes/authentication/types/types.auth";
import jwt_decode from "jwt-decode";

export const amplifyConfig = Amplify.configure({
  aws_cognito_region: process.env.REACT_APP_AWS_REGION,
  aws_user_pools_id: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
  aws_mandatory_sign_in: "enable",
  oauth: {
    domain: process.env.REACT_APP_COGNITO_DOMAIN,
    scope: ["email", "openid", "profile"],
    redirectSignIn: `${process.env.REACT_APP_FE_BASE_URL}/welcome`,
    redirectSignOut: `${process.env.REACT_APP_FE_BASE_URL}/sign-in`,
    responseType: "code",
  },
});

interface IUserContext {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<IUserContext>({
  currentUser: null,
  setCurrentUser: () => {},
});

export const UserProvider = (props: React.PropsWithChildren<{}>) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const getUserDatabaseInfo = async (cogId: string, token: string) => {
    const user = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/users/${cogId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return user.data;
  };

  useEffect(() => {
    const refreshUserDetailsForCurrentUser = async () => {
      try {
        const loggedInUser = await Auth.currentAuthenticatedUser();
        const idToken = loggedInUser.signInUserSession.idToken?.jwtToken;
        const tokenData = jwt_decode(idToken) as IdTokenData;

        const userDbInfo = await getUserDatabaseInfo(
          loggedInUser.username,
          loggedInUser.signInUserSession.idToken.jwtToken
        );

        setCurrentUser({
          email: tokenData.email,
          cognitoId: loggedInUser.username,
          idToken: idToken,
          firstName: userDbInfo?.firstName,
          lastName: userDbInfo?.lastName,
          postcode: userDbInfo?.postcode,
          hasCompletedRegistration: !!userDbInfo,
        });
      } catch (error) {
        console.log("error", error);
      }
    };

    refreshUserDetailsForCurrentUser();
  }, []);

  const value = { currentUser, setCurrentUser };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
