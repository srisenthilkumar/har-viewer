// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
var fs = require('fs');
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
				{}
			);

			panel.webview.html = render(activeDocument.fileName, activeDocument.getText());

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
