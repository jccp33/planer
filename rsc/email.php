<?php
// JSON response
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/json");

// POST request to create a new user
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the data from the request body
    $data = json_decode(file_get_contents('php://input'), true);
    // check all data
    if(array_key_exists('receiver', $data) && array_key_exists('subject', $data) && array_key_exists('message', $data)){
        try {
            $headers = "From: admin@appsevolution.com.mx";
            $email = mail($data['receiver'], $data['subject'], $data['message'], $headers);
            $response = [
                'response' => $email,
                'message' => "success",
                'data' => [
                    'from' => 'admin@appsevolution.com.mx',
                    'to' => $data['receiver'],
                    'subject' => $data['subject'],
                    'message' => $data['message']
                ]
            ];
            echo(json_encode($response));
        } catch (\Throwable $th) {
            $response = [
                'response' => 0,
                'message' => $th->getMessage(),
                'data' => null,
            ];
            echo(json_encode($response));
        }
    }else{
        $response = [
            'response' => 0,
            'message' => "missing data in array",
            'data' => null,
        ];
        echo(json_encode($response));
    }
}else{
    $response = [
        'response' => 0,
        'message' => "Invalid http method!",
        'data' => null,
    ];
    echo(json_encode($response));
}
?>
