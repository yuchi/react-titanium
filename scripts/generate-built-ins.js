/**
 * Built-in generation script
 * ==========================
 *
 * This script requires a *api.json* file in the scripts directory.
 * You can get one from Appcelerator itself with (for example):
 *
 *   $ wget http://docs.appcelerator.com/titanium/data/4.1.0/api.json
 *
 * then you can run this script with:
 *
 *   $ npm run generate-built-ins
 *
 * This will write the *easy* and *simple* built-ins in the `src/lib/built-ins`
 * directory.
 */

import { createReadStream, writeFileSync } from 'fs';
import { resolve } from 'path';
import { parse } from 'JSONStream';
import chalk from 'chalk';

// Views that need a custom implementation
const customs = words`
  Ti.UI.iOS.NavigationWindow
  Ti.UI.iOS.SplitWindow
  Ti.UI.iOS.Toolbar
  Ti.UI.List
  Ti.UI.ListSection
  Ti.UI.MobileWeb.NavigationGroup
  Ti.UI.Picker
  Ti.UI.PickerColumn
  Ti.UI.PickerRow
  Ti.UI.ScrollableView
  Ti.UI.Tab
  Ti.UI.TabGroup
  Ti.UI.TableView
  Ti.UI.Window
`;

// Views that are not going to be used as elements
const skip = words`
  Ti.UI.2DMatrix
  Ti.UI.3DMatrix
  Ti.UI.Android.ProgressIndicator
  Ti.UI.Animation
  Ti.UI.AttributedString
  Ti.UI.DashboardView
  Ti.UI.iOS.Animator
  Ti.UI.ListItem
  Ti.UI.Notification
`;

// Proxies that act as views but don’t extend from Ti.UI.View
const fake = words`
  Ti.UI.TableViewSection
  Ti.UI.View
`;

// Tagnames to be renamed
const tagnames = {
  //'android-searchview': 'android-search',
  'imageview': 'image',
  'listview': 'list',
  'scrollview': 'scroll',
  'scrollableview': 'scrollable',
  'tableview': 'table',
  //'webview': 'web',
  'ios-adview': 'ios-ad',
  'ios-coverflowview': 'ios-coverflow',
};

const buildDir = resolve(__dirname, '..', 'src', 'lib', 'built-ins');

createReadStream(require.resolve('./api'))
  .pipe(parse('*', ({ name, type, deprecated, ...rest }) => {
    const apiName = name.replace('Titanium', 'Ti');

    if (type === 'module') return;
    if (!apiName::startsWith('Ti.UI.')) return;
    if (skip::contains(apiName)) return;
    if (deprecated) return;

    const [ shortName, platform ] = apiName.toLowerCase().split('.').slice(2).reverse();

    const tagname = getTagName(platform ? `${platform}-${shortName}` : shortName);

    if (apiName::endsWith('Style')) {
      console.log(highlight(chalk.blue)`I should do something with constants from ${apiName}`);
    }
    else if (apiName::endsWith('Behavior')) {
      console.log(highlight(chalk.blue)`I should do something with the behavior ${apiName}`);
    }
    else if (apiName::endsWith('Dialog')) {
      console.log(highlight(chalk.yellow)`I should do something with the dialog ${apiName}`)
    }
    else if ((rest.extends === 'Titanium.Proxy') && !fake::contains(apiName)) {
      console.log(highlight(chalk.red)`I don’t know what should I do with ${apiName}`)
    }
    else if (customs::contains(apiName)) {
      console.log(highlight(chalk.red)`I should check if ${apiName} is implemented`);
    }
    else {
      console.log(highlight(chalk.green)`<${tagname} /> builds a ${apiName}`);
      buildSimpleView(tagname, apiName);
    }
  }));

// Factories

function buildSimpleView(tagname, apiName) {
  const [ classname, ...rest ] = apiName.split('.').reverse();
  const namespace = rest.reverse().join('.');

  const factory = `${namespace}.create${classname}`;

  write(tagname, `
import { register } from '../ReactTitaniumBridge';

register('${tagname}', '${apiName}', {
  factory: props => ${factory}(props)
});
`);
}

function write(tagname, source) {
  source = source.trim() + '\n';

  writeFileSync(resolve(buildDir, tagname + '.js'), source);
}

function getTagName(tagname) {
  return tagnames[tagname] || tagname;
}

// Utils

function highlight(fn){
  return ([ first, ...rest ], ...values) =>
    first + rest.map((piece, index) =>
      `${fn(values[index])}${piece}`).join('');
}

function startsWith(start) {
  return this.slice(0, start.length) === start;
}

function endsWith(end) {
  return this.slice(-end.length) === end;
}

function contains(needle) {
  return this.indexOf(needle) >= 0;
}

function words([ src ]) {
  return src.trim().split(/\s+/);
}
