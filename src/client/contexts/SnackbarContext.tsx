import React, { Component } from 'react';

export type DefaultValue = {
  isOpened: boolean;
  autoHideDuration: number;
  severity: string | null;
  message: string;
  show?: (
    message: string,
    state: {
      isOpened?: boolean;
      autoHideDuration?: number;
      severity?: string | null;
      message?: string;
    }
  ) => any;
  close?: () => any;
};

export const defaultValue: DefaultValue = {
  isOpened: false,
  autoHideDuration: 6000,
  severity: null,
  message: '',
};

export const SnackbarContext = React.createContext(defaultValue);

export class SnackbarStore extends Component {
  state = defaultValue;

  show = (message = '', state = {}) => {
    this.setState({ ...state, message, isOpened: true });
  };

  close = () => {
    this.setState({ isOpened: false });
  };

  render() {
    return (
      <SnackbarContext.Provider
        value={{
          ...this.state,
          show: this.show,
          close: this.close,
        }}
      >
        {this.props.children}
      </SnackbarContext.Provider>
    );
  }
}

type WithSnackbarType = (
  Component: React.ComponentClass | React.FunctionComponent<any>
) => React.FunctionComponent<any>;

export const withSnackbar: WithSnackbarType = (Comp) => (props) => (
  <SnackbarContext.Consumer>
    {(snackbarContext) => <Comp {...props} snackbarContext={snackbarContext} />}
  </SnackbarContext.Consumer>
);
