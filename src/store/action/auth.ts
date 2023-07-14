import { getUserDataByUsernameApi, getUserProfileByUserIdApi } from "api/user";
import { parseTokenToUserId, parseTokenToUsername } from "util/user";



export const fetchUserData = async (token: string) => {

    if (!token) return;
    const [username, userId] = [
        parseTokenToUsername(token),
        parseTokenToUserId(token),
    ];


    const [userDatabyUsername, getUserProfileByUserId]: any = await Promise.all([
        getUserDataByUsernameApi(username),
        getUserProfileByUserIdApi(userId),
    ]);

    const { user_keycloak, user_db } = userDatabyUsername['data'];
    const {
        id,
        username: dbUsername,
        firstName,
        lastName,
        email,
        gender,
        city,
        address,
        dob,
        status,
        avatar
    } = user_db;
    const {
        id: keycloakId,
        username: keycloakUsername,
        firstName: keycloakFirstName,
        lastName: keycloakLastName,
        email: keycloakEmail,
    } = user_keycloak;
    const {
        favorite = 0,
        playlist = 0,
        following = 0,
        publicPlaylist = [],
        followingArtist = [],
        lastestSub = {},
    } = getUserProfileByUserId['data'];

    return {
        id: id || keycloakId,
        username: dbUsername || keycloakUsername,
        firstName: firstName || keycloakFirstName,
        lastName: lastName || keycloakLastName,
        email: email || keycloakEmail,
        gender: gender || "",
        city: city || "",
        address: address || "",
        dob: dob || "",
        status: status || "",
        created_at: id || "",
        avatar: avatar || {},
        favorite,
        playlist,
        following,
        publicPlaylist,
        followingArtist,
        lastestSub,
    };
};
