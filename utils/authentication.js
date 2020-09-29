const baseURL = 'http://localhost:8000/api'

export function register(data) {

  var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      
      var formdata = new FormData();
      formdata.append("name", data.names);
      formdata.append("nickname", data.nickname);
      formdata.append("email", data.email);
      formdata.append("password", data.password);
      formdata.append("password_confirmation", data.confirm_password);
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
      
      return fetch(baseURL+'/register', requestOptions)
        
}

export function login(data) {

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  var formdata = new FormData();
  formdata.append("email", data.email);
  formdata.append("password", data.password);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  return fetch("http://127.0.0.1:8000/api/login", requestOptions)
}