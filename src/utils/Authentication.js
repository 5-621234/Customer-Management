export const authenticateUser=()=>{
    let token =localStorage.getItem('auth')
    if(!token){
        return 
    }
    // code for backend
    return localStorage.getItem("role")
}


export const authenticateAdmin =()=>{
    return authenticateUser() === "ROLE_ADMIN"
}

