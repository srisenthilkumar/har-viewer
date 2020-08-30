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
    <link rel="stylesheet" type="text/css" href="${harCss}" />
    <script src="${splitJs}"></script>
</head>

<body>
    <div id="viewer">
            <div class="remotecalls" id="remotecalls">
                {{URL_PATHNAME}}
            </div>
    </div>

    {{contentMap}}
    <script src="${jqueryJs}"></script>
    <script src="${harJs}"></script>
</body>

</html>`;
};
