<?php

namespace App\Http\MyClasses;

use App\Mail\SendAuthenticationData;
use Illuminate\Support\Facades\Mail;

class EmailManager
{
    static function check($email)
    {

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => "https://email-checker.p.rapidapi.com/verify/v1?email=$email",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => [
                "X-RapidAPI-Host: email-checker.p.rapidapi.com",
                "X-RapidAPI-Key: 405f45595emshb8528c3516237edp1cf6f6jsn3012fdaf7c60"
            ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            dd($err);
        } else {
            dd($response);
        }
    }

    static function send($to, $name, $email, $password)
    {
        Mail::to($to, $name)
            ->queue(new SendAuthenticationData($name, $email, $password));
    }
}
