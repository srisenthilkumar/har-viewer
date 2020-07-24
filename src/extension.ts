// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
var fs = require('fs');
import * as path from 'path';
import { render } from './lib/index';
// import 
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "har-viewer" is now active!');


	let preview = vscode.commands.registerCommand('har-viewer.preview', () => {
		const activeDocument = vscode.window.activeTextEditor?.document;

		if (activeDocument) {


			console.log('SRI file name' + activeDocument.fileName);
			// console.log('SRI content' + activeDocument.getText());
			let panel = vscode.window.createWebviewPanel(
				'har-viewer',
				'View' + activeDocument.fileName,
				vscode.ViewColumn.One,
				{
					enableScripts: true
				}
			);

			const bootstrapCssPath = vscode.Uri.file(path.join(context.extensionPath, './ui-bundle/css/bootstrap.min.css'));
			const bootstrapCss = panel.webview.asWebviewUri(bootstrapCssPath);

			const harCssPath = vscode.Uri.file(path.join(context.extensionPath, 'ui-bundle', 'css','har.css'));
			const harCss = panel.webview.asWebviewUri(harCssPath);

			const harJsPath = vscode.Uri.file(path.join(context.extensionPath, 'ui-bundle', 'js','har.js'));
			const harJs = panel.webview.asWebviewUri(harJsPath);

			const splitJsPath = vscode.Uri.file(path.join(context.extensionPath, './ui-bundle/js/split.min.js'));
			const splitJs = panel.webview.asWebviewUri(splitJsPath);

			const bootstrapJsPath = vscode.Uri.file(path.join(context.extensionPath, './ui-bundle/js/split.min.js'));
			const bootstrapJs = panel.webview.asWebviewUri(bootstrapJsPath);

			const jqueryJsPath = vscode.Uri.file(path.join(context.extensionPath, './ui-bundle/js/split.min.js'));
			const jqueryJs = panel.webview.asWebviewUri(jqueryJsPath);

			const uiBundleObj = { bootstrapCss, harCss, bootstrapJs, harJs, jqueryJs, splitJs};

			panel.webview.html = render(activeDocument.fileName, activeDocument.getText(), uiBundleObj);

			panel.onDidDispose(
				() => {
					// When the panel is closed, cancel any future updates to the webview content
				},
				null,
				context.subscriptions
			);
		}
	});

	context.subscriptions.push(preview);
}

const getWebviewContent = (content?: any) => {
	// console.log(content);
	if (!content) {
		return `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Cat Coding</title>
		</head>
		<body>
			Please select or open a document to view in HAR designer
		</body>
		</html>`;
	}
	const jsonContent = JSON.parse(content);
	return `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Cat Coding</title>
		</head>
		<body>
		${jsonContent.log.entries[0].startedDateTime}
		</body>
		</html>`;

};
// this method is called when your extension is deactivated
export function deactivate() { }
