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
import { useQuery } from "react-query";

const Profile = () => {
  const MySwal = withReactContent(Swal);
  const [user, loading] = useAuthState(auth);
  const [isDisabold, setDisabold] = useState(true);
  const [updateProfile, updating] = useUpdateProfile(auth);
  const [updatedProfileImage, setUpdatedProfileImage] = useState("");
  const [fbLink, setFbLink] = useState("");
  const [linkdinLink, setLinkdinLink] = useState("");
  const [githubLink, setGithubLink] = useState("");

  // get profle info
  const {
    data: profileInfo,
    isLoading,
    refetch,
  } = useQuery(["getProfile", user], () =>
    fetch(`http://localhost:5000/user?email=${user?.email}`, {
      headers: {
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  // Handle profile pic
  const handleProfilePricUrl = async () => {
    const photo = await MySwal.fire({
      title: "Your photo URL",
      input: "text",
      inputLabel: "Your IP address",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to give photo url!";
        }
      },
    }).then((res) => setUpdatedProfileImage(res.value));
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
    const updatedName =
      e.target?.name?.value || profileInfo?.name || user?.displayName;
    const updatedPhone = e.target.phone?.value || profileInfo?.phone;
    const updatedAddress = e.target.address?.value || profileInfo?.address;
    const gender = e.target.gender?.value || profileInfo?.gender;
    const education = e.target.education.value || profileInfo?.education;

    const updatedInfo = {
      name: updatedName,
      phone: updatedPhone,
      address: updatedAddress,
      education: education,
      gender: gender,
      image: updatedProfileImage || user?.photoURL,
      socialMedia: {
        fb: fbLink || profileInfo?.socialMedia?.fb,
        linkdin: linkdinLink || profileInfo?.socialMedia?.linkdin,
        gitHub: githubLink || profileInfo?.socialMedia?.gitHub,
      },
    };
    console.log(updatedInfo, updatedProfileImage)
    // update data in database
    fetch(`http://localhost:5000/updateUser?email=${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(updatedInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          updateProfile({
            displayName: updatedName,
            photoURL: updatedProfileImage || user?.photoURL,
          });
          toast.success("Your information updated.");
          refetch();
        }
      });
  };

  if (loading || updating || isLoading) {
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
            <h3 className="text-lg">
              Phone : {profileInfo?.phone || "0100000000"}
            </h3>
            <h3 className="text-lg">Gender : {profileInfo?.gender}</h3>
            <h3 className="text-lg">{profileInfo?.address}</h3>

            <button className="btn mt-3" onClick={handleProfilePricUrl}>
              Update Pic
            </button>
          </div>

          <div className="bg-white p-3 rounded mt-5">
            <div className="flex items-center justify-between">
              <a href={profileInfo?.socialMedia?.fb || "#"} className="flex items-center text-xl">
                <img
                  className="w-10 mb-5 mr-2 mt-4"
                  src="https://i.ibb.co/JyFbkD2/facebook.png"
                  alt=""
                />
                <span>Facebook</span>
              </a>

              <div>
                {(fbLink || profileInfo?.socialMedia?.fb) && (
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
              <a href={profileInfo?.socialMedia?.linkdin || "#"} className="flex items-center text-xl">
                <img
                  className="w-10 mb-5 mr-2 mt-4"
                  src="https://i.ibb.co/C1YXjwj/linkedin.png"
                  alt=""
                />
                <span>Link din</span>
              </a>

              <div>
                {(linkdinLink || profileInfo?.socialMedia?.linkdin) && (
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
              <a href={profileInfo?.socialMedia?.gitHub || "#"} className="flex items-center text-xl">
                <img
                  className="w-10 mb-5 mr-2 mt-4"
                  src="https://i.ibb.co/Y3QZmSg/github1.png"
                  alt=""
                />
                <span>Facebook</span>
              </a>

              <div>
                {(githubLink || profileInfo?.socialMedia?.gitHub) && (
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
                  className=" w-full border-0 border-b-2 outline-0 py-2"
                  disabled={isDisabold}
                  name="name"
                />
              </div>
              <input
                type="email"
                value={`Email: ${user?.email}`}
                className=" w-full border-0 border-b-2 outline-0 py-4"
                disabled
              />

              <input
                type="number"
                className=" w-full border-0 border-b-2 outline-0 py-4"
                placeholder="Enter your phone number"
                min="0"
                disabled={isDisabold}
                name="phone"
              />

              <input
                type="text"
                className=" w-full border-0 border-b-2 outline-0 py-4"
                placeholder="Education"
                disabled={isDisabold}
                name="education"
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
                  value="Male"
                  id="gender"
                  className="radio mr-2"
                  disabled={isDisabold}
                />
                <label htmlFor="gender" className="mr-5">
                  Male
                </label>

                <input
                  type="radio"
                  name="gender"
                  id="Female"
                  value="female"
                  className="radio mr-2"
                  disabled={isDisabold}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>

            <div className="text-right">
              <button className="btn btn-secondary btn-sm mt-8">
                Save Changes
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
