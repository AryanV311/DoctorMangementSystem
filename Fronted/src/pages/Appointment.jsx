import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { RelatedDoctors } from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

export const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol,backendUrl, getDoctorsData,token, userData } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState(null);
  const daysOfWeeks = ['SUN', 'MON','TUE','WED','THUR','FRI','SAT']

  const navigate = useNavigate()

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    // console.log(docInfo);
  };

  const getAvailableSlot = async() => {
    setDocSlots([]);

    let today = new Date();

    for(let i = 0; i < 7; i++){
      
      //getting dates with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //setting end time of date with index
      let endTime = new Date();   
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21,0,0,0);

      //setting Hours
      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      }else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = [];
      while(currentDate < endTime){
        let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});


        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if(isSlotAvailable){
          // add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })
        }

        

        // Increment current times by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))

    }
  }

  const bookAppointment = async() => {
    if(!token){
      toast.warn("Login to book Appointment")
      console.log("login please");
      return navigate("/login")
      
    }
    try {
        let date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        console.log("docId", docId);
        
        const userId = userData._id
        console.log("object",userId);

        const slotDate = day + "_" + month + "_" + year
       

        const {data}  = await axios.post(backendUrl + '/api/user/book-appointment', {docId,slotDate,slotTime}, {headers:{token}})
        console.log("data___",data);
        if(data.success){
          toast.success(data.message)
          getDoctorsData()
          navigate("/my-appointments")

        } else {
          toast.error(data.message)
        }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlot();
  },[docInfo])

  // useEffect(() => {
  //   console.log(docSlots);
  // },[docSlots])

  return (
    docInfo && (
      <div>
        {/* ------ Doctor Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img className="w-full bg-primary sm:max-w-72 rounded-lg" src={docInfo.image} alt="" />
          </div>

          <div className="flex-1 border border-gray-400 p-8 py-7 rounded-lg bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0  ">
            {/* ---------- Doc Info : name degree experience */}
            <p className="flex items-center text-2xl font-medium gap-2 text-gray-900">
              {docInfo.name}
              <img src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center text-sm gap-2 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
            </div>

                {/* ------------Doctor About --------------- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
            </div>
            <p className=" text-gray-500 font-medium mt-4">
              Appointment fees: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>

            {/* ---------Booking Slots */}

            <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
              <p>Booking Slots</p>
              <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                {
                  docSlots.length && docSlots.map((item,index) => (
                    <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-primary text-white": "border border-x-gray-200"}`} key={index}>
                          <p>{item[0] && daysOfWeeks[item[0].datetime.getDay()]}</p>
                          <p>{item[0] && item[0].datetime.getDate()}</p>
                    </div>
                  ))
                }
              </div>

              <div className="flex items-center w-full gap-3 overflow-x-scroll mt-4">
                {
                  docSlots.length && docSlots[slotIndex].map((item, index) => (
                    <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? "bg-primary text-white": "text-gray-400 border border-gray-200"}`} key={index}>
                      {item.time.toLowerCase()}
                    </p>
                  ))
                }
              </div>
              <button onClick={bookAppointment} className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full mt-6">Book an Appointment</button>
            </div>

            <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};
