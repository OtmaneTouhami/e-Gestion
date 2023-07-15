import { Link } from "@inertiajs/react";
import { FaHome } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { GrDocumentVerified } from "react-icons/gr";

function FormateurAside() {
    return (
        <>
            <li>
                <Link
                    href={route("home.formateur")}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                    as="button"
                >
                    <FaHome className="w-6 h-6" />
                    <span className="flex-1 ml-3 whitespace-nowrap text-left">
                        Acceuil
                    </span>
                </Link>
            </li>
            <li>
                <Link
                    href={route('emplois.formateur')}
                    method="get"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                    as="button"
                >
                    <SlCalender className="w-6 h-6" />
                    <span className="flex-1 ml-3 whitespace-nowrap text-left">
                        Les emplois du temps
                    </span>
                </Link>
            </li>
            <li>
                <Link
                    href={route('cours.index')}
                    method="get"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                    as="button"
                >
                    <MdPlayLesson className="w-6 h-6" />
                    <span className="flex-1 ml-3 whitespace-nowrap text-left">
                        Les Cours
                    </span>
                </Link>
            </li>
            <li>
                <Link
                    href={route('exercices.index')}
                    method="get"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                    as="button"
                >
                    <GrDocumentVerified className="w-6 h-6" />
                    <span className="flex-1 ml-3 whitespace-nowrap text-left">
                        Les Exercices
                    </span>
                </Link>
            </li>
        </>
    );
}

export default FormateurAside;
