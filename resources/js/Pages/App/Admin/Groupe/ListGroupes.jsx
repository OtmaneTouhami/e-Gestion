import { Head, Link, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Ajouter from "./Ajouter";
import { BiShow } from "react-icons/bi";
import { AiFillEdit, AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Edit from "./Edit";
import Delete from "@/Components/Delete";

function ListGroupes({ groupes, counts, filieres }) {
    const { data, setData, processing, submit, reset } = useForm({
            search: "",
            filter: "",
        }),
        [add, setAdd] = useState(false),
        [del, setDel] = useState({ id: "", inDelete: false }),
        [edit, setEdit] = useState({ id: "", inEdit: false });

    const hideAddModal = () => setAdd(false);
    const hideDelete = () => setDel({ id: "", inDelete: false });
    const hideEdit = () => setEdit({ id: "", inEdit: false });

    const destroy = () => {
        router.delete(route("groupes.destroy", del.id));
        hideDelete();
    };

    const submitHandler = (e) => {
        e.preventDefault();
        submit("get", route("groupes.index"), {
            preserveState: true,
        });
    };

    const getGroupe = (id) =>
        groupes.data.find((filiere) => Number(filiere.id) === Number(id));

    const getLibelle = (id) =>
        `${getGroupe(id).filiere.code}${getGroupe(id).number}`;

    const clearSearch = () => {
        reset();
        router.get(route("groupes.index"));
    };

    // useEffect(() => console.log(groupes.data[0].year), [groupes]);

    return (
        <>
            <Head title="Liste des groupes" />
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center justify-start h-24 rounded  dark:bg-gray-800">
                    <div className="text-3xl text-gray-400 dark:text-gray-500 ml-4">
                        <div className="text-xxl text-black font-bold dark:text-white">
                            Liste des groupes
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end h-24 rounded  dark:bg-gray-800">
                    <div className="text-2xl text-gray-400 dark:text-gray-500 ml-4">
                        <button
                            onClick={() => setAdd(true)}
                            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
                        >
                            Ajouter un groupe
                            <AiOutlineUsergroupAdd className="w-5 h-5 ml-2 -mr-1" />
                        </button>
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
                    <form onSubmit={submitHandler}>
                        <div className="flex">
                            <select
                                name="filter"
                                value={data.filter}
                                onChange={(e) =>
                                    setData("filter", e.target.value)
                                }
                                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                            >
                                <option value="">Tous</option>
                                {filieres.map(({ id, code }, index) => (
                                    <option value={id} key={index}>
                                        {code}
                                    </option>
                                ))}
                            </select>
                            <div className="relative w-full">
                                <input
                                    type="search"
                                    name="search"
                                    value={data.search}
                                    onChange={(e) =>
                                        setData("search", e.target.value)
                                    }
                                    className="block p-2.5 w-full z-20 text-sm text-gray-900  rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-green-500"
                                    placeholder="Enter le n° du groupe"
                                    required
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
                {groupes.data.length > 0 ? (
                    <div className="relative overflow-x-auto sm:rounded-lg">
                        <table className="w-full text-lg text-left  dark:text-gray-400">
                            <thead
                                className="text-sm text-white uppercase bg-green-500 dark:bg-green-700 dark:text-gray-400"
                                align="center"
                            >
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Groupe
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Filière
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nombre des stagiaires
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Limite stagiaires
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Année
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody align="center">
                                {groupes.data.map(
                                    (
                                        {
                                            id,
                                            number,
                                            nb_stagiaires,
                                            max_nb,
                                            filiere,
                                            year,
                                        },
                                        index
                                    ) => (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-green-100"
                                            key={index}
                                        >
                                            <th className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                                {`${filiere.code}${number}`}
                                            </th>
                                            <td className="px-6 py-4 text-gray-500">
                                                {filiere.libelle}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {nb_stagiaires}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {max_nb}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {year === "first" ? (
                                                    <>
                                                        1<sup>ère</sup>
                                                    </>
                                                ) : year === "second" ? (
                                                    <>
                                                        2<sup>éme</sup>
                                                    </>
                                                ) : (
                                                    "Les deux"
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="w-48 flex justify-between">
                                                    <Link
                                                        href={route(
                                                            "groupes.show",
                                                            id
                                                        )}
                                                        as="button"
                                                        title="Plus d'informations"
                                                        className="bg-blue-100 text-blue-800 text-sm font-medium  px-3.5 py-1.5 rounded dark:bg-blue-900 dark:text-blue-300"
                                                    >
                                                        <BiShow className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setEdit({
                                                                id,
                                                                inEdit: true,
                                                            })
                                                        }
                                                        title="Modifier"
                                                        className="bg-yellow-100 text-yellow-800 text-sm font-medium  px-3.5 py-1.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
                                                    >
                                                        <AiFillEdit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setDel({
                                                                id,
                                                                inDelete: true,
                                                            })
                                                        }
                                                        title="Supprimer"
                                                        className="bg-red-100 text-red-800 text-sm font-medium  px-3.5 py-1.5 rounded dark:bg-red-900 dark:text-red-300"
                                                    >
                                                        <RiDeleteBin6Fill className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex items-center col-span-3 justify-center h-96 rounded  dark:bg-gray-800">
                        <div className="text-3xl  text-gray-400 dark:text-gray-500 ml-4">
                            <div className="text-xxl text-black font-bold dark:text-white">
                                Pas de groupes pour le momment!
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {counts.nbGroupes > 10 && (
                <div className="flex items-center justify-center h-16 mb-4 rounded  dark:bg-gray-800">
                    <Link
                        href={groupes.prev_page_url}
                        disabled={groupes.prev_page_url === null}
                        as="button"
                        className="inline-flex text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm px-4 py-2 mr-3 text-center items-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
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
                        href={groupes.next_page_url}
                        as="button"
                        disabled={groupes.next_page_url === null}
                        className="inline-flex text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm px-4 py-2 mr-3 text-center items-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
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
            {add && <Ajouter end={hideAddModal} filieres={filieres} />}
            {edit.inEdit && (
                <Edit
                    end={hideEdit}
                    groupe={getGroupe(edit.id)}
                    filieres={filieres}
                />
            )}
            {del.inDelete && (
                <Delete
                    name={getLibelle(del.id)}
                    del={destroy}
                    hide={hideDelete}
                />
            )}
        </>
    );
}

export default ListGroupes;
