import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ActiveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');

    const { data: riders = [], isLoading } = useQuery({
        queryKey: ['activeRiders', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders/active?search=${search}`);
            return res.data;
        },
    });

    const toggleStatus = async (id, currentStatus,email) => {
        const newStatus = currentStatus === 'active' ? 'deactivated' : 'active';
        await axiosSecure.patch(`/riders/update-status/${id}`, {
            status: newStatus,email
        });
        queryClient.invalidateQueries(['activeRiders']);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Active Riders</h2>

            <input
                type="text"
                placeholder="Search by name..."
                className="input input-bordered w-full max-w-md mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="overflow-x-auto">
                <table className="table table-zebra text-sm w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.map((rider) => (
                            <tr key={rider._id}>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.phone}</td>
                                <td>{rider.region}</td>
                                <td>{rider.district}</td>
                                <td className="capitalize">{rider.status}</td>
                                <td>
                                    <button
                                        onClick={() => toggleStatus(rider._id, rider.status,rider.email)}
                                        className={`btn btn-xs ${rider.status === 'active'
                                                ? 'btn-error'
                                                : 'btn-success'
                                            }`}
                                    >
                                        {rider.status === 'active'
                                            ? 'Deactivate'
                                            : 'Activate'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {!riders.length && (
                            <tr>
                                <td colSpan="7" className="text-center text-gray-500">
                                    No riders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActiveRiders;
