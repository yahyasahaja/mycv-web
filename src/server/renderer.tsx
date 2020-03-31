import { RequestHandler } from 'express';
import { renderToString } from 'react-dom/server';
import { renderOnServer } from '../client';
import { Compiler } from 'webpack';
import path from 'path';
import { config } from './configs';
import fs from 'fs';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { ServerStyleSheet } from 'styled-components';
import { Store } from 'redux';
import { setOrigin } from '../client/store/Origin/actions';
import url from 'url';
import { Helmet } from 'react-helmet';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      store: Store;
    }
  }
}

export default function serverRenderer(options): RequestHandler {
  let template = '';

  if (config.isDev) {
    const clientCompiler: Compiler = options.clientCompiler;
    const filename = path.join(clientCompiler.outputPath, 'template.html');
    (clientCompiler.outputFileSystem as any).readFile(filename, function (
      err,
      result
    ) {
      template = result.toString();
    });
  } else {
    template = fs
      .readFileSync(path.resolve('./build/client/template.html'))
      .toString();
  }

  return async (req, res) => {
    const urlobj = url.parse(req.originalUrl);
    urlobj.protocol = req.protocol;
    urlobj.host = req.get('host') || '';
    const requrl = url.format(urlobj);
    req.store?.dispatch(setOrigin(requrl));

    const serverState = req.store?.getState();
    const ReactComponent = await renderOnServer(
      req.baseUrl,
      req.store as Store
    );
    const helmet = Helmet.renderStatic();
    const materialUISheets = new ServerStyleSheets();
    const styledSheets = new ServerStyleSheet();
    const result = renderToString(
      styledSheets.collectStyles(materialUISheets.collect(ReactComponent))
    );
    const cssStrig = materialUISheets.toString();
    const html = template
      .toString()
      .replace('{{content}}', result)
      .replace(
        '{{state}}',
        serverState ? JSON.stringify(req.store.getState()) : '{}'
      )
      .replace('.material-ui{margin:0}', cssStrig)
      .replace('<head>', `<head>${helmet.meta.toString()}`)
      .replace('<head>', `<head>${helmet.title.toString()}`)
      .replace('</head>', `${styledSheets.getStyleTags()}</head>`);
    res.send(html);
    res.end();
  };
}
