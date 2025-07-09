import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const TrackParcel = () => {
    const axiosSecure = useAxiosSecure();
    const [trackingId, setTrackingId] = useState('');
    const [trackingData, setTrackingData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    console.log(trackingData)

    const handleTrack = async () => {
        const trimmedId = trackingId.trim();
        if (!trimmedId) {
            setError('Please enter a tracking ID.');
            setTrackingData(null);
            return;
        }

        setLoading(true);
        setError('');
        setTrackingData(null);

        try {
            const res = await axiosSecure.get(`/track/${trimmedId}`);
            if (!res.data || Object.keys(res.data).length === 0) {
                setError('Tracking ID not found.');
                setTrackingData(null);
            } else {
                setTrackingData(res.data);
            }
        } catch (err) {
            console.error(err);
            setError('Error occurred while fetching tracking info.');
            setTrackingData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-5 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Track Your Parcel</h2>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Enter Tracking ID"
                    className="input input-bordered flex-1"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleTrack();
                    }}
                />
                <button
                    className="btn btn-primary"
                    onClick={handleTrack}
                    disabled={!trackingId.trim() || loading}
                >
                    {loading ? 'Tracking...' : 'Track'}
                </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {trackingData && (
                <div className="bg-white p-4 shadow rounded-md">
                    <h3 className="text-lg font-semibold mb-2">Tracking Info</h3>
                    <p><strong>Title:</strong> {trackingData.title}</p>
                    <p><strong>Status:</strong> {trackingData.delivery_status === 'assigned'?'Assigned to rider':trackingData.delivery_status}</p>
                    <p><strong>Tracking ID:</strong> {trackingData.tracking_id}</p>
                    <p><strong>Destination:</strong> {trackingData.receiver_address || trackingData.destination || 'N/A'}</p>
                    {trackingData.assigned_rider && (
                        <p><strong>Assigned Rider:</strong> {trackingData.assigned_rider.name?trackingData.assigned_rider.name:'N/A'}</p>
                    )}
                    <p><strong>Created At:</strong> {new Date(trackingData.creation_date).toLocaleString()}</p>
                </div>
            )}
        </div>
    );
};

export default TrackParcel;