import React,{useEffect, useState} from 'react'
export default function Pagination(prop) {
  const [pages,setPages]= useState([])
  const [currentPage,setCurrentPage]= useState(1)
  useEffect(()=>{

  })
    // theres a lot of repetition in here
    function showPage(p){
      setCurrentPage(prev=>p)
      document.getElementsByClassName(`visible`)[0].className =`hidden`;
      // im not gonna touch refs after 2 years of not using react.
      // mostly cause i set it up in a way i cant easily.
      document.getElementById("page"+p).className = `m-4 grid grid-cols-6  gap-4 visible`;
    };
    function nextPage(){
      console.log("nextPage")
      console.log("currentPage:  "+currentPage)
      console.log("maxPage:  "+prop.pages.length)
      if (currentPage !== prop.pages.length ){
        setCurrentPage(prev => (currentPage+1))      
        console.log("nextPage"+currentPage)
        document.getElementsByClassName(`visible`)[0].className =`hidden`;
        document.getElementById("page"+(currentPage+1)).className = `m-4 grid grid-cols-6  gap-4 visible`;
      }
    };
    function prevPage(){
      console.log("prevPage")
      console.log("currentPage:  "+ currentPage)
      if (currentPage !== 1 ){
        setCurrentPage(prev=> (currentPage-1))
        console.log("prevPage:  "+ (currentPage-1))
        document.getElementsByClassName(`visible`)[0].className =`hidden`;
        document.getElementById("page"+(currentPage-1)).className = `m-4 grid grid-cols-6  gap-4 visible`;
      }
    };
  return (
  <>
        <nav aria-label="mb-4 Page navigation example" className="place-content-center">
      <ul className="place-content-center flex">
        <li>
          <button  className={`${currentPage >0? "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-[#150050] border border-e-4 border-black rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" :"invisible"}`} onClick={()=>prevPage()}>Previous</button>
        </li>
        {
          prop.pages.map((e,i)=>{
            return <button  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-[#150050] border border-e-4 border-black rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" key={i} onClick={()=>showPage(i+1)} >{i+1}</button>
          }
          )
        }
        <li>
          <button className={`${currentPage <prop.pages.length+1? "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-[#150050] border border-e-4 border-black rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" :"invisible"}`}onClick={()=>nextPage()}>Next</button>
        </li>
        </ul>
    </nav>  
    {prop.pages.map((pages,i)=>{
      
      return(
        <>
        <div className={(i>0)?'mt-4 grid grid-cols-6  gap-4 hidden':`m-4 grid grid-cols-6 mt-5  gap-4 visible `} key={i+1} id={`page${i+1}`}>
          {pages}
        </div>

        </>
        )
      })
    }
        <nav aria-label="mb-4 Page navigation example" className="place-content-center">
      <ul className="place-content-center flex">
        <li>
          <button  className={`${currentPage >0? "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-[#150050] border border-e-4 border-black rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" :"invisible"}`} onClick={()=>prevPage()}>Previous</button>
        </li>
        {
          prop.pages.map((e,i)=>{
            return <button  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-[#150050] border border-e-4 border-black rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" key={i} onClick={()=>showPage(i+1)} >{i+1}</button>
          }
          )
        }
        <li>
          <button className={`${currentPage <prop.pages.length? "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-[#150050] border border-e-4 border-black rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" :"invisible"}`}onClick={()=>nextPage()}>Next</button>
        </li>
        </ul>
    </nav>  

  </>
  )
}
