import { useEffect, useState } from "react";
import Form from "./components/Form";
import UserList from "./components/UserList";

const App = () => {
    const [users, setUsers] = useState([]);
    const [editedUser, setEditedUser] = useState(null)

    useEffect(() => {
        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(savedUsers);
    }, []);

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users))
    }, [users])

    const addUser = (user) => {
        if (editedUser) {
            UpdateUser(user); 
        } else {
            setUsers([...users, user]);
        }
    };


    const deleteUser = (userId) => {
        let newUsers = users.filter((user) => {
            return user.id !== userId
        })
        setUsers(newUsers)
        if (userId == editedUser.id) {
            setEditedUser(null)
        }
    }

    const getEditUser = (user) => {
        setEditedUser(user)
    }

    const UpdateUser = (updatedUser) => {
        const updatedList = users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
        );
        setUsers(updatedList);
        setEditedUser(null);
    };


    console.log(users);

    return (
        <div>
            <Form addUser={addUser} editedUser={editedUser} />
            <UserList users={users} deleteUser={deleteUser} getEditUser={getEditUser} UpdateUser={UpdateUser}  />
        </div>
    );
};

export default App;
