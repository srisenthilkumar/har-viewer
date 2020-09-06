export const template = (uiBundleObj: any) => {
  const {
    harCss,
    harJs,
    jqueryJs,
    splitJs,
    jqueryMarkJs
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
    <div class="finder">
      <input type="text" name="keyword" placeholder="search..."> &nbsp;<a onclick="closeFinder()"> X </a>
    </div>
    <div id="viewer">
            <div class="remotecalls" id="remotecalls" style="width: 100%">
                {{URL_PATHNAME}}
            </div>
    </div>

    {{contentMap}}
    <script src="${jqueryJs}"></script>
    <script src="${jqueryMarkJs}"></script>
    <script src="${harJs}"></script>
</body>

</html>`;
};
