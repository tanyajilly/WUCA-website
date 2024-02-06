export async function fetcher(url: string, options = {}) {
    let response;
    if (options) {
        response = await fetch(url, options);
    } else {
        response = await fetch(url);
    }
    if (response.status !== 200) {
        console.log(response);
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
}