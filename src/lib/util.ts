import * as crypto from "crypto";
import { URL } from "url";
import * as jsesc from "jsesc";

export const getContentMap = (content: string) => {
    let contentMap = new Map();
    const data = JSON.parse(content);
    let reqAPIs: Array<Object> = [];

    data.log.entries.forEach(
        (element: { startedDateTime: any; request: any; response: any }) => {
            const key = crypto.randomBytes(16).toString("hex");
            reqAPIs.push({url: element.request.url, method: element.request.method, key});
            contentMap.set(key, {
                startedDateTime: element.startedDateTime,
                request: sanitizeObject(element.request),
                response: sanitizeObject(element.response)
            });
        }
    );
    return {reqAPIs, contentMap: JSON.stringify([...contentMap])};
};

export const trimApiNameFromUrl = (url: string): string => {
    const urlObj = new URL(url);
    const pathname: string = urlObj.pathname;
    if (!pathname || pathname === "/") {
        return urlObj.hostname;
    }
    let filePath = pathname.substring(
        pathname.lastIndexOf("/") + 1,
        pathname.length
    );
    if (filePath.includes(".")) {
        filePath = filePath.substring(0, filePath.lastIndexOf("."));
    }
    return filePath;
};

const sanitizeObject = (object: any) => {
    return jsesc(object, {
        escapeEverything: true
    });
};
