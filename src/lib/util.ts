import * as crypto from "crypto";
const LZUTF8 = require("lzutf8");

const SUPPORTED_TYPES = ['boolean', 'number', 'string', 'bigint', 'symbol'];

export const getContentMap = (content: string) => {
    let contentMap: any = {};
    const data = JSON.parse(content);
    let reqAPIs: Array<Object> = [];

    data.log.entries.forEach(
        (element: { startedDateTime: any; request: any; response: any }) => {
            const key = crypto.randomBytes(16).toString("hex");
            reqAPIs.push({ url: element.request.url, method: element.request.method, key });
            contentMap[key] = {
                startedDateTime: element.startedDateTime,
                request: sanitizeValues(element.request),
                response: sanitizeValues(element.response)
            };
        }
    );
    return { reqAPIs, contentMap: JSON.stringify(contentMap) };
};

export const trimApiNameFromUrl = (url: string): string => {
    if (!url || url === "/") {
        return "/";
    }
    let filePath = url.substring(
        url.lastIndexOf("/") + 1,
        url.length
    );
    if (!filePath) {
        return trimApiNameFromUrl(url.substring(0, url.length-1));
    }
    if (filePath.includes(".")) {
        filePath = filePath.substring(0, filePath.indexOf("."));
    }
    return filePath;
};

const sanitizeValues = (object: any) => {
    var objectParsed: any = {};
    if (!object) {
        return objectParsed;
    }

    var entries = Object.entries(object);
    try {
        entries.forEach((element: any) => {
            if (SUPPORTED_TYPES.indexOf(typeof element[1]) !== -1) {
                objectParsed[element[0]] = Array.from(LZUTF8.compress(element[1].toString()));
            } else {
                objectParsed[element[0]] = sanitizeValues(element[1]);
            }
        });
    } catch (err) {
        // Skip encoding error and continue encoding other objects
        console.error('Encoding Error: Contact the authtor' ,err);
    }

    return objectParsed;
};
