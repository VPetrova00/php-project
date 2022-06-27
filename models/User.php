<?php

class User implements JsonSerializable
{
    private $id;

    private $username;

    private $email;

    private $password;


    public function __construct(int $id, string $username, string $email, string $password) {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }

    public function getId(): int {
        return $this->id;
    }

    public function getUsername(): string {
        return $this->username;
    }

    public function getEmail(): string {
        return $this->email;
    }

    public function getPassword(): string {
        return $this->password;
    }


    public function jsonSerialize(): array {
        return get_object_vars($this);
    }

    public static function createFromAssoc(array $assocUser): User {
        return new User($assocUser['id'], $assocUser['username'], $assocUser['email'], $assocUser['password']);
    }
}