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
        $_SESSION['user_id'] = self::$session_id;
        self::$session_id++;

        $_SESSION['username'] = $username;

        return true;
    }

    public static function logout(): void {
        session_destroy();
    }
}