import { redirect } from "react-router";
import apiUser from "./api-user";
import apiAuth from "../auth/api-auth";
import authHelper from "../auth/auth-helper";

async function signUpAction({ request }) {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);
    const data = await apiUser.create(user);
    if (data.error) {
        return data.error;
    }
    const signInData = await apiAuth.signIn(user);
    if (signInData.error) {
        return signInData.error
    }
    authHelper.authenticate(signInData)
    return redirect(`/users/${data.user._id}/edit`);
}

async function signInAction({ request }) {
    const formData = await request.formData();
    const creds = Object.fromEntries(formData);
    const data = await apiAuth.signIn(creds)
    if (data.error) {
        return data.error;
    }
    authHelper.authenticate(data)
    return redirect("/");
}

async function editAction({ params, request }) {
    const isAuthenticated = authHelper.isAuthenticated();
    if (!isAuthenticated) {return redirect('/signin')}
    if (isAuthenticated.user._id != params.userId) {return "Error: You are not authorized for this action"}
    
    console.log('formData\n')
    const formData = await request.formData();
    console.log(formData);
    const update = Object.fromEntries(formData);
    console.log('update')
    console.log(update)
    const data = await apiUser.update(
        params,
        {t: isAuthenticated.token},
        update
    )
    if (data.error) {
        return data.error
    }
    return redirect(`/users/${params.userId}`);
}

async function followAction({ params }) {
    const isAuthenticated = authHelper.isAuthenticated();
    if (!isAuthenticated) {return redirect('/signin')}
    if (isAuthenticated.user._id == params.userId) {return "Error: can't follow yourself"}
    // use follow / unfollow api here
    // if (data.error) {
    //     return data.error
    // }
    return redirect(`/users/${params.userId}`);
}

async function deleteAction({ params }) {
    const isAuthenticated = authHelper.isAuthenticated();
    if (!isAuthenticated) {return redirect('/signin')}
    if (isAuthenticated.user._id != params.userId){
        return "Error: You are not authorized for this action";
    }
    const data = await apiUser.remove(
        params, 
        {t: isAuthenticated.token}
    );
    authHelper.clearJwtSignOut(() => {console.log('deleted')});
    if (data.error) {
        throw Error(data.error)
    }
    return redirect('/')
}

export default { signUpAction, signInAction, editAction, deleteAction }