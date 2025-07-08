import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { parcelId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    console.log(user)

    const [errorMsg, setErrorMsg] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    //load data
    const {
        data: parcel = {},
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['parcel', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        },
    });

    const cost = parcel.cost;
    //payment intent
    useEffect(() => {
        if (cost) {
            axiosSecure.post('/create-payment-intent', { amount: cost })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.error("Stripe Init Error:", err.response?.data || err.message);
                    setErrorMsg("Failed to initiate payment.");
                });
        }
    }, [cost, axiosSecure]);  // ✅ cost must be ready before sending

    //handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !clientSecret) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user.displayName,
                    email: user.email
                },
            },
        });

        if (error) {
            console.error(error);
            setErrorMsg(error.message);
        } else if (paymentIntent.status === 'succeeded') {
            setErrorMsg("");
            //call paymenthistory api
            await axiosSecure.post('/payments', {
                parcelId,
                amount: parcel.cost,
                email: user.email,
                title: parcel.title,
                transactionId: paymentIntent.id,
                payment_method: 'card', // ✅ Add this line
                payment_time: new Date()
            });
            // SweetAlert
            navigate('/dashboard/myparcels')
            Swal.fire({
                icon: 'success',
                title: 'Payment Successful!',
                text: `৳${parcel.cost} paid for ${parcel.title}`,
                confirmButtonColor: '#B6D63C',
            });
        }
    };

    if (isLoading) return <div className="text-center py-10">Loading...</div>;
    if (isError) return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold">Pay for: {parcel.title}</h2>
            <p className="text-sm text-gray-500 mb-2">Amount: ৳{cost}</p>

            <CardElement className="p-4 border rounded-md" />
            <button
                type="submit"
                className="btn bg-[#B6D63C] w-full"
                disabled={!stripe || !clientSecret}
            >
                Pay ৳{cost}
            </button>

            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        </form>
    );
};

export default PaymentForm;
