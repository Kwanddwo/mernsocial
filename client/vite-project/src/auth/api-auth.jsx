const signIn = async (user) => {
    try {
        const response = await fetch('/auth/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch(err) {
        console.log(err);
    }
}

const signOut = async () => {
    try {
        const response = await fetch('/auth/signout');
        return await response.json();
    } catch(err) {
        console.log(err);
    }
}

export default { signIn, signOut }