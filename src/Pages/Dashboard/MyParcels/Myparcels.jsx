import { useQuery } from '@tanstack/react-query';
import { FaEye, FaTrashAlt, FaMoneyBillAlt } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: parcels = [],
        refetch,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['my-parcels', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/myparcels?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return <div className="text-center py-10">Loading parcels...</div>;
    if (isError) return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this parcel!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'The parcel has been removed.', 'success');
                            // Refresh data
                            refetch();
                        }
                    })
                    .catch(() => {
                        Swal.fire('Error', 'Failed to delete the parcel.', 'error');
                    });
            }
        });
    };
    return (
        <div className="mx-auto px-4 py-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">📦 My Parcels</h2>

            <div className="overflow-x-auto rounded-lg border shadow-sm">
                <table className="table w-full text-sm md:text-base">
                    <thead className="bg-base-200 text-gray-700">
                        <tr>
                            <th>#</th> {/* Index Column */}
                            <th>Name</th>
                            <th>Type</th>
                            <th>Payment</th>
                            <th>Delivery</th>
                            <th>Cost</th>
                            <th>Date</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id} className="hover">
                                <td className="text-gray-500">{index + 1}</td> {/* Show row number */}
                                <td>{parcel.title}</td>
                                <td className="capitalize">{parcel.type}</td>
                                <td className="capitalize text-gray-600">
                                    {parcel.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                                </td>
                                <td className="capitalize text-gray-600">{parcel.delivery_status}</td>
                                <td className="text-gray-700 font-medium">৳{parcel.cost}</td>
                                <td className="text-gray-600">
                                    {parcel.creation_date
                                        ? new Date(parcel.creation_date).toLocaleString()
                                        : 'N/A'}
                                </td>
                                <td className="text-center flex gap-2 justify-center flex-wrap">
                                    <button
                                        title="View"
                                        className="btn btn-sm btn-outline flex items-center gap-1"
                                    >
                                        <FaEye className="text-base" />
                                        <span className="hidden sm:inline">View</span>
                                    </button>
                                    <button
                                        title="Pay"
                                        className="btn btn-sm btn-outline flex items-center gap-1"
                                    >
                                        <FaMoneyBillAlt className="text-base" />
                                        <span className="hidden sm:inline">Pay</span>
                                    </button>
                                    <button
                                        title="Delete"
                                        onClick={() => handleDelete(parcel._id)}
                                        className="btn btn-sm btn-outline flex items-center gap-1"
                                    >
                                        <FaTrashAlt className="text-base text-red-500" />
                                        <span className="hidden sm:inline">Delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {parcels.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No parcels found.</p>
                )}
            </div>
        </div>
    );
};

export default MyParcels;
