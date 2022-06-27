<?php

class Session
{

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
        $sqlQuery = "SELECT * FROM `users` WHERE username = :username and password = :password";
        $selectStatement = (new Db())->getConnection()->prepare($sqlQuery);
        $selectStatement->execute(['username' => $username, 'password' => $password]);

        $user = $selectStatement->fetch();

        $_SESSION['user_id'] = $user['id'];

        $_SESSION['username'] = $username;
        $_SESSION['password'] = $password;

        return true;
    }

    public static function logout(): void {
        session_destroy();
    }
}