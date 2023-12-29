import Lottie from "lottie-react";
import loginanimation from "../../assets/animation/loginanimation.json"
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProviders";
const imageHostingToken = import.meta.env.VITE_IMGBB_KEY;
const Signup = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const imagHostingUrl = `https://api.imgbb.com/1/upload?&key=${imageHostingToken}`;
    const onSubmit = data => {

        const formData = new FormData();
        formData.append('image', data.image[0]);
        fetch(imagHostingUrl, {
            method: "POST",
            body: formData
        }).then(res => res.json()).then(imgRes => {

            if (imgRes.success) {
                const imgurl = imgRes.data.display_url;
                const { name, email, password } = data;
                createUser(email, password).then((logedUser) => {
                    const newlyCreatedUser = logedUser.user;
                    console.log(newlyCreatedUser);
                    updateUserProfile(name, imgurl).then(() => {
                        const userDetails = {
                            name,
                            email,
                            profile_pic: imgurl,
                            role: "user",
                            points:0
                        }
                        /********Insert user details in the database********/

                        fetch('http://localhost:5000/users', {
                            method: "POST",
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(userDetails)
                        }).then(res => res.json())
                            .then(data => {
                                reset();
                                logout();
                                console.log(data)
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Account create successfully',
                                })
                                navigate("/login", { replace: true });
                            });


                    }).catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${error}`,
                        })
                    });

                })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${errorMessage} - ${errorCode}`,
                        })
                    });




            }
        })
    };

    return (
        <div className="hero min-h-screen my-16 lg:my-0 bg-[#F9F9FF]">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h5 className="text-center">
                        Already have an account?
                        <Link className="text-blue-500" to="/login"> Move on to login!</Link>
                    </h5>
                    <Lottie animationData={loginanimation} loop={true} />
                </div>
                <div className="card flex-shrink-0 w-full max-w-md">
                    <div className="card-body">
                        <h1 className="text-3xl font-semibold">Sign Up</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("name", { required: true })} type="text" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Profile Picture</span>
                                </label>
                                <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered file-input-xs w-full" />
                                {errors.image && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{};':"\\|,.<>/?]).+$/
                                })} type="text" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'minLength' && <p className="text-red-500">Password Must be 6 Charecter Long</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-500">Password must have one uppercase lowercase symbol and number</p>}
                                {errors.password?.type === 'required' && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all  duration-300 delay-100">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;