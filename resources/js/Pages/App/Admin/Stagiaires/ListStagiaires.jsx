import { Head, Link, router, useForm } from "@inertiajs/react";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { CgUserAdd } from "react-icons/cg";

function ListStagiaires({ stagiaires, counts }) {
    const { data, setData, processing, submit, reset } = useForm({
        search: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();
        submit("get", route("stagiaires.index"), {
            preserveState: true,
        });
    };

    const clearSearch = () => {
        reset();
        router.visit(route("stagiaires.index"));
    };

    return (
        <>
            <Head title="Liste des stagiaires" />
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center justify-start h-24 rounded  dark:bg-gray-800">
                    <div className="text-3xl text-gray-400 dark:text-gray-500 ml-4">
                        <div className="text-xxl text-black font-bold dark:text-white">
                            Liste des stagiaires
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end h-24 rounded  dark:bg-gray-800">
                    <div className="text-2xl text-gray-400 dark:text-gray-500 ml-4">
                        <Link
                            href={route("stagiaires.create")}
                            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
                            as="button"
                        >
                            Ajouter un stagiaire
                            <CgUserAdd className="w-5 h-5 ml-2" />
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
                                    placeholder="Cherecher par le nom ou le prenom"
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
            <div className="grid grid-cols-3 gap-4 mb-4">
                {stagiaires.data.length > 0 ? (
                    stagiaires.data.map(({ info, group, id }, index) => (
                        <div
                            className="flex items-center justify-center rounded  h-fit dark:bg-gray-800"
                            key={index}
                        >
                            <div className="flex flex-col items-center justify-center pb-2">
                                <div className="flex items-center space-x-4 pt-4">
                                    <img
                                        className="w-20 h-20 rounded-full"
                                        src={`http://ofppt-eGestion.edu/storage/${info.avatar}`}
                                        alt=""
                                    />
                                    <div className=" grid font-medium text-xl mt-4  dark:text-white">
                                        <div>
                                            <span className="bg-green-100 text-green-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                                {info.lastname} {info.firstname}
                                            </span>
                                        </div>
                                        <div className="flex justify-center text-gray-500">
                                            {group.filiere.code}
                                            {group.number}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <Link
                                        href={route("stagiaires.show", id)}
                                        as="button"
                                        title="Plus d'informations"
                                        className="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                                    >
                                        <BsFillInfoSquareFill />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center col-span-3 justify-center h-96 rounded  dark:bg-gray-800">
                        <div className="text-3xl  text-gray-400 dark:text-gray-500 ml-4">
                            <div className="text-xxl text-black font-bold dark:text-white">
                                Pas de stagiaires pour le momment!
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {counts.nbStagiaires > 9 && (
                <div className="flex items-center justify-center h-16 mb-4 rounded  dark:bg-gray-800">
                    <Link
                        href={stagiaires.prev_page_url}
                        disabled={stagiaires.prev_page_url === null}
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
                        href={stagiaires.next_page_url}
                        as="button"
                        disabled={stagiaires.next_page_url === null}
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

export default ListStagiaires;
