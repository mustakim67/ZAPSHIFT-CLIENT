import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';


const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payment-history', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments-history?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-6">Payment History</h2>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="table w-full text-sm md:text-base">
                    <thead className="bg-base-200 text-gray-700">
                        <tr>
                            <th>#</th>
                            <th>Parcel ID</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Transaction ID</th>
                            <th>Method</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id} className="hover">
                                <td>{index + 1}</td>
                                <td className="text-xs text-gray-600">{payment.parcelId}</td>
                                <td className="text-xs text-gray-600">{payment.email}</td>
                                <td className="text-gray-800 font-medium">৳{payment.amount}</td>
                                <td className="text-xs break-words text-gray-700">{payment.transactionId}</td>
                                <td className="capitalize text-gray-600">{payment.payment_method || 'N/A'}</td>
                                <td className="text-gray-600">{new Date(payment.payment_time).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {payments.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No payments found.</p>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory;
