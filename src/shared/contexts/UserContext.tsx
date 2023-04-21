import React, {
  createContext,
  SetStateAction,
  useState,
  Dispatch,
  useEffect,
} from "react";
import { Amplify, Auth } from "aws-amplify";
import axios from "axios";

export const amplifyConfig = Amplify.configure({
  aws_cognito_region: process.env.REACT_APP_AWS_REGION,
  aws_user_pools_id: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
  aws_mandatory_sign_in: "enable",
});

type CurrentUser = {
  email: string;
  sub?: string;
  firstName?: string;
  lastName?: string;
  postCode?: string;
  token?: string;
};

interface IUserContext {
  currentUser: CurrentUser | null;
  setCurrentUser: Dispatch<SetStateAction<CurrentUser | null>>;
}

export const UserContext = createContext<IUserContext>({
  currentUser: null,
  setCurrentUser: () => {},
});

export const UserProvider = (props: React.PropsWithChildren<{}>) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>({
    email: "",
    sub: "",
  });

  const getUserDatabaseInfo = async (cogId: string, token: string) => {
    const user = await axios.get(
      `http://ec2-13-40-183-104.eu-west-2.compute.amazonaws.com/users/${cogId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return user.data;
  };

  const getCurrentUser = async () => {
    try {
      const loggedInUser = await Auth.currentAuthenticatedUser();

      const userDbInfo = await getUserDatabaseInfo(
        loggedInUser.attributes.sub,
        loggedInUser.signInUserSession.idToken.jwtToken
      );

      setCurrentUser({
        email: loggedInUser.attributes.email,
        sub: loggedInUser.attributes.sub,
        token: loggedInUser.signInUserSession.idToken?.jwtToken,
        firstName: userDbInfo.firstName,
        lastName: userDbInfo.lastName,
        postCode: userDbInfo.postcode,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    getCurrentUser();
  }, [currentUser?.email]);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
