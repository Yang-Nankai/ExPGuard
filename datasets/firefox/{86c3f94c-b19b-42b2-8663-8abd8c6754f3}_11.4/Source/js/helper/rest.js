const METHOD_GET = "GET";
const METHOD_POST = "POST";

const HEADER_CONTENT_TYPE_JSON = "application/json";
const HEADER_CONTENT_TYPE_TEXT_PLAIN = "text/plain";

async function textGet(url) {
    const result = await restRequest(url, METHOD_GET, HEADER_CONTENT_TYPE_TEXT_PLAIN, null);
    return result;
}

async function jsonGet(url) {
    const result = await restRequest(url, METHOD_GET, HEADER_CONTENT_TYPE_JSON, null);
    return result;
}

async function jsonPost(url, body) {
    const result = await restRequest(url, METHOD_POST, HEADER_CONTENT_TYPE_JSON, body);
    return result;
}

// Convenience function for network requests. Catches errors so that callers don't need to use try catch, but instead
// check the returned object.
async function restRequest(url, method, contentType, body) {
    if (!contentType) {
        contentType = HEADER_CONTENT_TYPE_TEXT_PLAIN;
    }
    try {
        let options = {
            method: method,
            headers: {
                'Content-Type': contentType,
            }
        };
        //console.log(`Rest Options: [${JSON.stringify(options)}]`); // For debugging
        if (method === "POST" && body) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        if (contentType === HEADER_CONTENT_TYPE_JSON) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            const text = await response.text();
            console.log(text);
            return text;
        }
    } catch (error) {
        console.error(`Fetch Failed: url=[${url}], error=[${error}]`);
        return error;
    }
}