export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    let jwt = JSON.parse(localStorage.getItem('jwt'));
  
    if (jwt != null) {
      return { Authorization: jwt };
    } else {
      return {};
    }
  }