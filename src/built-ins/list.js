import invariant from 'invariant';

import { register, attachListeners } from '../ReactTitaniumBridge';
import groupBy from '../utils/groupBy';
import indexBy from '../utils/indexBy';

register('list', 'Ti.UI.ListView', {
  factory: props => Ti.UI.createListView(props),

  create(props, handlers, getChildren) {
    const children = getChildren();

    const { sections, templateObjs, others } = groupBy(children, child =>
      (child.type === 'template') ? 'templateObjs' :
      (child.apiName === 'Ti.UI.ListSection') ? 'sections' :
      'others');

    invariant(
      !others,
      "Only <listsection>s and <template>s can be children of a <list>"
    );

    // templates passed as child elements overwrite those passed as props
    const templates = indexBy(
      templateObjs,
      template => template.properties.name,
      props.templates
    );

    let defaultItemTemplate = props.defaultItemTemplate;

    if (templates && defaultItemTemplate == null) {
      for (let name in templates) {
        if (templates[name].properties.default) {
          defaultItemTemplate = name;
        }
      }
    }

    const view = this.factory({
      ...props,
      sections,
      templates,
      defaultItemTemplate
    });

    attachListeners(view, handlers);

    return view;
  }
});
