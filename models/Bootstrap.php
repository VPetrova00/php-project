<?php

class Bootstrap {
    public static function initApp() {

        self::initClassAutoLoader();

        self::initExceptionHandler();

    }

    private static function initClassAutoLoader(): void {

        spl_autoload_register(function($className) {
            $paths = [
                "../models",
                "../exceptions",
                "../endpointsHandlers"
            ];

            foreach ($paths as $path) {
                $classPath = "$path/$className.php";
                if (file_exists($classPath)) {
                    require_once $classPath;
                }
            }
        });
    }

    private static function initExceptionHandler(): void {

        set_exception_handler(function ($exception) {
            var_dump($exception);
            if ($exception instanceof PDOException) {
                http_response_code(500);
                error_log($exception->getMessage());
                $response = ['error' => 'Internal server error. Please, retry your request later.'];
            } elseif ($exception instanceof NotFoundException) {
                http_response_code(404);
                $response = ['error' => $exception->getMessage()];
            } elseif ($exception instanceof AccessDeniedException) {
                http_response_code(403);
                $response = ['error' => "Access denied"];
            } else {
                http_response_code(500);
                error_log($exception->getMessage());
                $response = ['error' => 'Unknown error occurred.'];
            }

            echo json_encode($response, JSON_UNESCAPED_UNICODE);

        });
    }
}