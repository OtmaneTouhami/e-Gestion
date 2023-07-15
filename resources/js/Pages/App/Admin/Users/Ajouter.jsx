import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { CgUserAdd } from "react-icons/cg";
import { TiCancel } from "react-icons/ti";

function Ajouter() {
    const {
            data,
            setData,
            errors,
            processing,
            submit,
            cancel,
            reset,
            clearErrors,
        } = useForm({
            firstname: "",
            lastname: "",
            telephone: "",
            adresse: "",
            presonal_email: "",
            avatar: null,
            birth_date: "",
            start_date: "",
            gender: "",
        }),
        [avatarPreview, setAvatarPreview] = useState(null);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0],
            reader = new FileReader();
        setData("avatar", file);
        reader.onload = () => {
            setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        submit("post", route("users.store"));
    };

    // useEffect(() => console.table(data), [data]);
    // useEffect(() => console.log(avatarPreview), [avatarPreview]);

    return (
        <>
            <Head title="Ajouter un utilisateur" />
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="flex items-center justify-center h-24 rounded  dark:bg-gray-800">
                    <div className="text-3xl text-gray-400 dark:text-gray-500 ml-4">
                        <div className="text-xxl text-black font-bold dark:text-white">
                            Ajouter un utilisateur
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={submitHandler} encType="multipart/htmlForm-data">
                <div className="grid grid-cols-3 gap-4 mb-4 flex items-center">
                    <div className="col-span-2 flex items-center justify-center h-fit mb-4 rounded  dark:bg-gray-800">
                        <div className="text-2xl text-gray-400 dark:text-gray-500">
                            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="w-full">
                                        <label
                                            htmlFor="lastname"
                                            className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                                        >
                                            Nom
                                            <span className="text-red-700 text-xl">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            id="lastname"
                                            value={data.lastname}
                                            onChange={(e) =>
                                                setData(
                                                    "lastname",
                                                    e.target.value
                                                )
                                            }
                                            className=" mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
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
                                            <span className="text-red-700 text-xl">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstname"
                                            id="firstname"
                                            value={data.firstname}
                                            onChange={(e) =>
                                                setData(
                                                    "firstname",
                                                    e.target.value
                                                )
                                            }
                                            className=" mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
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
                                            <span className="text-red-700 text-xl">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="adresse"
                                            id="adresse"
                                            value={data.adresse}
                                            onChange={(e) =>
                                                setData(
                                                    "adresse",
                                                    e.target.value
                                                )
                                            }
                                            className=" mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                            placeholder="Entrer l'adresse de l'utilisateur"
                                        />
                                        {errors.adresse && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                {errors.adresse}
                                            </p>
                                        )}
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="presonal_email"
                                            className="mb-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                                        >
                                            Adresse e-mail personnel
                                            <span className="text-red-700 text-xl">
                                                *
                                            </span>
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
                                                    setData(
                                                        "presonal_email",
                                                        e.target.value
                                                    )
                                                }
                                                className=" mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                                placeholder="Entrer l'adresse e-mail du utilisateur"
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
                                            <span className="text-red-700 text-xl">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="telephone"
                                            id="telephone"
                                            value={data.telephone}
                                            onChange={(e) =>
                                                setData(
                                                    "telephone",
                                                    e.target.value
                                                )
                                            }
                                            className=" mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
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
                                            <span className="text-red-700 text-xl">
                                                *
                                            </span>
                                        </label>

                                        <div className="flex mt-5">
                                            <div className="flex items-center mr-4">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    id="male"
                                                    value={"male"}
                                                    checked={
                                                        data.gender === "male"
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "gender",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-4 h-4 text-green-500 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                                                    checked={
                                                        data.gender === "female"
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "gender",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-4 h-4 text-green-500 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                                            <span className="text-red-700 text-xl">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="date"
                                            name="birth_date"
                                            id="birth_date"
                                            value={data.birth_date}
                                            onChange={(e) =>
                                                setData(
                                                    "birth_date",
                                                    e.target.value
                                                )
                                            }
                                            className=" mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
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
                                            <span className="text-red-700 text-xl">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="date"
                                            name="start_date"
                                            id="start_date"
                                            value={data.start_date}
                                            onChange={(e) =>
                                                setData(
                                                    "start_date",
                                                    e.target.value
                                                )
                                            }
                                            className=" mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                        />
                                        {errors.start_date && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                {errors.start_date}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full mt-8 flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                    >
                                        <CgUserAdd className="w-5 h-5 ml-1" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            cancel();
                                            reset();
                                            clearErrors();
                                            setAvatarPreview(null);
                                        }}
                                        type="button"
                                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                    >
                                        <TiCancel className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 grid gap-0 flex items-center justify-center rounded  h-72 dark:bg-gray-800">
                        <div className="flex items-center justify-center rounded bg-gary-50 h-48 dark:bg-gray-800">
                            <div>
                                <label
                                    htmlFor="avatar"
                                    className="mb-2 ml-14 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                                >
                                    Image
                                </label>
                                <div className="flex items-center justify-center w-72">
                                    <label
                                        htmlFor="avatar"
                                        className="flex mt-4 flex-col items-center justify-center p-2  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                    >
                                        {avatarPreview ? (
                                            <img
                                                className="w-48 h- rounded"
                                                src={avatarPreview}
                                                alt="Avatar preview"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-10 h-10 mb-3 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                    ></path>
                                                </svg>
                                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">
                                                        Cliquez pour uploder
                                                    </span>
                                                </p>
                                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                                    l'image
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    PNG ou JPG (MAX. 10 Mo)
                                                </p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            name="avatar"
                                            id="avatar"
                                            accept="image/png, image/jpeg"
                                            onChange={handleAvatarChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {errors.avatar && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.avatar}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Ajouter;
