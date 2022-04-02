export const BASE_URL = 'https://api.diplom.ilkras.nomoredomains.work';


export const registration = ({name, email, password}) => {
    console.log({name, email, password})
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name, email, password})
    })
        .then(checkResponse)
}

export const authorization = ({email, password}) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentionals: 'include',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
        .then(checkResponse)
}

export const getContent = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentionals: 'include',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    })
        .then(checkResponse)
}

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}
