import axios from 'axios';

const preloadApiToken = async () => {
  if(!process.env.HOMELISTER_API_BASE_URL){
    throw Error('HOMELISTER_API_BASE_URL env variable should be set')
  }
  if(!process.env.HOMELISTER_API_EMAIL){
    throw Error('HOMELISTER_API_BASE_URL env variable should be set')
  }
  if(!process.env.HOMELISTER_API_PASSWORD){
    throw Error('HOMELISTER_API_BASE_URL env variable should be set')
  }
    const { data } = await axios
      .create({baseURL: process.env.HOMELISTER_API_BASE_URL})
      .post('/auth/local', {
        email: process.env.HOMELISTER_API_EMAIL,
        password: process.env.HOMELISTER_API_PASSWORD
      })
    return `Bearer ${data.token}`;
}
if(!process.env.HOMELIESTER_API_AUTH_TOKEN) {
  preloadApiToken()
    .then((token) => {
      setTimeout(function(){
        console.log(JSON.stringify(token));
        process.on('SIGPIPE', process.exit);
      }, 10)
    })
    .catch(() => {
      throw new Error(`Impossible to get the auth token for the HOMELIESTER_API_AUTH_TOKEN env variable. 
      Check if Homelister API is online`);
    })
}
