function Image({ avatar }) {
    return (
        <>
            <div className="flex items-center justify-center rounded bg-gary-50 h-48 dark:bg-gray-800">
                <div>
                    <span className="mb-2 ml-10 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Image
                    </span>
                    <div className="flex items-center justify-center w-72 mt-2">
                        <label className="flex flex-col items-center justify-center p-2  border-2 border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600">
                            <img
                                className="w-48 h- rounded"
                                src={`http://ofppt-eGestion.edu/storage/${avatar}`}
                                alt="image formateur"
                            />
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Image;
