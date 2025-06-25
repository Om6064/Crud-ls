import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Form = ({ addUser, editedUser }) => {
    const [text, setText] = useState({
        name: "",
        email: "",
        course: "",
        password: "",
        confirmPassword: "",
        gender: ""
    });

    const [error, setError] = useState({});

    useEffect(() => {
        if (editedUser) {
            setError({})
            setText(editedUser)
        } else {
            setText(
                {
                    name: "",
                    email: "",
                    course: "",
                    password: "",
                    confirmPassword: "",
                    gender: ""
                }
            )
        }
    }, [editedUser])

    const handleSubmit = (e) => {
        e.preventDefault();

        let tempObj = {};

        if (!text.name.trim()) {
            tempObj.name = "Please enter your name";
        }


        if (text.course == "" || text.course == null || text.course == undefined) {
            tempObj.course = "Please select a course";
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!text.email.trim() || !emailRegex.test(text.email)) {
            tempObj.email = "Please enter a valid email";
        }


        if (text.gender == "" || text.gender == undefined || text.gender == null) {
            tempObj.gender = "Please select your gender";
        }

        if (!text.password.trim()) {
            tempObj.password = "Please enter a password";
        } else if (text.password.length < 8) {
            tempObj.password = "Password must be at least 8 characters";
        }

        if (text.confirmPassword !== text.password) {
            tempObj.confirmPassword = "Passwords do not match";
        }

        setError(tempObj);

        if (Object.keys(tempObj).length > 0) {
            return;
        }

        if (editedUser) {
            addUser(text);
            if (
                text.name !== editedUser.name ||
                text.email !== editedUser.email ||
                text.course !== editedUser.course ||
                text.gender !== editedUser.gender ||
                text.password !== editedUser.password ||
                text.confirmPassword !== editedUser.confirmPassword
            ) {
                toast.warn("User Updated Successfully");
            } else {
                toast.error("Please Update The User");
            }


        } else {
            const updatedUsers = { ...text, id: Date.now() };
            addUser(updatedUsers);
            toast.success("User Added Successfully");
        }

        setText({
            name: "",
            email: "",
            course: "",
            password: "",
            confirmPassword: "",
            gender: ""
        });

    };

    const handleChange = (e) => {
        const key = e.target.name || e.target.id;
        setText({ ...text, [key]: e.target.value });
        setError({ ...error, [key]: "" });

    };
    console.log(text);


    return (
        <div className="bg-slate-100 py-10">
            <div className="container mx-auto px-4 flex items-center justify-center">
                <form
                    className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full"
                    onSubmit={handleSubmit}
                >
                    <h2 className={`text-2xl font-bold text-center mb-6 ${editedUser ? "text-yellow-500" : "text-blue-700"}`}>Student Mangement System</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="mb-5">
                            <label htmlFor="name" className={`block text-sm ${error.name ? "text-red-600" : "text-gray-600"}`}>Name</label>
                            <input
                                onChange={handleChange}
                                value={text.name}
                                type="text"
                                id="name"
                                className={`w-full border-b-2 outline-none p-2 ${error.name ? "border-red-300" : "border-gray-300"}`}
                            />
                            {error.name && (<p className="text-red-500 text-sm mt-1">{error.name}</p>)}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="course" className={`block text-sm ${error.course ? "text-red-600" : "text-gray-600"}`}>Course</label>
                            <select
                                onChange={handleChange}
                                value={text.course}
                                id="course"
                                className={`w-full border-b-2 outline-none p-2  ${error.course ? "border-red-300" : "border-gray-300"}`}
                            >
                                <option value="">--Select Course--</option>
                                <option value="1">Full Stack Development</option>
                                <option value="2">Ui/Ux</option>
                                <option value="3">Ai/Ml/Ds</option>
                            </select>
                            {error.course && <p className="text-red-500 text-sm mt-1">{error.course}</p>}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="mb-5">
                            <label htmlFor="email" className={`block text-sm ${error.email ? "text-red-600" : "text-gray-600"}`}>Email</label>
                            <input
                                onChange={handleChange}
                                value={text.email}
                                type="text"
                                id="email"
                                className={`w-full border-b-2 outline-none p-2 ${error.email ? "border-red-300" : "border-gray-300"}`}
                            />
                            {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
                        </div>
                        <div className="mb-5">
                            <label className={`block text-sm ${error.gender ? "text-red-600" : "text-gray-600"}`}>Gender</label>
                            <div className="flex items-center gap-4 mt-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        // id="gender"
                                        value="Male"
                                        onChange={handleChange}
                                        checked={text.gender === "Male"}
                                        className="mr-2 w-4 h-4 appearance-none text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 rounded-full focus:ring-2 focus:ring-offset-1"
                                        name="gender"
                                    />
                                    Male
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        // id="gender"
                                        value="Female"
                                        onChange={handleChange}
                                        checked={text.gender === "Female"}
                                        className="mr-2 w-4 h-4 appearance-none text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 rounded-full focus:ring-2 focus:ring-offset-1"
                                        name="gender"
                                    />
                                    Female
                                </label>
                            </div>
                            {error.gender && <p className="text-red-500 text-sm mt-1">{error.gender}</p>}
                        </div>

                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="mb-5">
                            <label htmlFor="password" className={`block text-sm ${error.password ? "text-red-600" : "text-gray-600"}`}>Password</label>
                            <input
                                onChange={handleChange}
                                value={text.password}
                                type="password"
                                id="password"
                                className={`w-full border-b-2 outline-none p-2 ${error.password ? "border-red-300" : "border-gray-300"}`}
                            />
                            {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="confirmPassword" className={`block text-sm ${error.confirmPassword ? "text-red-600" : "text-gray-600"}`}>Confirm Password</label>
                            <input
                                onChange={handleChange}
                                value={text.confirmPassword}
                                type="password"
                                id="confirmPassword"
                                className={`w-full border-b-2 outline-none p-2 ${error.confirmPassword ? "border-red-300" : "border-gray-300"}`}
                            />
                            {error.confirmPassword && <p className="text-red-500 text-sm mt-1">{error.confirmPassword}</p>}
                        </div>
                    </div>



                    <button
                        type="submit"
                        className={`w-full  text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ${editedUser ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-700 hover:bg-blue-800"}`}
                    >
                        {editedUser ? "Update" : "Submit"}

                    </button>

                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Form;
