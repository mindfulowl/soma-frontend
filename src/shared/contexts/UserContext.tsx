import React, {
  createContext,
  SetStateAction,
  useState,
  Dispatch,
  useEffect,
} from "react";
import { Amplify, Auth } from "aws-amplify";
import axios from "axios";
import { User } from "../../routes/authentication/types/types.auth";

export const amplifyConfig = Amplify.configure({
  aws_cognito_region: process.env.REACT_APP_AWS_REGION,
  aws_user_pools_id: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
  aws_mandatory_sign_in: "enable",
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

  const refreshUserDetailsForCurrentUser = async () => {
    try {
      const loggedInUser = await Auth.currentAuthenticatedUser();

      const userDbInfo = await getUserDatabaseInfo(
        loggedInUser.attributes.sub,
        loggedInUser.signInUserSession.idToken.jwtToken
      );

      setCurrentUser({
        email: loggedInUser.attributes.email,
        cognitoId: loggedInUser.attributes.sub,
        idToken: loggedInUser.signInUserSession.idToken?.jwtToken,
        firstName: userDbInfo.firstName,
        lastName: userDbInfo.lastName,
        postcode: userDbInfo.postcode,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    refreshUserDetailsForCurrentUser();
  }, [currentUser?.email]);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
