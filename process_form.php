<?php
header('Content-Type: application/json');

$response = ['success' => false, 'message' => ''];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    if (empty($name) || empty($email) || empty($message)) {
        $response['message'] = 'Por favor, preencha todos os campos.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Por favor, forneça um endereço de e-mail válido.';
    } else {
        $to = 'seu-email@exemplo.com'; // Substitua pelo seu endereço de e-mail
        $subject = 'Nova mensagem do formulário de contato';
        $body = "Nome: $name\n";
        $body .= "Email: $email\n\n";
        $body .= "Mensagem:\n$message";
        $headers = "From: $email";

        if (mail($to, $subject, $body, $headers)) {
            $response['success'] = true;
            $response['message'] = 'Mensagem enviada com sucesso!';
        } else {
            $response['message'] = 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.';
        }
    }
} else {
    $response['message'] = 'Método de requisição inválido.';
}

echo json_encode($response);