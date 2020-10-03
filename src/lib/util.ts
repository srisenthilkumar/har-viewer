import * as crypto from "crypto";
import { URL } from "url";
const LZUTF8 = require("lzutf8");

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

const sanitizeValues = (object: any) => {
    var objectParsed: any = {};

    var entries = Object.entries(object);

    entries.forEach((element: any) => {
        if (typeof element[1] === "string") {
            objectParsed[element[0]] = Array.from(LZUTF8.compress(element[1]));
        } else {
            objectParsed[element[0]] = sanitizeValues(element[1]);
        }
    });

    return objectParsed;
};
