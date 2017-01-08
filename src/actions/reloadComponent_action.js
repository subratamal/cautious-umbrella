/*
	Actions for calling APIs for Discover Page
*/

export function reloadComponent(componentName, parentComponent) {
	return dispatch => {
		if (parentComponent) {
			dispatch({
				type: parentComponent.toUpperCase() + '_RELOAD_COMPONENT',
				componentName,
				parentComponent
			})
		}
		return
	}
}