import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [parcels, setParcels] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/parcels?email=${user.email}`)
                .then(res => {
                    setParcels(res.data);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [user]);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">My Parcels</h2>
            <ul className="space-y-2">
                {parcels.map(parcel => (
                    <li key={parcel._id} className="border p-4 rounded-xl shadow-sm">
                        <p><strong>Title:</strong> {parcel.title}</p>
                        <p><strong>Status:</strong> {parcel.delivery_status}</p>
                        <p><strong>Created:</strong> {new Date(parcel.creation_date).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyParcels;