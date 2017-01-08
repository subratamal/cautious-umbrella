import React, { PropTypes } from 'react';

let IS_FIRST_MOUNT_AFTER_LOAD = true;

export default function connectDataFetchers(Component, actionCreators) {
  return class DataFetchersWrapper extends React.Component {
    static fetchData({ dispatch, params = {}, query = {}, locale }) {
      return Promise.all(
        actionCreators.map(actionCreator => dispatch(actionCreator({ params, query, locale })))
      );
    }

    componentDidUpdate(prevProps) {
      const { location } = this.props;
      const { location: prevLocation } = prevProps;

      const isUrlChanged = (location.pathname !== prevLocation.pathname)
                              || (location.search !== prevLocation.search);

      if (isUrlChanged) {
        this._fetchDataOnClient();
      }
    }

    componentDidMount() {
      if (!IS_FIRST_MOUNT_AFTER_LOAD) {
        this._fetchDataOnClient();
      }

      IS_FIRST_MOUNT_AFTER_LOAD = false;
    }

    _fetchDataOnClient() {
      const locale = this.context.i18n ? this.context.i18n.getLocale() : 'en';

      DataFetchersWrapper.fetchData({
        dispatch: this.props.dispatch,
        params: this.props.params,
        query: this.props.location.query,
      });
    }

    render() {
      return (
          <Component {...this.props} />
      );
    }
  };

  DataFetchersWrapper.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.required,
      search: PropTypes.string,
      query: PropTypes.string.object,
    }).isRequired,
  };
}

export function fetchComponentsData({ dispatch, components, params, query }) {
  const promises = components.map(current => {
    const component = current.WrappedComponent ? current.WrappedComponent : current;

    return component.fetchData
            ? component.fetchData({ dispatch, params, query })
            : null;
  });
  return Promise.all(promises);
}
