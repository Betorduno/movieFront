const baseURL = 'http://localhost:8000/api'
var token = localStorage.getItem('access_token')

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`);

var myHeader = new Headers();
myHeader.append("Accept", "application/json");
myHeader.append("Authorization", `Bearer ${token}`);

export function filmAll() {
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    return fetch(`${baseURL}/films`, requestOptions)
}

export function filmID(idFilm) {

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    return fetch(`${baseURL}/film/${idFilm}`, requestOptions)  
}

export function filmCreate(data) {

var formdata = new FormData();
formdata.append("title", data.title);
formdata.append("sipnosis", data.sipnosis);
formdata.append("year", data.year);

var requestOptions = {
  method: 'POST',
  headers: myHeader,
  body: formdata,
  redirect: 'follow'
};

return fetch(`${baseURL}/film`, requestOptions)
}

export function filmUpdate(dataUpdate) {
    var raw = JSON.stringify(dataUpdate);


    console.log("esta es la data de update",)
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    return fetch(`${baseURL}/film/${dataUpdate.id}`, requestOptions)
}

export function filmDelete(IdDelete) {

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };
      
    return fetch(`${baseURL}/film/${IdDelete}`, requestOptions)
}