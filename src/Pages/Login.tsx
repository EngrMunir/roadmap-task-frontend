import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import { TUser } from "../types";
import { useAuth } from "../hooks/useAuth";

type TLogin ={
    email:string,
    password:string
};

const Login = () => {
    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<TLogin>();
    const navigate = useNavigate();

    const onSubmit = async(data:TLogin) =>{
     const email = data.email;
     const password = data.password;

     const res =  await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({email, password})
    });

     if (!res.ok) {
        alert("Login failed");
        return;
     }

  const result = await res.json();

  if (result.success) {
    
        const token = result.data.accessToken;
        const decoded = jwtDecode<{name:string, email: string; role: "user" | "admin" }>(token);
        const user: TUser = {
                name: decoded.name,
                email: decoded.email,
                role: decoded.role,
            };
        login(user, token)
        
        navigate('/');
    } else {
            alert(result.message || "Login failed");
        }
    }

    return (
        <div>
        <div className="mx-auto md:w-1/2">
           <h2 className="text-3xl mb-6 text-center">Please Login</h2>
           <form onSubmit={handleSubmit(onSubmit)}>
              
               <input type="email" placeholder="Email" {...register('email', {required:true})} className="border w-full py-2 px-4 mb-4" />
               {
                    errors.email && <span className="text-red-500">Email is required</span>
                }
               <br />
               <input placeholder="Password" {...register('password',{required:true})} className="border w-full py-2 px-4 mb-4" />
               {
                    errors.password && <span className="text-red-500">Password is required</span>
                }
               <br />
               <button className="btn btn-secondary w-full mb-4" type="submit">Login</button>
           </form>
           <p className="text-center mb-5">New here? Please <Link className="text-blue-500" to="/register">Register</Link> </p>
       </div>  
      </div>   
    );
};

export default Login;