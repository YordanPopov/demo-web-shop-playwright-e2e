export interface LogInData {
    rememberMe?: boolean;
    email: string;
    password: string;
}

export interface LoginValidationErrors {
    global?: string;
    email?: string;
}
