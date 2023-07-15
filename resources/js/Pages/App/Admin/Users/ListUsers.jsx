import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { BiShow } from "react-icons/bi";
import { BsPersonFillAdd } from "react-icons/bs";
import { BsFillInfoSquareFill } from "react-icons/bs";

function ListUsers({ users, counts, auth }) {
    const { data, setData, processing, submit, reset } = useForm({
        search: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();
        submit("get", route("users.index"), {
            preserveState: true,
        });
    };

    const clearSearch = () => {
        reset();
        router.visit(route("users.index"));
    };

    const isAdmin = (id) =>
        users.data.find((user) => Number(user.id) === Number(id)).roles
            .length !== 0;

    const toggle_admin = (id) => router.post(route("users.admin", id));

    // console.log(users.data[0].roles.length);

    console.log(auth);

    return (
        <>
            <Head title="Liste des utilisateurs" />
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center justify-start h-24 rounded  dark:bg-gray-800">
                    <div className="text-3xl text-gray-400 dark:text-gray-500 ml-4">
                        <div className="text-xxl text-black font-bold dark:text-white">
                            Liste des utilisateurs
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end h-24 rounded  dark:bg-gray-800">
                    <div className="text-2xl text-gray-400 dark:text-gray-500 ml-4">
                        <Link
                            href={route("users.create")}
                            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
                            as="button"
                        >
                            Ajouter un utilisateur
                            <BsPersonFillAdd className="w-5 h-5 ml-2 -mr-1" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="flex items-center col-span-2 justify-center rounded bg-white-50 h-16 dark:bg-gray-800">
                    <div className="mt-2">
                        <button
                            onClick={clearSearch}
                            className="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                        >
                            Effacer la recherche
                        </button>
                    </div>
                </div>
                <div className="p-3 col-span-2 rounded  h-16 dark:bg-gray-800">
                    <form onSubmit={submitHandler} method="post">
                        <div className="flex">
                            <div className="relative w-full">
                                <input
                                    type="search"
                                    name="search"
                                    value={data.search}
                                    onChange={(e) =>
                                        setData("search", e.target.value)
                                    }
                                    className="block p-2.5 w-full z-20 text-sm text-gray-900  rounded-lg  border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-green-500"
                                    placeholder="Cherecher par nom ou prenom"
                                />
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-green-500 rounded-r-lg border border-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-600"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="grid gap-4 mb-4">
                <div className="relative overflow-x-auto sm:rounded-lg">
                    <table className="w-full text-lg text-left  dark:text-gray-400">
                        <thead
                            className="text-sm text-white uppercase bg-green-500 dark:bg-green-700 dark:text-gray-400"
                            align="center"
                        >
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nom complet
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Admin
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody align="center">
                            {users.data.map(
                                (
                                    { id, firstname, lastname, roles, avatar },
                                    index
                                ) => (
                                    <tr
                                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-green-100"
                                        key={index}
                                    >
                                        <td className="px-6 py-4 text-gray-500">
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src={`http://ofppt-eGestion.edu/storage/${avatar}`}
                                                alt={`${lastname} ${firstname}`}
                                            />
                                        </td>
                                        <th className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                            {lastname} {firstname}
                                        </th>
                                        <td className="px-6 py-4 text-gray-500">
                                            <label className="relative inline-flex items-center mt-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    value=""
                                                    className="sr-only peer"
                                                    checked={isAdmin(id)}
                                                    onChange={() =>
                                                        toggle_admin(id)
                                                    }
                                                    disabled={
                                                        Number(id) ===
                                                        Number(auth.user.id)
                                                    }
                                                />
                                                <div className="w-11 h-6 bg-red-600 rounded-full peer dark:bg-red-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-red-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                            </label>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                href={route("users.show", id)}
                                                as="button"
                                                title="Plus d'informations"
                                                className="bg-blue-100 text-blue-800 text-sm font-medium  px-3.5 py-1.5 rounded dark:bg-blue-900 dark:text-blue-300"
                                            >
                                                <BiShow className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {counts.nbUsers > 9 && (
                <div className="flex items-center justify-center h-16 mb-4 rounded  dark:bg-gray-800">
                    <Link
                        href={users.prev_page_url}
                        disabled={users.prev_page_url === null}
                        as="button"
                        className="inline-flex text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm px-4 py-2 mr-3 text-center inline-flex items-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        Previous
                    </Link>
                    <Link
                        href={users.next_page_url}
                        as="button"
                        disabled={users.next_page_url === null}
                        className="inline-flex text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm px-4 py-2 mr-3 text-center inline-flex items-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
                    >
                        Next
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 ml-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </Link>
                </div>
            )}
        </>
    );
}

export default ListUsers;
