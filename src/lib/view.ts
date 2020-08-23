import { template } from "../view/template";
import { trimApiNameFromUrl } from "./util";

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
  reqAPIs: Array<Object>,
  contentMap: string,
  uiBundleObj: any
): string => {
  console.log(contentMap);
  let viewtemp: string = template(uiBundleObj);
  viewtemp = viewtemp.replace("{{FILE_NAME}}", filename);
  //     "{{REQUEST_CONTENT}}",
  //     jsonContent.log.entries[0].startedDateTime
  // );
  viewtemp = viewtemp
    .replace("{{URL_PATHNAME}}", formNetworkCallList(reqAPIs))
    .replace("{{contentMap}}", `<script> var contentMap = ${contentMap}</script>`);
    return viewtemp;
};

const formNetworkCallList = (apiList: any): string => {
  if (!apiList) {
    return `<p>No remote call entries found!</p>`;
  }
  const remoteCallAnchorTag = `<a id={{hashValue}} class="list-group-item active" title={{urlPath}} onclick="showDetails(this.id)">
    <div class="d-flex w-100 justify-content-between">
        <small class="mb-1">
            {{apiName}}
            <span class="badge badge-primary badge-pill">{{apiMethod}}</span>
        </small>
    </div>
    </a>`;

  let aTagList = "";

  apiList.forEach(
    (remoteCall: { url: string; method: string; key: string }) => {
      aTagList += remoteCallAnchorTag
        .replace("{{hashValue}}", remoteCall.key)
        .replace("{{urlPath}}", remoteCall.url)
        .replace("{{apiName}}", trimApiNameFromUrl(remoteCall.url))
        .replace("{{apiMethod}}", remoteCall.method);
    }
  );
  return aTagList;
};

export { render };
