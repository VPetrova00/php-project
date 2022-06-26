<?php

class Session
{

    private static $session_id = 0;

    /**
     * @throws AccessDeniedException
     */
    public static function verifyUserIsLoggedIn(): array {
        $logged = isset($_SESSION['user_id']);

        if (!$logged) {
            throw new AccessDeniedException();
        }

        return $_SESSION;
    }

    public static function logUser(string $username, string $password): bool {
        $_SESSION['user_id'] = 5;
//        self::$session_id++;

        $_SESSION['username'] = $username;
        $_SESSION['password'] = $password;

        return true;
    }

    public static function logout(): void {
        session_destroy();
    }
}