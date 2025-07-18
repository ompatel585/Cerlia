// // client/src/components/FlowBuilder/Connect.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Connect = () => {
//   const navigate = useNavigate();
//   const [path, setPath] = useState(`/qrCodeGen`);
//   const [method, setMethod] = useState("POST");

//   const handleConnect = () => {
//     console.log("Connecting API with:", { path, method });
//     // 🔁 You can send data to backend here (e.g., axios.post(...))
//     navigate("/"); // Go back to FlowBuilder
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
//       <div className="bg-[#1f1f1f] p-6 rounded shadow-lg w-[400px]">
//         <h2 className="text-xl font-semibold mb-3">REST API Call</h2>
//         <p className="text-sm text-gray-400 mb-4">
//           Create an API / HTTP endpoint as the trigger for your workflow.
//         </p>

//         <label className="block text-sm mb-1">Path</label>
//         <input
//           value={path}
//           onChange={(e) => setPath(e.target.value)}
//           className="w-full mb-4 p-2 bg-gray-800 rounded border border-gray-600"
//         />

//         <label className="block text-sm mb-1">Method</label>
//         <select
//           value={method}
//           onChange={(e) => setMethod(e.target.value)}
//           className="w-full mb-4 p-2 bg-gray-800 rounded border border-gray-600"
//         >
//           <option value="GET">GET</option>
//           <option value="POST">POST</option>
//           <option value="PUT">PUT</option>
//           <option value="DELETE">DELETE</option>
//           <option value="PATCH">PATCH</option>
//         </select>

//         <button
//           onClick={handleConnect}
//           className="w-full bg-blue-600 py-2 rounded hover:bg-blue-500"
//         >
//           Connect
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Connect;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import RestTriggers from "../components/RestAPI/RestTriggers";

// const Connect = () => {
//   return (
//     <div className="min-h-screen text-white ">
//       <div className="flex flex-col justify-center items-center pt-4 ">
//         <h1 className="text-3xl">API Endpoint</h1>
//         <p className="text-xl">
//           Define Path and http method to test api instantly
//         </p>
//       </div>
//       <div className="flex">
//         <div className="w-[30%]">
//           <RestTriggers />
//         </div>
//         <div className="flex flex-col">
//           <div>
//             <h1>Your API Endpoints</h1>
//           </div>
//           <div className="">
//             <label className="mr-2">Path</label>
//             <input type="text" value={" /"} className="border border-white" />
//           </div>
//           <div className="gap-y-2 my-3">
//             <p>Method</p>
//             <div className="mx-3">
//               <p>GET</p>
//               <p>POST</p>
//               <p>PUT</p>
//               <p>PATCH</p>
//               <p>DELETE</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Connect


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RestTriggers from "../components/RestAPI/RestTriggers";

const Connect = () => {
  const [selectedMethods, setSelectedMethods] = useState([]);

  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  const handleToggle = (method) => {
    setSelectedMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  };

  return (
    <div className="min-h-screen text-white">
      <div className="flex flex-col justify-center items-center pt-4">
        <h1 className="text-3xl">API Endpoint</h1>
        <p className="text-xl">
          Define Path and http method to test api instantly
        </p>
      </div>
      <div className="flex px-6">
        <div className="w-[30%]">
          <RestTriggers />
        </div>

        <div className="flex flex-col">
          <div>
            <h1 className="text-xl font-semibold mb-2">Your API Endpoints</h1>
          </div>

          <div className="mb-4">
            <label className="mr-2">Path</label>
            <input
              type="text"
              value={"/"}
              className="border border-white bg-transparent text-white px-2 py-1 rounded"
            />
          </div>

          <div className="gap-y-2 my-3">
            <p className="font-medium text-lg">Method</p>
            <div className="mx-3 flex flex-col gap-2">
              {methods.map((method) => (
                <label
                  key={method}
                  className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md transition-all 
                    ${
                      selectedMethods.includes(method)
                        ? "bg-blue-600 text-white shadow"
                        : "bg-transparent hover:bg-gray-800"
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedMethods.includes(method)}
                    onChange={() => handleToggle(method)}
                    className="accent-blue-500 h-4 w-4"
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
