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

function switchTab(currentObj, showObj, hideObj) {
    $('#' + showObj).show();
    $('#' + hideObj).hide();
    $('#myList a').removeClass('active');
    $(currentObj).addClass('active');
    return false;
}

function renderDetailTemplate() {
    var template = `<div class="split rcdetails" id="rcdetails">
                        <div class="list-group list-group-horizontal" id="myList" role="tablist">
                            <a class="list-group-item list-group-item-action active" onclick="switchTab(this, 'request','response')">Request</a>
                            <a class="list-group-item list-group-item-action" onclick="switchTab(this, 'response','request')">Response</a>
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
    function generateHtml(data) {
        console.log('SRI JSON Parsing', data);
        var keys = Object.entries(data);
        var content = '';
        keys.forEach((element) => {
            content += '<li class="list-group-item">' + element[0] + ':' + element[1] + '</li>';
        });
        content = '<ul class="list-group">' + content + '</ul>';
        return content;
    }
    var reqHtml = generateHtml(reqResObject.request);
    var resHtml = generateHtml(reqResObject.response);
    $('#request').html(reqHtml);
    $('#response').html(resHtml);
}

function showDetails(key) {
    if (!content) {
        content = new Map(contentMap);
    }
    if (!$('#rcdetails').length) {
        $('#viewer').append(renderDetailTemplate());
        setTimeout(function () {
            loadSplitView();
            renderDetails(key);
        }, 0);
    } else {
        renderDetails(key);
    }
    $('#'+key).parent().find('a').removeClass('active');
    $('#'+key).addClass('active');
}