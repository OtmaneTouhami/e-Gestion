import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { ImCheckmark } from "react-icons/im";
import { MdEditOff } from "react-icons/md";

function Edit({ stagiaire, groupes, closeEdit }) {
    const { info, year, group_id } = stagiaire,
        {
            id,
            lastname,
            firstname,
            telephone,
            adresse,
            presonal_email,
            birth_date,
            start_date,
            end_date,
            gender,
        } = info,
        {
            data,
            setData,
            errors,
            processing,
            submit,
            cancel,
            reset,
            clearErrors,
            wasSuccessful,
        } = useForm({
            firstname: firstname,
            lastname: lastname,
            telephone: telephone,
            adresse: adresse,
            presonal_email: presonal_email,
            birth_date: birth_date,
            start_date: start_date,
            gender: gender,
            end_date: end_date || "",
            end: end_date ? true : false,
            year: year,
            group_id: group_id,
        });
    const submitHandler = (e) => {
        e.preventDefault();
        submit("put", route("stagiaires.update", id));
    };
    useEffect(() => {
        if (!data.end) {
            setData("end_date", "");
        }
    }, [data.end]);

    useEffect(() => {
        if (wasSuccessful) {
            clearErrors();
            reset();
            closeEdit();
        }
    }, [wasSuccessful]);
    return (
        <>
            <form onSubmit={submitHandler} encType="multipart/htmlForm-data">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="w-full">
                        <label
                            htmlFor="lastname"
                            className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                        >
                            Nom
                            <span className="text-red-700 text-xl">*</span>
                        </label>
                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            value={data.lastname}
                            onChange={(e) =>
                                setData("lastname", e.target.value)
                            }
                            className=" mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Entrer le nom"
                        />
                        {errors.lastname && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {errors.lastname}
                            </p>
                        )}
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="firstname"
                            className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                        >
                            Prénom
                            <span className="text-red-700 text-xl">*</span>
                        </label>
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            value={data.firstname}
                            onChange={(e) =>
                                setData("firstname", e.target.value)
                            }
                            className=" mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Entrer le prenom"
                        />
                        {errors.firstname && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {errors.firstname}
                            </p>
                        )}
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="adresse"
                            className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                        >
                            Adresse
                            <span className="text-red-700 text-xl">*</span>
                        </label>
                        <input
                            type="text"
                            name="adresse"
                            id="adresse"
                            value={data.adresse}
                            onChange={(e) => setData("adresse", e.target.value)}
                            className=" mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Entrer l'adresse du stagiaire"
                        />
                        {errors.adresse && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {errors.adresse}
                            </p>
                        )}
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="adresse"
                            className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                        >
                            Adresse e-mail personnel
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                name="presonal_email"
                                id="presonal_email"
                                value={data.presonal_email}
                                onChange={(e) =>
                                    setData("presonal_email", e.target.value)
                                }
                                className=" mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                placeholder="Entrer l'adresse e-mail du stagiaire"
                            />
                        </div>
                        {errors.presonal_email && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {errors.presonal_email}
                            </p>
                        )}
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="telephone"
                            className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                        >
                            N° de telephone
                            <span className="text-red-700 text-xl">*</span>
                        </label>
                        <input
                            type="text"
                            name="telephone"
                            id="telephone"
                            value={data.telephone}
                            onChange={(e) =>
                                setData("telephone", e.target.value)
                            }
                            className=" mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="N° du telephone"
                        />
                        {errors.telephone && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {errors.telephone}
                            </p>
                        )}
                    </div>
                    <div className="w-full">
                        <label className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                            Genre
                            <span className="text-red-700 text-xl">*</span>
                        </label>

                        <div className="flex mt-5">
                            <div className="flex items-center mr-4">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    value={"male"}
                                    checked={data.gender === "male"}
                                    onChange={(e) =>
                                        setData("gender", e.target.value)
                                    }
                                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="male"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Homme
                                </label>
                            </div>
                            <div className="flex items-center mr-4">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value={"female"}
                                    checked={data.gender === "female"}
                                    onChange={(e) =>
                                        setData("gender", e.target.value)
                                    }
                                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="female"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Femme
                                </label>
                            </div>
                        </div>
                        {errors.gender && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {errors.gender}
                            </p>
                        )}
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="birth_date"
                            className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                        >
                            Date de naissance
                            <span className="text-red-700 text-xl">*</span>
                        </label>
                        <input
                            type="date"
                            name="birth_date"
                            id="birth_date"
                            value={data.birth_date}
                            onChange={(e) =>
                                setData("birth_date", e.target.value)
                            }
                            className=" mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                        {errors.birth_date && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {errors.birth_date}
                            </p>
                        )}
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="start_date"
                            className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                        >
                            Date de debut
                            <span className="text-red-700 text-xl">*</span>
                        </label>
                        <input
                            type="date"
                            name="start_date"
                            id="start_date"
                            value={data.start_date}
                            onChange={(e) =>
                                setData("start_date", e.target.value)
                            }
                            className=" mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                        {errors.start_date && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {errors.start_date}
                            </p>
                        )}
                    </div>
                    <div className="w-full">
                                        <label className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                            Année
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
                                                    checked={
                                                        data.year === "first"
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "year",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-4 h-4 text-green-500 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label
                                                    htmlFor="first"
                                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    1<sup>ére</sup>
                                                </label>
                                            </div>
                                            <div className="flex items-center mr-4">
                                                <input
                                                    type="radio"
                                                    name="year"
                                                    id="second"
                                                    value={"second"}
                                                    checked={
                                                        data.year === "second"
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "year",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-4 h-4 text-green-500 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label
                                                    htmlFor="second"
                                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    2<sup>ème</sup>
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
                                            htmlFor="group_id"
                                            className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                                        >
                                            Groupe
                                            <span className="text-red-700 text-xl">
                                                *
                                            </span>
                                        </label>

                                        <select
                                            name="group_id"
                                            id="group_id"
                                            value={data.group_id}
                                            onChange={(e) =>
                                                setData(
                                                    "group_id",
                                                    e.target.value
                                                )
                                            }
                                            className=" mt-2 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                        >
                                            <option value="">
                                                Sélectionne un groupe
                                            </option>
                                            {groupes.map(
                                                (
                                                    { id, number, filiere },
                                                    index
                                                ) => (
                                                    <option
                                                        value={id}
                                                        key={index}
                                                    >
                                                        {filiere.code}
                                                        {number}
                                                    </option>
                                                )
                                            )}
                                        </select>

                                        {errors.group_id && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                {errors.group_id}
                                            </p>
                                        )}
                                    </div>
                    <div className={data.end ? "wfull" : "ml-32 sm:col-span-2"}>
                        <label className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                            Fin de service
                            <span className="text-red-700 text-xl">*</span>
                        </label>

                        <div className="flex mt-5">
                            <div className="flex items-center mr-4">
                                <input
                                    type="radio"
                                    name="end"
                                    id="oui"
                                    value={true}
                                    checked={data.end}
                                    onChange={(e) =>
                                        setData("end", eval(e.target.value))
                                    }
                                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="oui"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Oui
                                </label>
                            </div>
                            <div className="flex items-center mr-4">
                                <input
                                    type="radio"
                                    name="end"
                                    id="non"
                                    value={false}
                                    checked={!data.end}
                                    onChange={(e) =>
                                        setData("end", eval(e.target.value))
                                    }
                                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="non"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Non
                                </label>
                            </div>
                        </div>
                    </div>
                    {data.end && (
                        <div className="w-full">
                            <label
                                htmlFor="start_date"
                                className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                            >
                                Date de Fin
                                <span className="text-red-700 text-xl">*</span>
                            </label>
                            <input
                                type="date"
                                name="end_date"
                                id="end_date"
                                value={data.end_date}
                                onChange={(e) =>
                                    setData("end_date", e.target.value)
                                }
                                required
                                className=" mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                            {errors.end_date && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {errors.end_date}
                                </p>
                            )}
                        </div>
                    )}
                </div>
                <div className="w-full mt-8 flex justify-center">
                    <button
                        type="submit"
                        disabled={processing}
                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        title="Confirmer"
                    >
                        <ImCheckmark className="w-5 h-5" />
                    </button>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        title="Annuler"
                        onClick={() => {
                            closeEdit();
                            clearErrors();
                            cancel();
                            reset();
                        }}
                    >
                        <MdEditOff className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </>
    );
}

export default Edit;
