export async function access() {
    let c_id = "e8d81c9aaa1947f38fbd85538715ed15"
    let c_sct = "905b53bf1ab648819815a7301e15787c"
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {"content-type": "application/x-www-form-urlencoded", },
        body: new URLSearchParams({
            grant_type: 'client_credentials', 
            client_id: c_id, 
            client_secret: c_sct 
        }),
      });
    let data = await response.json()

    return data.access_token
}


