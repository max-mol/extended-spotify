"use client";

import { GET_CURRENT_USER_PROFILE } from "./UserServiceResource";

export const getCurrentUserProfile = async (token: string) =>
  GET_CURRENT_USER_PROFILE(token);
