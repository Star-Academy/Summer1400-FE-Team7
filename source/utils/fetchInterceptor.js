const fetchInterceptor = async (endpoint, method, body) => {
  let response = await fetch(`${BASE_URL}/${endpoint}`, {
    method,
    body,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
    },
  });

  return response;
};
