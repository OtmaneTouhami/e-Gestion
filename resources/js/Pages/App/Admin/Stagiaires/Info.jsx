function Info({ stagiaire }) {
    const { info, year, group } = stagiaire,
        {
            firstname,
            lastname,
            gender,
            birth_date,
            adresse,
            presonal_email,
            telephone,
            start_date,
            end_date,
        } = info;

    console.log(stagiaire);
    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                    <span className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Nom
                    </span>
                    <p className="block mb-2 ml-2 mt-2 text-lg font-medium text-gray-900 dark:text-white">
                        {lastname}
                    </p>
                </div>
                <div className="w-full">
                    <span className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Prénom
                    </span>
                    <p className="block mb-2 ml-2 mt-2 text-lg font-medium text-gray-900 dark:text-white">
                        {firstname}
                    </p>
                </div>
                <div className="w-full">
                    <span className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Adresse
                    </span>
                    <p className="block mb-2 ml-2 mt-2 text-lg font-medium text-gray-900 dark:text-white">
                        {adresse}
                    </p>
                </div>
                <div className="w-full">
                    <span className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Genre
                    </span>
                    <p className="block mb-2 ml-2 mt-2 text-lg font-medium text-gray-900 dark:text-white">
                        {gender === "male" ? "Homme" : "Femme"}
                    </p>
                </div>
                <div className="sm:col-span-2">
                    <span className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Adresse e-mail personnel
                    </span>
                    <p className="block mb-2 ml-2 mt-2 text-lg font-medium text-gray-900 dark:text-white">
                        {presonal_email}
                    </p>
                </div>
                <div className="w-full">
                    <span className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Année
                    </span>
                    <p className="block mb-2 ml-2 mt-2 text-lg font-medium text-gray-900 dark:text-white">
                        {year === "first" ? (
                            <>
                                1<sup>ére</sup> année
                            </>
                        ) : year === "second" ? (
                            <>
                                2<sup>éme</sup> année
                            </>
                        ) : (
                            "graduated"
                        )}
                    </p>
                </div>
                <div className="w-full">
                    <span className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Groupe
                    </span>
                    <p className="block mb-2 ml-2 mt-2 text-lg font-medium text-gray-900 dark:text-white">
                        {group.filiere.code}
                        {group.number}
                    </p>
                </div>
                <div className="w-full">
                    <span className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        N° de telephone
                    </span>
                    <p className="block mb-2 ml-2 mt-2 text-lg font-medium text-gray-900 dark:text-white">
                        {telephone}
                    </p>
                </div>
                <div className="w-full">
                    <span className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Date de naissance
                    </span>
                    <p className="block mb-2 ml-2 mt-2 text-lg font-medium text-gray-900 dark:text-white">
                        {birth_date}
                    </p>
                </div>
                <div className="w-full">
                    <span className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Date de debut
                    </span>
                    <p className="block mb-2 ml-2 mt-2 text-lg font-medium text-gray-900 dark:text-white">
                        {start_date}
                    </p>
                </div>
                {end_date && (
                    <div className="w-full">
                        <span className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                            Date de Fin
                        </span>
                        <p className="block mb-2 ml-2 mt-2 text-lg font-medium text-gray-900 dark:text-white">
                            {end_date}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Info;
