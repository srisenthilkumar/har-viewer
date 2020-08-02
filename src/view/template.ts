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
        <div class="row" id="viewer">
            <div class="col-sm remotecalls" id="remotecalls">
                <div class="list-group">
                    {{URL_PATHNAME}}
                </div>
            </div>
        </div>
    </div>

    {{contentMap}}
    <script src="${jqueryJs}"></script>
    <script src="${bootstrapJs}"></script>
    <script src="${harJs}"></script>
</body>

</html>`;
};
