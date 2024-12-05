const create = async (user) => {
    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: user
        });
        return await response.json();
    } catch(err) {
        console.log(err);
        throw err;
    }
}

const list = async (signal) => {
    try {
        const response = await fetch('/api/users', {
            method: 'GET',
            signal: signal
        })
        return await response.json();
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const read = async (params, credentials, signal) => {
    try {
        const response = await fetch(`/api/users/${params.userId}`, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json();
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const update = async (params, credentials, user) => {
    try {
        let response = await fetch('/api/users/' + params.userId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: user
        })
        return await response.json()
    } catch(err) {
        console.log(err)
        throw err;
    }
}

const remove = async (params, credentials) => {
    try {
        let response = await fetch('/api/users/' + params.userId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
    return await response.json()
    } catch(err) {
        console.log(err)
        throw err;
    }
}

export default { create, list, read, update, remove };