"use client";

import { useSnackbar } from "@/components/ui/SnackbarProvider";
import UserProfile from "@/components/user/UserProfile";
import { User } from "@/models/user/typing";
import { getCurrentUserProfile } from "@/services/UserService";
import { Box } from "@mui/material";
import { useEffect, useReducer, useRef } from "react";

type UserStateAction = {
  type: "updateUser";
  user: User;
};

type UserLocalState = {
  user?: User;
};

function userReducer(state: UserLocalState, action: UserStateAction) {
  if (action.type === "updateUser") {
    return {
      ...state,
      user: action.user,
    };
  }
  return state;
}

export default function Profile() {
  const { enqueueSnackbar } = useSnackbar();

  const token = localStorage.getItem("access_token") as string;

  const [userState, dispatchUserStateAction] = useReducer(userReducer, {});

  useEffect(() => {
    const handleGetUserProfile = async () => {
      try {
        const res = await getCurrentUserProfile(token);
        dispatchUserStateAction({ type: "updateUser", user: res.data });
      } catch (e) {
        enqueueSnackbar(
          "error",
          "An error has occured, can't reach user profile"
        );
      }
    };

    handleGetUserProfile();
  }, [token]);

  return (
    <Box m={3}>{userState.user && <UserProfile user={userState.user} />}</Box>
  );
}
