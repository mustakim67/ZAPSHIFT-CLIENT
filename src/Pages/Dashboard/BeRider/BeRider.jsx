import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import agent from '../../../assets/agent-pending.png';

const BeRider = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const serviceCenters = useLoaderData();
    const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))];
    const region = watch("region");
    const getDistrictsByRegion = (region) =>
        serviceCenters.filter((w) => w.region === region).map((w) => w.district);

    const onSubmit = async (data) => {
        const riderData = {
            ...data,
            name: user.displayName,
            email: user.email,
            status: "pending",
            applied_at: new Date(),
        };

        try {
            const res = await axiosSecure.post("/riders", riderData);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Application Submitted",
                    text: "Your rider application is under review.",
                    icon: "success",
                    confirmButtonColor: "#16a34a",
                });
            }
        } catch (error) {
            console.error("Rider application error:", error);
            Swal.fire("Error", "Failed to apply as a rider", "error");
        }
    };
    return (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 p-6 px-[10%] mx-auto md:my-20">
            {/* Form Section */}
            <div className="w-full lg:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-center lg:text-left">Apply to Be a Rider</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                            <label className="label">Name</label>
                            <input className="input input-bordered w-full bg-gray-100" defaultValue={user.displayName} readOnly />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="label">Email</label>
                            <input className="input input-bordered w-full bg-gray-100" defaultValue={user.email} readOnly />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="label">Phone Number</label>
                            <input {...register("phone", { required: true })} className="input input-bordered w-full" placeholder="Enter phone number" />
                            {errors.phone && <p className="text-red-500 text-sm">Phone number is required</p>}
                        </div>

                        {/* Age */}
                        <div>
                            <label className="label">Age</label>
                            <input
                                type="number"
                                {...register("age", { required: true, min: 18 })}
                                className="input input-bordered w-full"
                                placeholder="Must be 18+"
                            />
                            {errors.age && <p className="text-red-500 text-sm">Must be at least 18 years old</p>}
                        </div>

                        {/* National ID */}
                        <div>
                            <label className="label">National ID</label>
                            <input {...register("nid", { required: true })} className="input input-bordered w-full" placeholder="Enter NID number" />
                            {errors.nid && <p className="text-red-500 text-sm">National ID is required</p>}
                        </div>

                        {/* Region */}
                        <div>
                            <label className="label">Region</label>
                            <select {...register("region", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Region</option>
                                {uniqueRegions.map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                            {errors.region && <p className="text-red-500 text-sm">Region is required</p>}
                        </div>

                        {/* District */}
                        <div>
                            <label className="label">District</label>
                            <select {...register("district", { required: true })} className="select select-bordered w-full">
                                <option value="">Select District</option>
                                {getDistrictsByRegion(region).map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                            {errors.district && <p className="text-red-500 text-sm">District is required</p>}
                        </div>

                        {/* Bike Brand */}
                        <div>
                            <label className="label">Bike Brand</label>
                            <input {...register("bike_brand", { required: true })} className="input input-bordered w-full" placeholder="e.g. Honda, Bajaj" />
                            {errors.bike_brand && <p className="text-red-500 text-sm">Bike brand is required</p>}
                        </div>

                        {/* Bike Reg Number */}
                        <div>
                            <label className="label">Bike Registration No.</label>
                            <input {...register("bike_reg", { required: true })} className="input input-bordered w-full" placeholder="e.g. DHA-12-3456" />
                            {errors.bike_reg && <p className="text-red-500 text-sm">Bike reg no. is required</p>}
                        </div>
                        {/* Payment Number */}
                        <div>
                            <label className="label">Payment Method (bKash/Nagad/Bank)</label>
                            <input
                                {...register("payment_number", { required: true })}
                                className="input input-bordered w-full"
                                placeholder="Enter bKash/Nagad/Bank Account Number"
                            />
                            {errors.payment_number && (
                                <p className="text-red-500 text-sm">Payment number is required</p>
                            )}
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <button type="submit" className="btn bg-[#B6D63C] text-black">Apply Now</button>
                    </div>
                </form>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
                <img
                    src={agent}
                    alt="Delivery Rider"
                    className="w-full h-[50%]rounded-xl"
                />
            </div>
        </div>
    );
};

export default BeRider;
