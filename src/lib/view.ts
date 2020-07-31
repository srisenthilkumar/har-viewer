import { template } from "../view/template";
import { URL } from "url";

const REQUEST_TEMPLATE = `<h5>Headers</h5>
Host: api.te-alm-19010182012203326446947.qa.paypal.com
<hr />
<h5>Body</h5>`;

const REMOTE_CALL_TEMPLATE = `<a class="list-group-item active" href="#" onclick="showDetails()">
<div class="d-flex w-100 justify-content-between">
    <h6 class="mb-1">generate-token</h6>
    <small>2020-06-03T10:11:19.065Z <span class="badge badge-primary badge-pill">POST</span>
    </small>
</div>
<small>
    https://api.te-alm-19010182012203326446947.qa.paypal.com/v1/identity/generate-token
</small>
</a>`;

const render = (
    filename: string,
    content: string,
    uiBundleObj: any
): string => {
    let viewtemp: string = template(uiBundleObj);
    viewtemp = viewtemp.replace("{{FILE_NAME}}", filename);
    const jsonContent = JSON.parse(content);
    // viewtemp = viewtemp.replace(
    //     "{{REQUEST_CONTENT}}",
    //     jsonContent.log.entries[0].startedDateTime
    // );
    viewtemp = viewtemp.replace(
        "{{URL_PATHNAME}}",
        formNetworkCallList(jsonContent.log.entries)
    );
    console.log(viewtemp);
    return viewtemp;
};

const formNetworkCallList = (entries: any): string => {
    if (!entries) {
        return `<p>Not remote call entries found!</p>`;
    }
    const remoteCallAnchorTag = `<a class="list-group-item active" href="#" onclick="showDetails()">
    <div class="d-flex w-100 justify-content-between">
        <small class="mb-1">
            {{apiName}}
            <span class="badge badge-primary badge-pill">{{apiMethod}}</span>
        </small>
    </div>
    </a>`;

    let aTagList = "";

    entries.forEach(
        (remoteCall: { request: { url: string; method: string } }) => {
            aTagList += remoteCallAnchorTag
                .replace("{{apiName}}", trimApiNameFromUrl(remoteCall.request.url))
                .replace("{{apiMethod}}", remoteCall.request.method);
        }
    );
    console.log("aTagList: ", aTagList);
    return aTagList;
};

const trimApiNameFromUrl = (url: string): string => {
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

export { render };
