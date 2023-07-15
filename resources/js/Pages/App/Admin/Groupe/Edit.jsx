import Modal from "@/Components/Modal";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { ImCheckmark } from "react-icons/im";
import { MdEditOff } from "react-icons/md";

function Edit({ groupe, end, filieres }) {
    const {
        data,
        setData,
        errors,
        clearErrors,
        put,
        cancel,
        processing,
        reset,
        wasSuccessful,
    } = useForm({
        number: groupe.number,
        nb_stagiaires: groupe.nb_stagiaires,
        max_nb: groupe.max_nb,
        year: groupe.year,
        filiere_id: groupe.filiere_id,
        id:groupe.id
    });

    console.log(groupe);
    const submitHandler = (e) => {
        e.preventDefault();
        put(route("groupes.update", groupe.id));
    };

    useEffect(() => {
        if (wasSuccessful) {
            end();
        }
    }, [wasSuccessful]);

    return (
        <Modal show maxWidth="xl">
            <Head title={`Modifier ${groupe.filiere.code}${groupe.number}`} />
            <div className="relative bg-green-50 rounded-lg shadow dark:bg-gray-700">
                <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                        Modifier {`${groupe.filiere.code}${groupe.number}`}
                    </h3>
                    <form className="space-y-6" onSubmit={submitHandler}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="col-span-2">
                                <label
                                    htmlFor="name"
                                    className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                                >
                                    Numero du groupe
                                    <span className="text-red-700 text-xl">
                                        *
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    name="number"
                                    id="number"
                                    value={data.number}
                                    onChange={(e) =>
                                        setData("number", e.target.value)
                                    }
                                    className=" mt-2 border bg-green-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Entrer le numero"
                                />
                                {errors.number && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.number}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="nb_hours"
                                    className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                                >
                                    Nombre du stagiaires
                                </label>
                                <input
                                    type="number"
                                    name="nb_stagiaires"
                                    id="nb_stagiaires"
                                    value={data.nb_stagiaires}
                                    onChange={(e) =>
                                        setData("nb_stagiaires", e.target.value)
                                    }
                                    placeholder="Par défaut, la valeur est 0"
                                    className=" mt-2 border border-gray-300 bg-green-50 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                                {errors.nb_stagiaires && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.nb_stagiaires}
                                    </p>
                                )}
                            </div>
                            <div className="w-full">
                                <label className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                    Groupe de
                                    <span className="text-red-700 text-xl">
                                        *
                                    </span>
                                </label>

                                <div className="flex mt-5">
                                    <div className="flex items-center mr-4">
                                        <input
                                            type="radio"
                                            name="year"
                                            id="first"
                                            value={"first"}
                                            checked={data.year === "first"}
                                            onChange={(e) =>
                                                setData("year", e.target.value)
                                            }
                                            className="w-4 h-4 text-green-500 bg-green-50 border-gray-400 focus:ring-green-500 dark:focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="first"
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            1<sup>ère</sup> année
                                        </label>
                                    </div>
                                    <div className="flex items-center mr-4">
                                        <input
                                            type="radio"
                                            name="year"
                                            id="second"
                                            value={"second"}
                                            checked={data.year === "second"}
                                            onChange={(e) =>
                                                setData("year", e.target.value)
                                            }
                                            className="w-4 h-4 text-green-500 bg-green-50 border-gray-400 focus:ring-green-500 dark:focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="second"
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            2<sup>éme</sup> année
                                        </label>
                                    </div>
                                </div>
                                {errors.year && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.year}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="coef"
                                    className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                                >
                                    Limite stagiaires
                                </label>
                                <input
                                    type="number"
                                    name="max_nb"
                                    id="max_nb"
                                    value={data.max_nb}
                                    onChange={(e) =>
                                        setData("max_nb", e.target.value)
                                    }
                                    placeholder="Par défaut, la valeur est 25"
                                    className=" mt-2 border border-gray-300 bg-green-50 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                                {errors.max_nb && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.max_nb}
                                    </p>
                                )}
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="filiere_id"
                                    className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                                >
                                    Filière
                                    <span className="text-red-700 text-xl">
                                        *
                                    </span>
                                </label>

                                <select
                                    name="filiere_id"
                                    id="filiere_id"
                                    value={data.filiere_id}
                                    onChange={(e) =>
                                        setData("filiere_id", e.target.value)
                                    }
                                    className=" mt-1 border border-gray-300 bg-green-50 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                >
                                    <option value="">
                                        Sélectionne une filière
                                    </option>
                                    {filieres.map(({ id, libelle }, index) => (
                                        <option value={id} key={index}>
                                            {libelle}
                                        </option>
                                    ))}
                                </select>

                                {errors.filiere_id && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.filiere_id}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="w-full ml-1 mt-1 flex justify-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            >
                                <ImCheckmark className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => {
                                    cancel();
                                    reset();
                                    clearErrors();
                                    end();
                                }}
                                type="button"
                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            >
                                <MdEditOff className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}

export default Edit;
