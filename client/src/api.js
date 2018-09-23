
function requestOnce(method, input, init = {}) {
  const newHeader = {
    ...init.headers,
    "method": method,
    "Authorization": "Bearer " + (localStorage.getItem("access_token") || "")
  };

  console.log("39857434");
  console.log({...init, headers: newHeader});
  return fetch(input, {...init, headers: newHeader})
    .catch(err => {
      console.error(err);
      throw err;
    });
}

export function getLoginToken(username, password) {
  return fetch("http://18.222.251.155:3000/login", {
    method: "POST",
    body: JSON.stringify({"username": username, "password": password}),
    headers: {"Content-Type": "application/json"}
  })
    .then(res => {
      if (!res.ok)
        throw Error(res.statusText);
      return res.json();
    })
    .then(body => {
      localStorage.setItem("access_token", body.access_token);
      console.log(body.access_token);
      return body.access_token;
    });
}

function requestJSON(method, input, init = {}) {
  return requestOnce(method, input, init)
    .then(res => {
      if (res.ok)
        return res.json();
      if (res.status >= 400 && res.status < 500) {
        return getLoginToken("test", "test")
          .then(res => {
            return requestOnce(method, input, init)
              .then(res => {
                if (res.ok)
                  return res.json();
                throw Error(res.statusText);
              });
          });
      }
      throw Error(res.statusText);
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
}

export function fetchAllProfs() {
  return requestJSON("GET", "http://18.222.251.155:3000/professors");
}
