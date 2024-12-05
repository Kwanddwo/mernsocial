import apiUser from "./api-user";
import authHelper from "../auth/auth-helper";
import { redirect } from "react-router";

async function usersLoader() {
    const controller = new AbortController();
    const users = await apiUser.list(controller.signal);
    users.forEach(user => {
        user.photoUrl = `/api/users/photo/${user._id}`
    })
    return { users };
}

async function profileLoader({ params }) {
    let isCurrentUser = false;
    const isAuthenticated = authHelper.isAuthenticated();
    if (!isAuthenticated) {return redirect('/signin')}
    const controller = new AbortController();
    const profile = await apiUser.read(
        params, 
        {t: isAuthenticated.token}, 
        controller.signal
    );
    if (profile.error) {
        throw(Error(profile.error));
    }
    profile.photoUrl = `/api/users/photo/${profile._id}`
    if (profile._id == isAuthenticated.user._id) {isCurrentUser = true}
    return { profile, isCurrentUser, user: isAuthenticated.user  };
}

function signOutLoader() {
    authHelper.clearJwtSignOut()
    return redirect('/');
}

export default { usersLoader, profileLoader, signOutLoader }