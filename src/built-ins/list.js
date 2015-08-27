import invariant from 'invariant';

import { register, attachListeners } from '../ReactTitaniumBridge';
import groupBy from '../utils/groupBy';
import indexBy from '../utils/indexBy';

register('list', 'Ti.UI.ListView', {
  factory: props => Ti.UI.createListView(props),

  create(props, handlers, getChildren) {
    const children = getChildren();

    const { sections, templates, others } = groupBy(children, child =>
      (child.type === 'template') ? 'templates' :
      (child.apiName === 'Ti.UI.ListSection') ? 'sections' :
      'others');

    invariant(
      !others,
      "Only <listsection>s and <template>s can be children of a <list>"
    );

    const view = this.factory({
      ...props,
      sections,
      templates: indexBy(templates, template => template.properties.name)
    });

    attachListeners(view, handlers);

    return view;
  }
});
