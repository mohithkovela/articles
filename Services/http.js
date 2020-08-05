export async function makeHTTPRequest(uri, requestBody) {
  try {
    let response = await fetch(uri, requestBody);
    return response.json();
  } catch (error) {
    alert(error);
  }
}
