import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY_STORAGE } from "core/constants";
import { DecodedToken } from "core/interface/models";
import jwtDecode from "jwt-decode";


export const removeTokenFromStorage = () => {
    AsyncStorage.removeItem(USER_KEY_STORAGE);
};

export const parseTokenToUserId = (token: string) => {
    let token_decoded = jwtDecode(token) as DecodedToken;
    return token_decoded["sub"];
};

export const parseTokenToRole = (token: any) => {
    let token_decoded = jwtDecode(token) as DecodedToken;
    const resource_access = token_decoded["resource_access"];
    const med_app = resource_access["med-app"];
    const roles = med_app["roles"];
    const current_role = roles.find((item: any) => item === "admin");
    return current_role;
};

export const parseTokenToUsername = (token: string) => {
    let token_decoded = jwtDecode(token) as DecodedToken;
    return token_decoded["preferred_username"];
};
