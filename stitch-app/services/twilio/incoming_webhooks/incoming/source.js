exports = async function(payload, response) {
  response.setHeader("Content-Type", "text/html");
  
  const entryKey = payload.Body.trim();
  let message = `Whoops`;
  
  try {
    if(parseInt(payload.NumMedia)) {
      // new entry
      const result = await context.functions.execute('createEntry', payload.From, entryKey, payload.MediaUrl0, payload.MediaContentType0);
      message = `Thank you for your entry`;
    } else {
      // vote for entry
      const result = await context.functions.execute('vote', entryKey, payload.From)
      message = `Thank you for your vote`;
      
    }
  } catch (e) {
    console.log(e);
  }
  
  response.setBody(`
  <?xml version="1.0" encoding="UTF-8"?>
  <Response>
    <Message>${message}</Message>
  </Response>
  `);
  return;
};