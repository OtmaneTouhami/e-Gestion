import { Head } from "@inertiajs/react";

function Home() {
    return (
        <>
            <Head title="Acceuil" />
            <div className="flex items-center justify-center h-[80vh] mb-4 rounded bg-green-50 dark:bg-gray-800">
                <div className="flex items-center justify-start h-24 rounded  dark:bg-gray-800">
                    <div className="text-3xl text-gray-400 dark:text-gray-500 ml-4">
                        <div className="text-xxl text-green-500 font-bold dark:text-white">
                            Bienvenue dans la plateforme de gestion de centre de
                            formation
                        </div>
                        <div
                            align="center"
                            className="text-xxl text-grat-500 font-bold dark:text-white"
                        >
                            Ici, c'est votre espace formateur
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
