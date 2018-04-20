module.exports = function ({ block }) {
    return `<!DOCTYPE html>
  <html>
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
⚠︎     <meta charset="utf-8"/>
      <title></title>
  </head>
  <body>
      <div id="root"></div>
⚠︎     <script src="${block}.js"></script>
  </body>
  </html>
`;
};
