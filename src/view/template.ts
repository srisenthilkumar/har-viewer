export const template = (uiBundleObj: any) => {
  const {
    bootstrapCss,
    harCss,
    bootstrapJs,
    harJs,
    jqueryJs,
    splitJs,
  } = uiBundleObj;
  return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="${bootstrapCss}" />
    <link rel="stylesheet" type="text/css" href="${harCss}" />
    <script src="${splitJs}"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="flex">
            <div class="remotecalls shadow" id="one">
                <div class="list-group">
                    {{URL_PATHNAME}}
                </div>
            </div>
            <div class="rcdetails shadow" id="two">
                <div class="list-group list-group-horizontal" id="myList" role="tablist">
                    <a class="list-group-item list-group-item-action active" data-toggle="list" href="#home"
                        role="tab">Request</a>
                    <a class="list-group-item list-group-item-action" data-toggle="list" href="#profile"
                        role="tab">Response</a>
                </div>
                <!-- Tab panes -->
                <div class="tab-content">

                    <div class="tab-pane active" id="home" role="tabpanel">
                        {{REQUEST_CONTENT}}
                    </div>

                    <div class="tab-pane" id="profile" role="tabpanel">
                        {{REQUEST_CONTENT}}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="${jqueryJs}"></script>
    <script src="${bootstrapJs}"></script>
    <script src=${harJs}></script>
</body>

</html>`;
};
