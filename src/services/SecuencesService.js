import axios from 'axios';


const endpoint = "";


const currentUser = async () => {

    const endpoint = host_backend + endpoint_currentUser;

    var user = {};

    const result = await axios.get(endpoint)

    console.log(`***********--  RESULT:  ${ JSON.stringify(result) }`);
    if(result && result.data){
        user = result.data;
    }

    console.log(`***********--  USER:  ${ JSON.stringify(user) }`);

    return user;
}