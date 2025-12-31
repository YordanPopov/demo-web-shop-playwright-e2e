export interface LogInData {
    rememberMe?: boolean;
    email: string;
    password: string;
}

export interface LoginValidationErrors {
    global?: string;
    email?: string;
}

export interface LoginTestCase {
    description: string;
    data: LogInData;
}

export interface InvalidLoginData {
    data: LogInData;
    expectedErrors?: {
        global?: string;
        email?: string;
    };
}

export interface invalidLoginTestCase {
    description: string;
    data: LogInData;
    expectedError?: {
        global?: string;
        email?: string;
    };
}
