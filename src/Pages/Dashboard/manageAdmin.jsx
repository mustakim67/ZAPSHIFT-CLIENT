import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaSearch } from 'react-icons/fa';


const ManageAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [emailSearch, setEmailSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    const searchUsers = async (query) => {
        setError('');
        setUsers([]);

        try {
            if (!query.trim()) return; // Don’t send empty queries

            const res = await axiosSecure.get(`/users/search?email=${query}`);
            setUsers(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };


    const updateRole = async (email, currentRole) => {
        const targetRole = currentRole === 'admin' ? 'user' : 'admin';
        try {
            const res = await axiosSecure.patch(`/users/role/${email}`, { role: targetRole });

            const updatedUser = await axiosSecure.get(`/users/search?email=${email}`);
            setUsers(updatedUser.data); // refresh with correct role from backend
        } catch (err) {
            alert('Failed to update role');
        }
    };


    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Manage Admins</h2>

            <div className="relative mb-6 w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search by email..."
                    className="input input-bordered w-full pr-10"
                    value={emailSearch}
                    onChange={(e) => {
                        setEmailSearch(e.target.value);
                        searchUsers(e.target.value);
                    }}
                />
                <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>


            {error && <p className="text-red-500 mb-4">{error}</p>}

            {users.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.email}>
                                    <td>{user.email}</td>
                                    <td className="capitalize">{user.role || 'user'}</td>
                                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            onClick={() => updateRole(user.email, user.role)}
                                            className={`btn btn-xs ${user.role === 'admin' ? 'btn-error' : 'btn-success'
                                                }`}
                                        >
                                            {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageAdmin;
