<?php

spl_autoload_register(function($className) {
    $paths = [
        "../libs",
        "../exceptions",
    ];

    foreach ($paths as $path) {
        $classPath = "$path/$className.php";
        if (file_exists($classPath)) {
            require_once $classPath;
        }
    }
});

set_exception_handler(function ($exception) {

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
        $response = ['error' => 'Unknown error occured.'];
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);

});
