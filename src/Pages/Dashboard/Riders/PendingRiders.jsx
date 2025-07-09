import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaEye, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PendingRiders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedRider, setSelectedRider] = useState(null);

    const { data: pendingRiders = [], isLoading, isError, error } = useQuery({
        queryKey: ['pendingRiders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/pending');
            return res.data;
        },
    });

    const handleStatusUpdate = async (riderId, status, email) => {
        const result = await Swal.fire({
            title: `Are you sure you want to ${status} this rider?`,
            icon: status === 'accepted' ? 'success' : 'warning',
            showCancelButton: true,
            confirmButtonText: `Yes, ${status}`,
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.patch(`/riders/update-status/${riderId}`, { status },{email});
                Swal.fire(`${status.charAt(0).toUpperCase() + status.slice(1)}d!`, `Rider has been ${status}.`, 'success');
                queryClient.invalidateQueries(['pendingRiders']);
            } catch (err) {
                Swal.fire('Error', 'Failed to update rider status', 'error');
            }
        }
    };

    if (isLoading) return <p className="text-center py-6">Loading...</p>;
    if (isError) return <p className="text-center py-6 text-red-500">{error.message}</p>;

    return (
        <div className="px-4 py-8 mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Pending Rider Requests</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Applied At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingRiders.length ? (
                            pendingRiders.map((rider) => (
                                <tr key={rider._id}>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.phone}</td>
                                    <td>{rider.region}</td>
                                    <td>{rider.district}</td>
                                    <td>{new Date(rider.applied_at).toLocaleDateString()}</td>
                                    <td className="flex gap-2">
                                        <FaEye
                                            size={25}
                                            className="text-blue-500 cursor-pointer px-1"
                                            title="View"
                                            onClick={() => setSelectedRider(rider)}
                                        />
                                        <FaCheckCircle
                                         size={25}
                                            className="text-green-500 cursor-pointer px-1"
                                            title="Accept"
                                            onClick={() => handleStatusUpdate(rider._id, 'accepted',rider.email)}
                                        />
                                        <FaTimesCircle
                                         size={25}
                                            className="text-red-500 cursor-pointer px-1"
                                            title="Reject"
                                            onClick={() => handleStatusUpdate(rider._id, 'rejected')}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center text-gray-500 py-4 shadow-2xl bg-white">
                                    No pending riders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedRider && (
                <dialog id="viewModal" className="modal modal-open">
                    <form method="dialog" className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Rider Information</h3>
                        <div className="space-y-2 text-sm">
                            <p><strong>Name:</strong> {selectedRider.name}</p>
                            <p><strong>Email:</strong> {selectedRider.email}</p>
                            <p><strong>Phone:</strong> {selectedRider.phone}</p>
                            <p><strong>NID:</strong> {selectedRider.nid}</p>
                            <p><strong>Bike Brand:</strong> {selectedRider.bikeBrand}</p>
                            <p><strong>Bike Reg. No:</strong> {selectedRider.bikeRegNumber}</p>
                            <p><strong>Region:</strong> {selectedRider.region}</p>
                            <p><strong>District:</strong> {selectedRider.district}</p>
                            <p><strong>Status:</strong> {selectedRider.status}</p>
                            <p><strong>Applied At:</strong> {new Date(selectedRider.applied_at).toLocaleString()}</p>
                        </div>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setSelectedRider(null)}>Close</button>
                        </div>
                    </form>
                </dialog>
            )}
        </div>
    );
};

export default PendingRiders;
