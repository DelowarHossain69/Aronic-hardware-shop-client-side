import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../shared/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

const Profile = () => {
  const MySwal = withReactContent(Swal);
  const [picLoading, setPicLoading] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [isDisabold, setDisabold] = useState(true);
  const [updateProfile, updating, error] = useUpdateProfile(auth);
  const [fbLink, setFbLink] = useState("");
  const [linkdinLink, setLinkdinLink] = useState("");
  const [githubLink, setGithubLink] = useState("");

  // Handle profile pic
  const handleProfilePricUrl = async () => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    const apiKey = `db1cf374ed982951ad44a2316caee95e`;
    const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;
    // prifile pic uploading
    setPicLoading(true);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data?.success) {
          await updateProfile({ photoURL: data?.url });

          // prifile pic upload finish
          setPicLoading(false);
          toast.success("Profile pic updated");
        }
      });
  };

  // get social media link using alert
  const handleMediaLink = async (media) => {
    const facebookingLink = await MySwal.fire({
      title: `Enter your ${media} profile link`,
      input: "text",
      inputLabel: "Social media",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    }).then((res) => {
      if (media === "facebook") {
        setFbLink(res.value);
      } else if (media === "linkdin") {
        setLinkdinLink(res.value);
      } else if (media === "github") {
        setGithubLink(res.value);
      }
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedName = e.target?.name?.value;
    const updatedPhone = e.target.phone?.value;
    const updatedAddress = e.target.address?.value;
    const gender = e.target.gender?.value;

    const updatedInfo = {
      name: updatedName,
      phone: updatedPhone,
      address: updatedAddress,
      gender: gender,
      socialMedia: {
        fb: fbLink,
        linkdin: linkdinLink,
        gitHub: githubLink,
      },
    };

    console.log(updatedInfo);
  };

  if (loading || updating || picLoading) {
    return <Loading />;
  }

  return (
    <section className=" bg-gray-200 p-5 rounded">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="col-span-2">
          <div className="bg-white p-3 rounded text-center">
            <img
              src={user?.photoURL}
              className="w-28 h-28 mx-auto rounded-full mb-2"
              alt=""
            />
            <h2 className=" font-bold text-xl">{user?.displayName}</h2>
            <h3 className="text-lg">Phone : 000000</h3>
            <h3 className="text-lg">Gender : </h3>
            <h3 className="text-lg">Address</h3>

            <button className="btn mt-3" onClick={handleProfilePricUrl}>
              Update Pic
            </button>
          </div>

          <div className="bg-white p-3 rounded mt-5">
            <div className="flex items-center justify-between">
              <Link to="#" className="flex items-center text-xl">
                <img
                  className="w-10 mb-5 mr-2 mt-4"
                  src="https://i.ibb.co/JyFbkD2/facebook.png"
                  alt=""
                />
                <span>Facebook</span>
              </Link>

              <div>
                {fbLink && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-xl cursor-pointer mr-3 text-green-600 font-bold"
                    title="Edit"
                  />
                )}

                <FontAwesomeIcon
                  icon={faPen}
                  onClick={() => handleMediaLink("facebook")}
                  className="text-xl cursor-pointer"
                  title="Edit"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link to="#" className="flex items-center text-xl">
                <img
                  className="w-10 mb-5 mr-2 mt-4"
                  src="https://i.ibb.co/C1YXjwj/linkedin.png"
                  alt=""
                />
                <span>Link din</span>
              </Link>

              <div>
                {linkdinLink && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-xl cursor-pointer mr-3 text-green-600 font-bold"
                    title="Edit"
                  />
                )}

                <FontAwesomeIcon
                  icon={faPen}
                  onClick={() => handleMediaLink("linkdin")}
                  className="text-xl cursor-pointer"
                  title="Edit"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link to="#" className="flex items-center text-xl">
                <img
                  className="w-10 mb-5 mr-2 mt-4"
                  src="https://i.ibb.co/Y3QZmSg/github1.png"
                  alt=""
                />
                <span>Facebook</span>
              </Link>

              <div>
                {githubLink && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-xl cursor-pointer mr-3 text-green-600 font-bold"
                    title="Edit"
                  />
                )}

                <FontAwesomeIcon
                  icon={faPen}
                  onClick={() => handleMediaLink("github")}
                  className="text-xl cursor-pointer"
                  title="Edit"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Update your info---------------- */}
        <div className="col-span-3">
          <div className="text-right bg-white p-3 rounded-t">
            <FontAwesomeIcon
              icon={isDisabold ? faPen : faXmark}
              className="text-xl cursor-pointer"
              title="Edit"
              onClick={() => setDisabold(!isDisabold)}
            />
          </div>

          <form action="" className="space-y-5" onSubmit={handleFormSubmit}>
            <div
              className={`p-3 rounded bg-white space-y-4 ${
                isDisabold ? "text-gray-500" : "text-black"
              }`}
            >
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Your name"
                  class=" w-full border-0 border-b-2 outline-0 py-2"
                  disabled={isDisabold}
                  name="name"
                />
              </div>
              <input
                type="email"
                value={`Email: ${user?.email}`}
                class=" w-full border-0 border-b-2 outline-0 py-4"
                disabled
              />

              <input
                type="number"
                class=" w-full border-0 border-b-2 outline-0 py-4"
                placeholder="Enter your phone number"
                min="0"
                disabled={isDisabold}
                name="phone"
              />

              <textarea
                name="address"
                className="border-b-2 outline-none w-full mt-3 h-24"
                maxLength="100"
                placeholder="Address"
                disabled={isDisabold}
              ></textarea>

              <div className="flex items-center">
                <h2 className="mr-8 font-bold">Gender</h2>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  id="gender"
                  class="radio mr-2"
                  disabled={isDisabold}
                />
                <label htmlFor="gender" className="mr-5">
                  Male
                </label>

                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  class="radio mr-2"
                  disabled={isDisabold}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>

            <div className="text-right">
              <button className="btn btn-secondary btn-sm mt-8">
                Save
                <FontAwesomeIcon icon={faCheck} className="ml-2" title="Save" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
