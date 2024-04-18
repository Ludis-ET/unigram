import { LeftBar } from "../Home";
import { ProfileLoading, ProfileCard } from "../../components";
import { useProfile } from "../../hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import nodata from "../../assets/404_!.svg";

export const Profile = () => {
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const { username } = useParams();
  const [not, setNot] = useState(false);
  const { profile, profiles, getProfile } = useProfile(backendUrl);
  const [rank, setRank] = useState(0);
  useEffect(() => {
    if (profiles) {
      const x = profiles.filter((p) => p.user.username === username);
      if (x.length > 0) {
        setRank(profiles.indexOf(x[0]));
        getProfile(x[0].id);
      } else {
        setNot(true);
      }
    }
  }, [username, profiles, profile]);

  return (
    <div>
      <LeftBar />
      <div className="md:ml-[280px] mx-8 ">
        <header>
          {profile !== null ? (
            <ProfileCard rank={rank} profile={profile} />
          ) : !not ? (
            <ProfileLoading />
          ) : (
            <div className="w-full flex justify-center h-screen items-center">
              <div className="dark:text-white flex flex-col items-center  justify-center">
                <img src={nodata} className="w-56" />
                <p className="text-2xl">No Profile Found</p>
              </div>
            </div>
          )}
        </header>
      </div>
    </div>
  );
};
