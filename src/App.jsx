// import TaskList from "./components/TaskList"

// function App() {
//   return (
//       <div className="bg-black">
//             <h1 className="text-[#CEBEA4] text-center text-5xl pt-10 pb-7 font-semibold"> 
//               <span className="text-[#ff5631]">TODO </span> LIST MANAGER
//             </h1>
//             <TaskList />
//         </div>
//   )
// }

// export default App


import TaskList from "./components/TaskList"

function App() {
  return (
      <div className="bg-black min-h-[100vh]">
            <h1 className="text-[#CEBEA4] text-center text-5xl pt-10 pb-7 font-semibold"> 
              <span className="text-[#ff5631]">TODO </span> LIST MANAGER
            </h1>
            <TaskList />
        </div>
  )
}

export default App