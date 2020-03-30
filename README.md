# Yahya Sahaja Portfolio (Web Version)
[![pipeline status](https://gitlab.com/yahyasahaja/mycv-web/badges/master/pipeline.svg)](https://gitlab.com/yahyasahaja/mycv-web/commits/master)

---

[DEMO](https://yahya.ngopi.men)
I'm using **React JS** (using typescript) as a framework to develop this app. Implementing isomorphic app, better debugging, customize everything from scratch.

## Project Structure

- ``src/client/components`` contains all shared components
- ``src/client/store`` contains all stores, could be represented as ViewModel
- ``src/client/screens`` contains all the screens inside this app, structured by route logic
- ``src/server`` contains the client server

## Libraries
- For the UI, I'm using `material-ui`
- Styling using `styled-components`
- State management using `Redux`

## Architecture

I'm using (Model-View-ViewModel) as an app architecture. 
- The `Model` can be found at my own portfolio api
- The `View` can be found at `screens`
- The `ViewModel` can be represented as the redux reducers itself. So all the requests can only be triggered from ViewModel. There's no way to direct interaction between Model and View

## Server Side
- Implementing isomorphic app
- ``src/server/index.ts`` contains server config, both for development (run-time webpack compile) and production
- ``src/server/renderer.tsx`` contains rendering task used by both dev and prod env.
- ``src/server/api.tsx`` contains all APIs that could be fetched before render.
- ``src/server/StoreFactory`` singleton pattern used for storing redux store to be calculated and transferred to the client.
- Redirects all mobile characteristic user-agent request to [The Mobile App Version](https://m.yahya.ngopi.men)

## CI/CD
Thanks for Gitlab CI and my aws account that this can be up at [https://yahya.ngopi.men](https://yahya.ngopi.men)

## TO RUN LOCALLY
- clone repo
- run `yarn install`
- run `yarn dev`