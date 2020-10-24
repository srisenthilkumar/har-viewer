// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { render } from './lib/index';
import { getContentMap } from './lib/util';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "har-viewer" is now active!');

	vscode.window.showInformationMessage('Loading ...');
	let preview = vscode.commands.registerCommand('har-viewer.preview', () => {

		const activeDocument = vscode.window.activeTextEditor?.document;
		const fileName = activeDocument?.fileName;
		const fileContent = activeDocument?.getText();

		if (!fileContent || !activeDocument) {
			vscode.window.showErrorMessage(fileName + " doesn't seem to be valid file");
			return;
		}

		try {
			const { reqAPIs, contentMap } = getContentMap(fileContent);


			let panel = vscode.window.createWebviewPanel(
				'har-viewer',
				'View' + activeDocument.fileName,
				vscode.ViewColumn.One,
				{
					enableScripts: true
				}
			);

			const harCssPath = vscode.Uri.file(path.join(context.extensionPath, 'ui-bundle', 'css', 'har.css'));
			const harCss = panel.webview.asWebviewUri(harCssPath);

			const harJsPath = vscode.Uri.file(path.join(context.extensionPath, 'ui-bundle', 'js', 'har.js'));
			const harJs = panel.webview.asWebviewUri(harJsPath);

			const splitJsPath = vscode.Uri.file(path.join(context.extensionPath, './ui-bundle/js/split.min.js'));
			const splitJs = panel.webview.asWebviewUri(splitJsPath);

			const jqueryMarkJsPath = vscode.Uri.file(path.join(context.extensionPath, './ui-bundle/js/jquery.mark.js'));
			const jqueryMarkJs = panel.webview.asWebviewUri(jqueryMarkJsPath);

			const jqueryJsPath = vscode.Uri.file(path.join(context.extensionPath, './ui-bundle/js/jquery-3.5.1.slim.min.js'));
			const jqueryJs = panel.webview.asWebviewUri(jqueryJsPath);

			const lzutf8Path = vscode.Uri.file(path.join(context.extensionPath, './ui-bundle/js/lzutf8.min.js'));
			const lzutf8Js = panel.webview.asWebviewUri(lzutf8Path);

			const uiBundleObj = { harCss, harJs, jqueryJs, splitJs, jqueryMarkJs, lzutf8Js };

			panel.webview.html = render(activeDocument.fileName, reqAPIs, contentMap, uiBundleObj);

		} catch (err) {
			vscode.window.showErrorMessage('Hmm! File content is not loaded, please raise an issue at https://github.com/srisenthilkumar/har-viewer/issues');
		}

	});

	context.subscriptions.push(preview);
}

// this method is called when your extension is deactivated
export function deactivate() { }
