import express from 'express';
import { renderToString } from 'react-dom/server';
import { renderOnServer } from '../client';
import { Compiler } from 'webpack';
import path from 'path';
import { config } from './configs';
import fs from 'fs';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { ServerStyleSheet } from 'styled-components';

export default function serverRenderer(options): express.RequestHandler {
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
    const ReactComponent = await renderOnServer(req.baseUrl);
    const materialUISheets = new ServerStyleSheets();
    const styledSheets = new ServerStyleSheet();
    const result = renderToString(
      styledSheets.collectStyles(materialUISheets.collect(ReactComponent))
    );
    const cssStrig = materialUISheets.toString();
    // console.log(result);
    const html = template
      .toString()
      .replace('{{content}}', result)
      .replace('.material-ui{margin:0}', cssStrig)
      .replace('</head>', `${styledSheets.getStyleTags()}</head>`);
    res.send(html);
    res.end();
  };
}
