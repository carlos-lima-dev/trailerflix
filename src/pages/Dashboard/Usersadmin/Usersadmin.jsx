import React, {useContext} from "react";
import styles from "./Useradmin.module.css";
import {AuthContext} from "../../../context/authContext";

function Useradmin() {
  const {
    users,
    selectedUser,
    setSelectedUser,
    newUserDataCreate,
    setNewUserDataCreate,
    newUserDataUpdate,
    setNewUserDataUpdate,
    deleteUser,
    registerNewUser,
    updateUser,
  } = useContext(AuthContext);

  const handleInputChange = (event, type) => {
    const {name, value} = event.target;
    if (type === "create") {
      setNewUserDataCreate((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (type === "update") {
      setNewUserDataUpdate((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleUserSelectChange = (event) => {
    const userId = event.target.value;
    const user = users.find((user) => user._id === userId);
    setSelectedUser(user);
    setNewUserDataUpdate({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  return (
    <div className={styles.dashboard_container}>
      <div>
        <div className={styles.users_container}>
          <div className={styles.user_list_container}>
            <h2>User List</h2>
            <table className={styles.user_list_table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                  <th>Delete User</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span>Role: {user.role} </span>
                    </td>
                    <td>
                      <button
                        className={styles.delete_button}
                        onClick={() => deleteUser(user._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className={styles.h2_font}>Register New User</h2>
            <form
              className={styles.register_form}
              id="registerForm"
              onSubmit={registerNewUser}>
              <div className={styles.form_group}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="on"
                  value={newUserDataCreate.name}
                  onChange={(event) => handleInputChange(event, "create")}
                  required
                />
                <div id="nameError" className={styles.error_message}></div>
              </div>
              <div className={styles.form_group}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="on"
                  value={newUserDataCreate.email}
                  onChange={(event) => handleInputChange(event, "create")}
                  required
                />
              </div>
              <div className={styles.form_group}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newUserDataCreate.password}
                  onChange={(event) => handleInputChange(event, "create")}
                  required
                />
              </div>
              <div className={styles.form_group}>
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={newUserDataCreate.role}
                  onChange={(event) => handleInputChange(event, "create")}>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <button className={styles.register_button} type="submit">
                Register
              </button>
            </form>
          </div>
          <div className={styles.update_user_container}>
            <h2>Update User</h2>
            <form className={styles.update_form} onSubmit={updateUser}>
              <div className={styles.form_group}>
                <label htmlFor="userSelect">Select User</label>
                <select
                  id="userSelect"
                  onChange={handleUserSelectChange}
                  value={selectedUser ? selectedUser._id : ""}>
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.form_group}>
                <label htmlFor="updateName">Name</label>
                <input
                  type="text"
                  id="updateName"
                  autoComplete="on"
                  name="name"
                  value={newUserDataUpdate.name}
                  onChange={(event) => handleInputChange(event, "update")}
                  required
                />
              </div>
              <div className={styles.form_group}>
                <label htmlFor="updateEmail">Email</label>
                <input
                  type="email"
                  id="updateEmail"
                  autoComplete="on"
                  name="email"
                  value={newUserDataUpdate.email}
                  onChange={(event) => handleInputChange(event, "update")}
                  required
                />
              </div>
              <div className={styles.form_group}>
                <label htmlFor="updateRole">Role</label>
                <select
                  id="updateRole"
                  name="role"
                  value={newUserDataUpdate.role}
                  onChange={(event) => handleInputChange(event, "update")}>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <button className={styles.update_button} type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Useradmin;
