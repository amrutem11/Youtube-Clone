


class User {
    constructor(){
       
    }

    #checkUsername (username) {

      let value =  username.includes('#') ?  false : true ;

      return value;

    }
    // '#' in method name(line10) -> encapsulation -> used to make method private only accessible for internal purpose

    #checkPassword (password) {

        let value = password.length > 8 ? true : false ;

        return value;
    }

    async Signup (n, e, u, p, m, d ) {

      let isValidated =   this.#checkUsername(u) && this.#checkPassword(p);

      if (isValidated) {

        this.name = n ;
        this.email = e ;
        this.username = u ;
        this.password = p ;
        this.mobile = m ;
        this.description = d ;

        let actualData = JSON.stringify(this);
        console.log(actualData)
        

        try {
            let res = await fetch('https://masai-api-mocker.herokuapp.com/auth/register',{
                method : 'POST',

                body : actualData,

                headers: {
                    'Content-Type' : 'application/json',
                },
            })
            let data = await res.json();
            // console.log('data:',data)

            if(data.message == "Registration Success"){
                alert("Registration Successful")
            }
            else if(data.message == "Registration failed, user already exists"){
                alert (" Registration failed , User already exists")

            }   
            
        } catch(err) {
            console.log(err)
        }
        

      }
      else{
        alert ("Enter proper Username or Password");
      }

    }

    async login(u,p) {
        this.username = u;
        this.password = p;


        let actualData = JSON.stringify(this);
        

        try {
            let res = await fetch('https://masai-api-mocker.herokuapp.com/auth/login',{
                method : 'POST',

                body : actualData,

                headers: {
                    'Content-Type' : 'application/json',
                },
            })
            let data = await res.json();
            // console.log('data:',data)

            getProfile(this.username, data.token);

            window.location.href ='index.html'

             
            
        } catch(err) {
            // console.log(err)
            alert("wrong details")
        }

        


    }
}

let u1 = new  User();

function Register () {

    const name = document.getElementById ('name').value;
    const email = document.getElementById ('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById ('password').value ;
    const mobile = document.getElementById('mobile').value;
    const description = document.getElementById('description').value;

    u1.Signup(name,email,username,password,mobile,description);

}

function Login () {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById ('login-password').value ;

    u1.login(username,password);
}

async function getProfile (username,token) {

    let api = `https://masai-api-mocker.herokuapp.com/user/${username}`

    let res = await fetch(api,{
        headers: {

            'Content-Type':'application/json',

            Authorization:`Bearer ${token}`
        },
    });

    let data = await res.json();
    console.log('data:',data);
    
}