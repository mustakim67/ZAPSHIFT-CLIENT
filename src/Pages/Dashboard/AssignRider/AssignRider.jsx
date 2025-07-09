import Swal from 'sweetalert2';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AssignRider = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch parcels
    const { data: parcels = [], isLoading: parcelsLoading } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels');
            return res.data;
        },
    });

    // Fetch active riders
    const { data: riders = [], isLoading: ridersLoading } = useQuery({
        queryKey: ['activeRiders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/active');
            return res.data;
        },
    });

    // Mutation to assign rider
    const assignMutation = useMutation({
        mutationFn: async ({ parcelId, rider }) => {
            return await axiosSecure.patch(`/parcels/${parcelId}/assign-rider`, {
                riderEmail: rider.email,
                riderName: rider.name,
                riderPhone: rider.phone, // include phone in request
            });
        },
        onSuccess: () => {
            Swal.fire('Success', 'Rider assigned successfully', 'success');
            queryClient.invalidateQueries({ queryKey: ['parcels'] });
        },
        onError: () => {
            Swal.fire('Error', 'Failed to assign rider', 'error');
        },
    });

    const handleAssign = (parcelId, rider) => {
        assignMutation.mutate({ parcelId, rider });
    };

    if (parcelsLoading || ridersLoading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div>
            <h2 className="text-2xl py-5 font-bold mb-6">Assign Riders to Parcels</h2>
            <div className="overflow-x-auto">
                <table className="table w-full bg-white">
                    <thead>
                        <tr>
                            <th>Parcel ID</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Assigned Rider</th>
                            <th>Assign To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel) => (
                            <tr key={parcel._id}>
                                <td>{parcel.tracking_id}</td>
                                <td>{parcel.title}</td>
                                <td>{parcel.delivery_status}</td>
                                <td>{parcel.assigned_rider?.name || 'Not Assigned'}</td>
                                <td>
                                    <select
                                        className="select select-bordered"
                                        onChange={(e) => {
                                            const rider = riders.find((r) => r.email === e.target.value);
                                            if (rider) handleAssign(parcel._id, rider);
                                        }}
                                        defaultValue=""
                                        disabled={
                                            assignMutation.isPending ||
                                            parcel.delivery_status === 'assigned'
                                        }
                                    >
                                        <option value="" disabled>
                                            Select Rider
                                        </option>
                                        {riders.map((r) => (
                                            <option key={r._id} value={r.email}>
                                                {r.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignRider;
