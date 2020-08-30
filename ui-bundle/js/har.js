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
    $('.tab a').removeClass('active');
    $(currentObj).addClass('active');
    return false;
}

function renderDetailTemplate() {
    var template = `<div class="split rcdetails" id="rcdetails">
                        <div class="tab">
                            <a class="active" onclick="switchTab(this, 'request','response')">Request</a>
                            <a class="" onclick="switchTab(this, 'response','request')">Response</a>
                        </div>
                        <div class="tab-content">
                            <div id="request">
                                REQUEST_CONTENT
                            </div>
                            <div id="response">
                                REQUEST_CONTENT
                            </div>
                        </div>
                    </div>`;
    return template;
}

function toggle(obj) {
    if ($(obj).hasClass('active')) {
        $(obj).parent().find('div').hide();
        $(obj).html('+');
        $(obj).removeClass('active');
    } else {
        $(obj).parent().find('div').show();
        $(obj).html('-');
        $(obj).addClass('active');
    }
}

function buildHtmlBasedOnKey(element) {
    const keys = ['headers', 'cookies', 'queryString'];
    // Generate HTML with expand/collapse option
    var key = element[0];
    if (keys.indexOf(key) !== -1 && element[1].length > 0) {
        var values = element[1];
        var innerContent = '';
        values.forEach((item) => {
            innerContent += '<p class="code">' + item.name + '</strong> : ' + item.value + '</p>';
        });

        return `<div><a class="active" onclick="toggle(this)"> - </a> ${key} <br/> <div style="padding-left: 30px"> ${innerContent}</div> </div>`;
    }
    return '<p class="code">&nbsp;&nbsp; ' + element[0] + ' : ' + element[1] + '</p>';
}

function renderDetails(key) {
    var reqResObject = content.get(key);
    function generateHtml(data) {
        var keys = Object.entries(data);
        var content = '';
        keys.forEach((element) => {
            content += buildHtmlBasedOnKey(element);
        });
        content = '<div class="innersection">' + content + '</div>';
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
            setTimeout(function () {
                $('#response').hide(resHtml);
            });
        }, 0);
    } else {
        renderDetails(key);
    }
    $('#' + key).parent().find('a').removeClass('active');
    $('#' + key).addClass('active');
}