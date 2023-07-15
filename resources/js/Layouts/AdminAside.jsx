import { Link } from "@inertiajs/react";
import { FaChalkboardTeacher, FaHome, FaUserGraduate } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { HiOutlineNewspaper } from "react-icons/hi";
import { ImBook } from "react-icons/im";
import { SiGoogleclassroom } from "react-icons/si";
import { SlCalender } from "react-icons/sl";

function AdminAside({counts}) {
    return (
        <>
            <li>
                <Link
                    href={route("home.admin")}
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
                    href={route("formateurs.index")}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                    as="button"
                >
                    <FaChalkboardTeacher className="w-6 h-6" />
                    <span className="flex-1 ml-3 whitespace-nowrap text-left">
                        Formateurs
                    </span>
                    <span
                        title="Nombre de formateurs"
                        className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
                    >
                        {counts.nbFormateurs}
                    </span>
                </Link>
            </li>
            <li>
                <Link
                    href={route("stagiaires.index")}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                    as="button"
                >
                    <FaUserGraduate className="w-6 h-6" />
                    <span className="flex-1 ml-3 whitespace-nowrap text-left">
                        Stagiaires
                    </span>
                    <span
                        title="Nombre de stagiaires"
                        className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
                    >
                        {counts.nbStagiaires}
                    </span>
                </Link>
            </li>
            <li>
                <Link
                    href={route("filieres.index")}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                    as="button"
                >
                    <HiOutlineNewspaper className="w-6 h-6" />
                    <span className="flex-1 ml-3 whitespace-nowrap text-left">
                        Filieres
                    </span>
                    <span
                        title="Nombre de filières"
                        className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
                    >
                        {counts.nbFilieres}
                    </span>
                </Link>
            </li>
            <li>
                <Link
                    href={route("modules.index")}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                    as="button"
                >
                    <ImBook className="w-6 h-6" />
                    <span className="flex-1 ml-3 whitespace-nowrap text-left">
                        Modules
                    </span>
                    <span
                        title="Nombre de modules"
                        className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
                    >
                        {counts.nbModules}
                    </span>
                </Link>
            </li>
            <li>
                <Link
                    href={route("groupes.index")}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                    as="button"
                >
                    <SiGoogleclassroom className="w-6 h-6" />
                    <span className="flex-1 ml-3 whitespace-nowrap text-left">
                        Groupes
                    </span>
                    <span
                        title="Nombre de groupes"
                        className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
                    >
                        {counts.nbGroups}
                    </span>
                </Link>
            </li>
            <li>
                <Link
                    href={route("emplois.index")}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                    as="button"
                >
                    <SlCalender className="w-6 h-6" />
                    <span className="flex-1 ml-3 whitespace-nowrap text-left">
                        Emplois
                    </span>
                </Link>
            </li>
            <li>
                <Link
                    href={route("users.index")}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                    as="button"
                >
                    <GrUserAdmin className="w-6 h-6" />
                    <span className="flex-1 ml-3 whitespace-nowrap text-left">
                        Utilisateurs
                    </span>
                    <span
                        title="Nombre d'utilisateurs"
                        className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
                    >
                        {counts.nbUsers}
                    </span>
                </Link>
            </li>
        </>
    );
}

export default AdminAside;
