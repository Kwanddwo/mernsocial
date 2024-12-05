import apiAuth from './api-auth'
// TODO: Change storage method: use something more permanent than sesssionStorage as this limits login to only one window
// localStorage is not secure!!!

function authenticate(jwt, cb=()=>{}) {
    // Checks if code is run in browser
    if (typeof window !== "undefined") {
        localStorage.setItem('jwt', JSON.stringify(jwt));
    }
    cb();
}

function isAuthenticated() {
    if (typeof window === "undefined") 
        return false;
    
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    }

    return false;
}

function clearJwtSignOut(cb=()=>{}) {
    if (typeof window === "undefined") {
        return false;
    }

    localStorage.removeItem('jwt');
    cb();
    apiAuth.signOut().then(() => {
        document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })
}

export default {authenticate, isAuthenticated, clearJwtSignOut}