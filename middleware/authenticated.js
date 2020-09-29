export default function ({ store, redirect }) {
  // If the user is not authenticated
  var token = localStorage.getItem('access_token');
  if (!token) {
    return redirect('/')
  }
}