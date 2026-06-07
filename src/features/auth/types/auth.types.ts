export interface User {
    _id: string,
    name: string,
    email: string
}

// login

export interface LoginPayload {
    email: string,
    password: string
}

export interface LoginResponse {
    accessToken: string,
    user: User
}


// register

export interface RegisterPayload {
    name: string,
    email: string,
    password: string
}

export interface RegisterResponse {
    user: User
}