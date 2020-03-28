//MODULES
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import styled from 'styled-components';
//COMPONENT
import { SnackbarContext } from '../contexts/SnackbarContext';
import { RouteConfigComponentProps } from 'react-router-config';

const PageLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20000;
`;

export type Loader = () => Promise<any>;

export interface AsyncComponentWrapper
  extends React.FC<RouteConfigComponentProps> {
  load: Loader;
}

type AsyncComponentFunctionType = (loader: Loader) => AsyncComponentWrapper;
export const generateAsyncComponent: AsyncComponentFunctionType = (
  loader: Loader
) => {
  let Component: any = null;
  const load: Loader = async () => {
    const ResolvedComponent = await loader();
    Component = ResolvedComponent.default || ResolvedComponent;
  };

  const AsyncComponent: AsyncComponentWrapper = (
    props: RouteConfigComponentProps
  ) => {
    const [Comp, setComponent] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    const snackbarContext = React.useContext(SnackbarContext);

    React.useEffect(() => {
      setLoading(true);
      const fetchComponent = async () => {
        try {
          await load();
          setLoading(false);
          if (Comp !== Component) {
            setComponent(() => Component);
          }
        } catch (err) {
          if (snackbarContext.show)
            snackbarContext.show('Error loading page, please refresh page', {
              severity: 'error',
            });
          console.log('ERROR WHILE LOADING PAGE ROUTE', err);
        }
      };

      fetchComponent();
      // eslint-disable-next-line
    }, []);

    if (Component) return <Component {...props} />;
    if (loading) {
      return (
        <PageLoading>
          <LinearProgress />
        </PageLoading>
      );
    }
    if (Comp) return <Comp {...props} />;
    return <div>404 Not Found</div>;
  };

  AsyncComponent.load = async () => {
    const ResolvedComponent = await loader();
    Component = ResolvedComponent.default || ResolvedComponent;
  };

  return AsyncComponent;
};

//DEFAULTS
export default generateAsyncComponent;
