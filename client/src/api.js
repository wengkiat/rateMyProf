
function requestOnce(method, input, init = {}) {
  console.log(`requestOnce ${method}, ${input}, ${JSON.stringify(init)}`);
  const newHeader = {
    ...init.headers,
    "Authorization": "Bearer " + (localStorage.getItem("access_token") || "")
  };

  return fetch(input, {...init, method: method, headers: newHeader})
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

function requestText(method, input, init = {}) {
  return requestOnce(method, input, init)
    .then(res => {
      if (res.ok)
        return res.text();
      if (res.status >= 400 && res.status < 500) {
        return getLoginToken("test", "test")
          .then(res => {
            return requestOnce(method, input, init)
              .then(res => {
                if (res.ok)
                  return res.text();
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

function requestJSON(method, input, init = {}, def = {}) {
  return requestText(method, input, init)
    .then(text => (text ? JSON.parse(text) : def))
}

export function getAllProfs() {
  return requestJSON("GET", `http://18.222.251.155:3000/professors`, {}, []);
}

export function getProf(profID) {
  return requestJSON("GET", `http://18.222.251.155:3000/professors/${profID}`);
}

export function searchProfs(query) {
  query = query.replace(/[^a-zA-Z\d:]/g, " ");
  const url = `http://18.222.251.155:3000/professors/search/${query}`;
  return requestJSON("GET", url, {}, []);
}

export function searchProfsByName(query) {
  query = query.replace(/[^a-zA-Z\d:]/g, "");
  const url = `http://18.222.251.155:3000/professors/name/${query}`;
  return requestJSON("GET", url, {}, []);
}

export function getAllTags() {
  return requestJSON("GET", `http://18.222.251.155:3000/tags`, {}, []);
}

export function postReview(props) {
  return requestJSON("POST", `http://18.222.251.155:3000/review`,
    {
      body: JSON.stringify(props),
      headers: {"Content-Type": "application/json"}
    }
  );
}

export function getAllReviews(profID) {
  return requestJSON("GET", `http://18.222.251.155:3000/reviews/${profID}`, {}, []);
}

export function upvoteReview(reviewID) {
  return requestJSON("POST", `http://18.222.251.155:3000/review/upvote/${reviewID}`);
}

export function downvoteReview(reviewID) {
  return requestJSON("POST", `http://18.222.251.155:3000/review/downvote/${reviewID}`);
}
