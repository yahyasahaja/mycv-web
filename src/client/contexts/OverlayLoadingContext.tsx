import React, { Component } from 'react';

type DefaultValue = {
  isOpened?: boolean;
  show?: () => any;
  hide?: () => any;
};

export const defaultValue: DefaultValue = {
  isOpened: false,
};

export const OverlayLoadingContext = React.createContext(defaultValue);

export class OverlayLoadingStore extends Component {
  state = defaultValue;

  show = () => {
    this.setState({ isOpened: true });
  };

  hide = () => {
    this.setState({ isOpened: false });
  };

  render() {
    return (
      <OverlayLoadingContext.Provider
        value={{
          ...this.state,
          show: this.show,
          hide: this.hide,
        }}
      >
        {this.props.children}
      </OverlayLoadingContext.Provider>
    );
  }
}

type WithOverlayLoadingType = (
  Component: React.ComponentClass | React.FunctionComponent<any>
) => React.FunctionComponent<any>;

export const withOverlayLoading: WithOverlayLoadingType = (Comp) => (props) => (
  <OverlayLoadingContext.Consumer>
    {(overlayLoadingContext) => (
      <Comp {...props} overlayLoadingContext={overlayLoadingContext} />
    )}
  </OverlayLoadingContext.Consumer>
);
