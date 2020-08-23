var content;
function loadSplitView() {
    Split(['#remotecalls', '#rcdetails'], {
        sizes: [25, 75],
        minSize: 100,
        elementStyle: (dimension, size, gutterSize) => ({
            'flex-basis': `calc(${size}% - ${gutterSize}px)`,
        }),
        gutterStyle: (dimension, gutterSize) => ({
            'flex-basis': `${gutterSize}px`,
        }),
    });
}

function renderDetailTemplate() {
    var template = `<div class="split rcdetails" id="rcdetails">
    <div class="list-group list-group-horizontal" id="myList" role="tablist">
        <a class="list-group-item list-group-item-action active" data-toggle="list" href="#request"
            role="tab">Request</a>
        <a class="list-group-item list-group-item-action" data-toggle="list" href="#response"
            role="tab">Response</a>
    </div>
    <div class="tab-content">

        <div class="tab-pane active" id="request" role="tabpanel">
            REQUEST_CONTENT
        </div>

        <div class="tab-pane" id="response" role="tabpanel">
            REQUEST_CONTENT
        </div>
    </div>
</div>`;
    return template;
}

function renderDetails(key) {
    var reqResObject = content.get(key);
    function generateHtml(data){
        var keys = Object.entries(data);
        var content = '';
        keys.forEach((element,index) => {
            content += '<li>'+ element + ':' + data[element] + '</li>';
        });
        content = '<ul>' + content + '</ul>';
        return data;
    }
    var reqHtml = generateHtml(reqResObject.request);
    var resHtml = generateHtml(reqResObject.response);
    $('#request').html(reqHtml);
    $('#response').html(resHtml);
}

function showDetails(key) {
    if(!content) {
        content = new Map(contentMap);
    }
    if (!$('#rcdetails').length) {
        $('#viewer').append(renderDetailTemplate());
        setTimeout(function () {
            loadSplitView();
            renderDetails(key);
        }, 0);
    }
}