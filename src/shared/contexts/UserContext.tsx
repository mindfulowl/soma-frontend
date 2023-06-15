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
  aws_cognito_region: "eu-west-2",
  aws_user_pools_id: "eu-west-2_siv7j3Ap4",
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

  const getUserDatabaseInfo = async (email: string, token: string) => {
    const user = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/users/${email}`,
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
          tokenData.email,
          loggedInUser.signInUserSession.idToken.jwtToken
        );

        setCurrentUser({
          email: tokenData.email,
          idToken: idToken,
          firstName: userDbInfo?.firstName,
          lastName: userDbInfo?.lastName,
          postcode: userDbInfo?.postcode,
          id: userDbInfo?.id,
          hasCompletedRegistration: !!userDbInfo,
          isMember: !!userDbInfo,
        });
      } catch (error) {
        console.log("error", error);
      }
    };

    refreshUserDetailsForCurrentUser();
  }, [currentUser?.email, currentUser?.hasCompletedRegistration]);

  const value = { currentUser, setCurrentUser };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
