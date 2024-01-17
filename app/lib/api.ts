export async function fetcher(url: string, options = {}) {
    let response;
    if (options) {
        response = await fetch(url, options);
    } else {
        response = await fetch(url);
    }
    const data = await response.json();
    return data;
}