/**
 * 
 * @author srisenthilkumar, naveen 
 */
import { template } from "../view/template";
import { trimApiNameFromUrl } from "./util";

const buildNetworkCallsHtml = (apiList: any): string => {
  if (!apiList) {
    return `<p>No remote call entries found!</p>`;
  }

  const remoteCallAnchorTag = `<a id={{hashValue}} class="list" onclick="showDetails(this.id)">{{apiName}}</a>`;
  //tooltip={{urlPath}} 

  let aTagList = "";

  apiList.forEach(
    (remoteCall: { url: string; method: string; key: string }) => {
      aTagList += remoteCallAnchorTag
        .replace("{{hashValue}}", remoteCall.key)
        .replace("{{apiName}}", trimApiNameFromUrl(remoteCall.url))
        .replace("{{apiMethod}}", remoteCall.method);
        //.replace("{{urlPath}}", remoteCall.url)
    }
  );

  return aTagList;
};

const render = (
  filename: string,
  reqAPIs: Array<Object>,
  contentMap: string,
  uiBundleObj: any
): string => {

  let viewtemp: string = template(uiBundleObj);

  viewtemp = viewtemp.replace("{{FILE_NAME}}", filename)
    .replace("{{URL_PATHNAME}}", buildNetworkCallsHtml(reqAPIs))
    .replace("{{contentMap}}", `<script> var INIT_LOAD = ${contentMap}</script>`);

  return viewtemp;
};

export { render };
