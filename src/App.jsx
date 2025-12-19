import { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
// import Landing from './Pages/landingpage/Landing'
// import Dashboard from './Pages/Dashboard/Dashboard'
// import Xlogin from './Pages/Xlogin'
// import ConsultationModal from './componenets/dashboard/ConsultationModal'
// import Calling from './componenets/dashboard/Calling'
import Index from "./routes";
import { VideoCallProvider } from "./context/VideoCallProvider";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="h-screen w-screen m-0 p-0 overflow-x-hidden">
      {/* <Landing /> */}
      {/* <Dashboard /> */}
      <GoogleOAuthProvider clientId="855702064548-6jje93hln82jjcd4s1uqftcqhb5qa64d.apps.googleusercontent.com">
        <VideoCallProvider userId={user._id}>
          <Index />
        </VideoCallProvider>
      </GoogleOAuthProvider>
      {/* <Xlogin /> */}
      {/* <ConsultationModal /> */}
      {/* <Calling /> */}
    </div>
  );
}

export default App;
