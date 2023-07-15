import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { ImCheckmark } from "react-icons/im";
import { MdEditOff } from "react-icons/md";

function EditImage({ closeEdit , id }) {
    const {
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
            avatar: null,
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
        submit("post", route("stagiaires.avatar",id));
    };

    useEffect(() => {
        if (wasSuccessful) {
            clearErrors();
            reset();
            closeEdit();
        }
    }, [wasSuccessful]);

    return (
        <form onSubmit={submitHandler} encType="multipart/htmlForm-data">
            <>
                <div className="flex items-center justify-center rounded bg-gary-50 h-48 dark:bg-gray-800">
                    <div>
                        <span className="mb-2 ml-10 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                            Image
                        </span>
                        <div className="flex items-center justify-center w-72 mt-2">
                            <label
                                htmlFor="avatar"
                                className="flex flex-col items-center justify-center p-2  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                            <p className="mt-2 ml-14 text-sm text-red-600 dark:text-red-500">
                                {errors.avatar}
                            </p>
                        )}
                    </div>
                </div>
            </>
            <div className="w-full mt-12 flex justify-center">
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
    );
}

export default EditImage;
