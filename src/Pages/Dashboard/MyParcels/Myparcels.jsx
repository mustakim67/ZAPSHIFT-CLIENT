import { useQuery } from '@tanstack/react-query';
import { FaEye, FaTrashAlt, FaMoneyBillAlt } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';


const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const naviagte = useNavigate();

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

    const handlePayment = (id) => {
        naviagte(`/dashboard/payment/${id}`);
    }

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

            <div className="overflow-x-auto rounded-lg shadow-sm">
                <table className="table w-full text-sm md:text-base">
                    <thead className="bg-base-200 text-gray-700">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Tracking ID</th>
                            <th>Payment Status</th>
                            <th>Delivery Status</th>
                            <th>Cost</th>
                            <th>Date</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id} className="hover">
                                <td className="text-gray-500 text-center">{index + 1}</td>
                                <td className="max-w-[120px] truncate">{parcel.title}</td>
                                <td className="capitalize">{parcel.type}</td>
                                <td className="max-w-[160px] truncate text-xs">{parcel.tracking_id}</td>
                                <td
                                    className={`capitalize text-center text-xs px-2 py-1 rounded 
          ${parcel.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}
                                >
                                    {parcel.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                                </td>
                                <td className="capitalize text-gray-600">{parcel.delivery_status}</td>
                                <td className="text-nowrap text-gray-700 font-medium">৳ {parcel.cost}</td>
                                <td className="text-gray-600 text-nowrap text-xs">
                                    {parcel.creation_date
                                        ? new Date(parcel.creation_date).toLocaleString()
                                        : 'N/A'}
                                </td>
                                <td className="text-center flex gap-2 justify-center flex-wrap text-xs">
                                    <button
                                        title="View"
                                        className="btn btn-xs btn-outline flex items-center gap-1"
                                    >
                                        <FaEye />
                                        <span className="hidden sm:inline">View</span>
                                    </button>
                                    <button
                                        disabled={parcel.payment_status === 'paid'}
                                        onClick={() => handlePayment(parcel._id)}
                                        title="Payment"
                                        className="btn btn-xs btn-outline flex items-center gap-1"
                                    >
                                        <FaMoneyBillAlt />
                                        <span className="hidden sm:inline">Payment</span>
                                    </button>
                                    <button
                                        title="Delete"
                                        onClick={() => handleDelete(parcel._id)}
                                        className="btn btn-xs btn-outline flex items-center gap-1"
                                    >
                                        <FaTrashAlt className="text-red-500" />
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
