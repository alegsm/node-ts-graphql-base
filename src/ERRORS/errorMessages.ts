export class RegisterErrors {
    static ERROR_EMAIL_DUPLICATED= "El email ya existe";
    static ERROR_EMAIL_INVALID = "El email no es válido";
    static ERROR_EMAIL_SHORT = "El email debe tener al menos 3 caracteres";
    static ERROR_PASSWORD_SHORT = "La contraseña debe tener al menos 3 caracteres";
}

export class LoginErrors {
    static ERROR_EMPTY_CREDENTIALS = "Ambas credenciales son necesarias";
    static ERROR_BAD_CREDENTIALS = "Las credenciales son inválidas";
}

export class CurrentUserErrors {
    static ERROR_NOT_LOGGED_IN = "Ambas credenciales son necesarias";

}
