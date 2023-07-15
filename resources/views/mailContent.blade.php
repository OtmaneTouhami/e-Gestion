<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Envoyer les données d'authentfication</title>
</head>

<body>
    <h1>Bonjour {{ $fullname }}</h1>
    <p>Cher(e) destinataire,</p>
    <br>
    <p> Nous vous envoyons cet email pour vous informer que celui-ci contient des données sensibles liées à votre compte
        professionnel. Les informations incluses comprennent votre adresse email professionnelle ainsi qu'un mot de
        passe confidentiel. Nous tenons à souligner que ces informations sont strictement personnelles et ne doivent
        être partagées avec personne.</p>
    <br>
    <p>
        Ces informations de connexion vous permettent d'accéder à notre plateforme de gestion d'un centre de formation.
        Cette plateforme est conçue pour faciliter votre expérience et vous offrir un accès sécurisé à diverses
        fonctionnalités liées à votre rôle dans notre centre.
    </p>
    <br><br>
    <p>
        Nous vous rappelons l'importance de garder ces informations confidentielles et de ne pas les divulguer à des tiers.
        Assurez-vous de les protéger en évitant de les enregistrer sur des appareils non sécurisés et en utilisant des mots de passe forts et uniques.
    </p>
    <br>
    <p>
            Si vous avez des questions ou des préoccupations concernant l'accès à la plateforme ou la sécurité de vos données, n'hésitez pas à nous contacter. Nous sommes là pour vous aider.
    </p>
    <h3>Voici vos données d'authentification:</h3>
    <div>
        <p><strong>E-mail: </strong>{{ $email }}</p>
        <p><strong>Mot de passe: </strong>{{ $password }}</p>
    </div>
    <br>
    <p>
        Nous vous remercions de votre compréhension et de votre coopération.
    </p>
    <br>
    <p>
        Cordialement,    
    </p>
    <br>
    <p>
        Votre équipe de gestion du centre de formation
    </p>
</body>

</html>
