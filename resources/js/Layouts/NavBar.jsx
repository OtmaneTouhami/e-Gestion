import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import LogOut from "@/Components/LogOut";
import { BiLogOut } from "react-icons/bi";
import AdminAside from "./AdminAside";
import FormateurAside from "./FormateurAside";

function NavBar({ children }) {
    const user = children.props.auth.user,
        [hours, setHours] = useState(new Date().getHours()),
        [minutes, setMinutes] = useState(new Date().getMinutes()),
        [logout, setLogout] = useState(false),
        { flash, counts } = usePage().props,
        [alert, setAlert] = useState(null);

    useEffect(() => {
        if (flash.message) {
            setAlert(flash.message);
            setTimeout(() => {
                setAlert(null);
                router.visit("/clear-session", {
                    method: "get",
                    preserveScroll: true,
                    preserveState: true,
                });
            }, 3000);
        }
    }, [flash.message]);

    setInterval(() => {
        let h = new Date().getHours(),
            m = new Date().getMinutes();
        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;
        setHours(h);
        setMinutes(m);
    }, 1000);

    const hide = () => setLogout(false);
    const leave = () => router.post(route("logout"));

    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>
                            <Link
                                href={route("home.admin")}
                                className="flex ml-2 md:mr-24"
                                as="button"
                            >
                                <img
                                    src="http://ofppt-eGestion.edu/storage/assets/logo.png"
                                    className="h-8 mr-3"
                                    alt="FlowBite Logo"
                                />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                    eGestion
                                </span>
                            </Link>
                            <strong>
                                <span className="bg-blue-100 text-blue-800 text-l font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                    Le {new Date().toLocaleDateString("fr-FR")}
                                </span>
                                <span className="bg-green-100 text-green-800 text-l font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                    {hours}:{minutes}
                                </span>
                            </strong>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <span className="bg-green-100 text-green-800 text-l font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                    {user.firstname} {user.lastname}
                                </span>
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src={`http://ofppt-eGestion.edu/storage/${user.avatar}`}
                                    alt="user photo"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                id="logo-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {user.roles[0].name === "administrateur" && (
                            <AdminAside counts={counts} />
                        )}
                        {user.roles[0].name === "formateur" && (
                            <FormateurAside />
                        )}
                        <li>
                            <button
                                onClick={() => setLogout(true)}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                            >
                                <BiLogOut className="w-6 h-6" />
                                <span className="flex-1 ml-3 whitespace-nowrap text-left">
                                    Log Out
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    {alert && (
                        <div
                            id="alert-border-3"
                            className={
                                alert.success
                                    ? "flex p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
                                    : "flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
                            }
                            role="alert"
                        >
                            <svg
                                className="flex-shrink-0 w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <div className="ml-3 text-sm font-medium">
                                <strong className="font-semibold underline">
                                    {alert.success ? "Success" : "Echèc"}
                                </strong>{" "}
                                {alert.text}
                            </div>
                        </div>
                    )}
                    {children}
                    {logout && <LogOut hide={hide} out={leave} />}
                </div>
            </div>
        </div>
    );
}

export default NavBar;

{
    /* <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                +
                            </p>
                        </div>
                        <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                +
                            </p>
                        </div>
                        <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                +
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            +
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                +
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                +
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                +
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                +
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            +
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                +
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                +
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                +
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                +
                            </p>
                        </div>
                    </div> */
}
