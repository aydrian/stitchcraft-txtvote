exports = function(imageUrl) {
  const http = context.services.get('http');
  return http.get({ url: imageUrl }).then(resp => {
    return resp.body;
  });
};