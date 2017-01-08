/*
  Utility to generate props for parent container for a page
*/
import { each } from 'underscore';

export function generateComponentProps(pageConfig, apiActions, emptyComponents) {
  const componentsConfig = pageConfig.componentPropsConfig;
  const componentProps = {};
  each(componentsConfig, (configObj) => {
        // Set props defined in config object
    componentProps[configObj.key] = configObj;
        // add reducerName props
    componentProps[configObj.key].reducerName = pageConfig.reducerName;
        // add component name
    componentProps[configObj.key].componentName = pageConfig.pageComponents[configObj.key];
        // empty state
    if (emptyComponents[pageConfig.pageComponents[configObj.key]]) {
      componentProps[configObj.key].emptyState = true;
    }
    else {
      componentProps[configObj.key].emptyState = false;
    }
    componentProps[configObj.key].apiActions = apiActions;
    componentProps[configObj.key].parentComponent = pageConfig.parentComponent;
  });
  return componentProps;
}
