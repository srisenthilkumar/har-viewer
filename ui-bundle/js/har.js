
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
function escapeHTML(value) {

    return value.replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
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

function buildHtml(key, value) {
    const content = escapeHTML(value);
    if(content.length > 3000){
        return '<p class="code"> &nbsp;&nbsp; ' + key + ' : <textarea col="20" row="100">' + escapeHTML(value) + '</textarea></p>';
    }
    return '<p class="code"> &nbsp;&nbsp; ' + key + ' : <span>' + escapeHTML(value) + '</span></p>';
}

function decompress(element, parentKey) {
    const formatKeys = ['headers', 'cookies', 'queryString'];

    if (Array.isArray(element[1])) {
        return buildHtml(element[0], LZUTF8.decompress(new Uint8Array(element[1])));
    } else if (formatKeys.indexOf(parentKey) !== -1) {
        return buildHtml(LZUTF8.decompress(new Uint8Array(element[1].name)), LZUTF8.decompress(new Uint8Array(element[1].value)));
    }
    else {
        var keys = Object.entries(element[1]);
        var content = '';

        keys.forEach((childElement) => {
            content += decompress(childElement, element[0]);
        });
        return `<div> ${keys.length !== 0 ? '<a class="active" onclick="toggle(this)"> - </a>' : '&nbsp;&nbsp;'} ${element[0]} : <br/> <div style="padding-left: 30px"> ${content}</div> </div>`;
    }
}

function renderDetails(key) {
    var reqResObject = INIT_LOAD[key];
    function generateHtml(data) {
        var keys = Object.entries(data);
        var content = '';
        keys.forEach((element) => {
            content += decompress(element);
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
    if ($('#rcdetails').length) {
        renderDetails(key);
    } else {
        $('#viewer').append(renderDetailTemplate());
        setTimeout(function () {
            loadSplitView();
            renderDetails(key);
            setTimeout(function () {
                $('#response').hide();
            });
        }, 0);   
    }
    $('#' + key).parent().find('a').removeClass('active');
    $('#' + key).addClass('active');
}

var CURRENT_MARKERS = [];
var MARKER_INDEX = 0;

$(function () {

    var mark = function () {

        // Read the keyword
        var keyword = $("input[name='keyword']").val();

        // Remove previous marked elements and mark
        // the new keyword inside the context
        $("#viewer").unmark({
            done: function () {
                CURRENT_MARKERS = [];
                MARKER_INDEX = 0;
                $("#viewer").mark(keyword, {
                    each: function (obj) {
                        CURRENT_MARKERS.push(obj);
                    }
                });
            }
        });
    };

    $("input[name='keyword']").on("input", mark);
    $("input[name='keyword']").on("keypress", function (e) {
        if (e.which === 13) {
            MARKER_INDEX = MARKER_INDEX >= CURRENT_MARKERS.length ? 0 : MARKER_INDEX;
            CURRENT_MARKERS[MARKER_INDEX].scrollIntoView();
            MARKER_INDEX++;
        }
    });
});

function closeFinder() {
    $(".finder").hide();
}
$(document).keypress('f', function (e) {
        $(".finder").show();
        var searchBox = $(".finder input");
        searchBox.focus();
});
$(".finder").hide();