import * as vscode from 'vscode';

const get = (key: string): any => {
  const configuration = vscode.workspace.getConfiguration('harViewer');
  let value = configuration.get(key);
  return value;
};

const API_NAMING_CONVENTION_KEY = 'pathNamingConvention';

enum ApiPathNamingType {
  FULL = 'Full',
  RELATIVE = 'Relative',
  LAST_PORTION = 'LastPortion'
}

const config = {
  get: get,
  constants: {
    API_NAMING_CONVENTION_KEY
  }
};



export { config, ApiPathNamingType };