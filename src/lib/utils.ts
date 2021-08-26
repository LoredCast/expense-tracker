
export const postJSON : postJSON = (url, obj) => {
    return fetch(url, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(obj),
    })
}