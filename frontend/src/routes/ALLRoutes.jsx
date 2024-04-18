import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  ActivateAccount,
  Post,
  Hashtag,
  Profile,
  Tags,
  Search,
  Files,
} from "../pages/";
import { Terms, About, Help, Privacy } from "../pages/Static";
import { NotificationPage } from "../pages/utils/NotificationPage";
import { Points } from "../components/utils/Points";
import { Message, HashtagCard } from "../components";
import { MessageContext } from "../context";
import CommunityPage from "../pages/CommunityPage/CommunityPage";

export const ALLRoutes = () => {
  const { messages } = useContext(MessageContext);

  return (
    <div className=" overflow-x-hidden dark:bg-slate-800">
      <div className="fixed top-[100px] left-1/2 z-[100]">
        {messages.map((msg, index) => (
          <Message
            key={index}
            index={index}
            type={msg.type}
            message={msg.text}
          />
        ))}
      </div>
      <div className="mt-[200px] h-full md:mt-[85px]">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/question/:slug" element={<Post />} />

          {/* auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/password/reset/confirm/:uid/:token"
            element={<ResetPassword />}
          />
          <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
          <Route path="/register" element={<Register />} />

          {/* profile and querysets */}
          <Route path="/search/:search" element={<Search />} />
          <Route path="/hashtags" element={<Hashtag />} />
          <Route path="/tags/:id" element={<Tags />} />
          <Route path="/hashtags/:id" element={<HashtagCard />} />
          <Route path="/:username" element={<Profile />} />

          {/* files */}
          <Route path="/files" element={<Files />} />

          {/* utils */}
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/points" element={<Points />} />

          {/* static routes */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/about-us" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};
