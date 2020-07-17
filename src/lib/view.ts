
import { template } from '../ui-bundle/template';

const REQUEST_TEMPLATE = `<h5>Headers</h5>
Host: api.te-alm-19010182012203326446947.qa.paypal.com
<hr />
<h5>Body</h5>`;

const REMOTE_CALL_TEMPLATE = `<a class="list-group-item active" href="#">
<div class="d-flex w-100 justify-content-between">
    <h6 class="mb-1">generate-token</h6>
    <small>2020-06-03T10:11:19.065Z <span class="badge badge-primary badge-pill">POST</span>
    </small>
</div>
<small>
    https://api.te-alm-19010182012203326446947.qa.paypal.com/v1/identity/generate-token
</small>
</a>`;

const render = (filename: string, content: string): string => {
    let viewtemp = template;
    viewtemp = viewtemp.replace('{{FILE_NAME}}', filename);
    const jsonContent = JSON.parse(content);
    viewtemp = viewtemp.replace('{{REQUEST_CONTENT}}', jsonContent.log.entries[0].startedDateTime);
    console.log(viewtemp);
    return viewtemp;
};

export { render };