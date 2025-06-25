const UserList = ({ users, deleteUser, getEditUser }) => {
    const handleDelete = (userId) => {
        deleteUser(userId);
    };

    const handleEdit = (user) => {
        getEditUser(user);
    };

    const getCourse = (course) => {
        switch (course) {
            case 1:
                return "Full Stack Development";
            case 2:
                return "UI/UX";
            case 3:
                return "AI/ML/DS";
            default:
                return "Unknown Course";
        }
    };

    return (
        <div>
            {users.length !== 0 ? (
                <div className="bg-slate-100 h-[459px]">
                    <div className="container mx-auto h-full">
                        <div className="h-full  sm:rounded-lg overflow-hidden">
                            <div className="overflow-y-auto h-full scrollbar-hidden">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-black uppercase bg-gray-50 sticky top-0 z-10">
                                        <tr>
                                            <th className="px-6 py-3">Name</th>
                                            <th className="px-6 py-3">Course</th>
                                            <th className="px-6 py-3">Email</th>
                                            <th className="px-6 py-3">Gender</th>
                                            <th className="px-6 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 border-b border-gray-200"
                                            >
                                                <td className="px-6 py-3 text-black">{item.name}</td>
                                                <td className="px-6 py-3 text-black">
                                                    {getCourse(Number(item.course))}
                                                </td>
                                                <td className="px-6 py-3 text-black">{item.email}</td>
                                                <td className="px-6 py-3 text-black">{item.gender}</td>
                                                <td className="px-6 py-3 text-black">
                                                    <div className="flex gap-5">
                                                        <button
                                                            className="font-medium text-blue-600 hover:underline"
                                                            onClick={() => handleEdit(item)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="font-medium text-red-600 hover:underline"
                                                            onClick={() => handleDelete(item.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1 className="bg-slate-100 h-[459px] text-center text-xl font-semibold pt-10">
                    No Data Found
                </h1>
            )}
        </div>
    );
};

export default UserList;
