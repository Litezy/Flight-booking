import React, { useCallback, useEffect, useState } from 'react'
import aeroimg from '../src/assets/aero.png'
import { useParams } from 'react-router-dom'
import { errorMessage, successMessage } from './utils/Utils'
import { ClientGetApi, ClientPostApi, UserApis } from './services/Api'
import _ from 'lodash'
const App = () => {
  const [search, setSearch] = useState('')
  const [save, setSave] = useState(false)
  // const { id } = useParams()
  const [show, setShow] = useState(false)
  const [update, setUpdate] = useState(false)
  const [singleUser, setSingleUser] = useState({})
  const [show2, setShow2] = useState(false)
  const [updatedUser, setUpdatedUser] = useState(false)
  const [screen, setScreen] = useState(1)
  const [userRecords, setUserRecords] = useState([])
  const [getUsers, setGetUsers] = useState([])
  const [rerender, setRerender] = useState(false)

  const [form, setForms] = useState({
    fullname: '',
    email: '',
    from: '',
    to: ''
  })

  const fetchUser = useCallback(async () => {
    try {
      const response = await ClientGetApi(UserApis.user.allusers)
      setGetUsers(response.msg)
      // console.log(response.msg)
    } catch (error) {
      errorMessage(error.message)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])



  const handleNameFilter = () => {
    if (!form.fullname) {
      setUserRecords([])
    }
    else if(update === true){
     return  setShow(false)
    }
    else if (form.fullname.length > 2) {
      const filteredItems = getUsers.filter((item) => item.fullname.toLowerCase().includes(form.fullname.toLowerCase()))
      setShow(true)
      setUserRecords(filteredItems)
    }
    else {
      setShow(false)
      setShow2(false)
    }
  }
  const handleChange = (e) => {
    setForms({
      ...form,
      [e.target.name]: e.target.value
    })
  }


  const Return = () => {
    setScreen(1)
    setSave(false)
    setForms('')
  }
  const handleSave = (e) => {
    e.preventDefault()
    if (update === true) {
      if (singleUser.fullname !== form.fullname ||
        singleUser.email !== form.email ||
        singleUser.from !== form.from ||
        singleUser.to !== form.to
      ) {
        setUpdatedUser(true)
      }
      else {
        setSave(true)
        console.log(form)
      }

    }

    else {
      setSave(true)
      console.log(form)
    }

  }
 

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (singleUser.id) {
      setForms({
        ...form,
        fullname: form.fullname,
        email: form.email,
        from: form.from,
        to: form.to
      })
      const formdata = form
      try {
        const response = await ClientPostApi(`${UserApis.user.updateuser}/${singleUser.id}`, formdata)
        if(response.status === 200){
          successMessage('Details Updated Successfully')
          setSave(false)
          setForms('')
          setScreen(3)
        }
      } catch (error) {
        errorMessage(error.message)
      }
    }
    else {
      setSave(false)
      if (!form.fullname) return errorMessage('fullname field is required')
      if (!form.email) return errorMessage('email field is required')
      if (!form.from) return errorMessage('the from field is required')
      if (!form.to) return errorMessage('the to field is required')

      const formbody = {
        fullname: form.fullname,
        email: form.email,
        from: form.from,
        to: form.to
      }
      try {
        const response = await ClientPostApi(UserApis.user.create, formbody)
        if (response.status === 200) {
          successMessage('User created successfully')
          setScreen(3)
          setForms('')
        }
      } catch (error) {
        errorMessage(error.message)
      }
    }

  }

  const Prefill = (user) => {
    setForms({
      ...form,
      fullname: user.fullname,
      email: user.email,
      from: user.from,
      to: user.to
    })
    setUpdate(true)
    setShow2(false)
   
  }

  const Refill = () => {
    setForms({
      ...form,
      fullname: singleUser.fullname,
      email: singleUser.email,
      from: singleUser.from,
      to: singleUser.to
    })
    setUpdate(false)
    setUpdatedUser(false)
    setRerender(true)
  }

  const SaveUser = () => {
    setUpdatedUser(false)
    setSave(true)
  }
  return (
    <div>
      <div className="w-full bg-slate-200 py-10">
        {screen === 1 && <div className="w-11/12 mx-auto h-fit py-5  bg-white rounded-e-none rounded-xl">
          <div className="text-center nunito  text-4xl text-blue-600 ">
            <h1 className='pt-2 font-bold'>
              Book Your Flight</h1></div>
          <p className='mt-10 text-center underline'>Fill the form below to continue with your booking!!!</p>
          <div className="flex items-center justify-center   mx-auto w-11/12">
            <form onSubmit={handleSave} className=" flex flex-col w-full nunito">
              <div className="my-2">
                <h2 className='text-2xl '>Full Name:</h2>
                <input onKeyUp={handleNameFilter} onChange={handleChange} name='fullname' value={form.fullname} type="text" className='border-2 outline-none mt-2 w-1/2 h-12 pl-3 rounded-md' placeholder='enter your name' />
              </div>
              <div className="my-2">
                <h2 className='text-2xl '>Email:</h2>
                <input onChange={handleChange} name='email' value={form.email} type="email" className='border-2 outline-none mt-2 w-1/2 h-12 pl-3 rounded-md' placeholder='enter your email' />
              </div>
              <div className="my-2">
                <h2 className='text-2xl '>From:</h2>
                <input onChange={handleChange} name='from' value={form.from} type="text" className='border-2 outline-none mt-2 w-1/2 h-12 pl-3 rounded-md' placeholder='your location' />
              </div>
              <div className="my-2">
                <h2 className='text-2xl '>To:</h2>
                <input onChange={handleChange} name='to' value={form.to} type="text" className='border-2 outline-none mt-2 w-1/2 h-12 pl-3 rounded-md ' placeholder='destination' />
              </div>
              {updatedUser && <>
                <div className="w-full">
                  <div className="text-center">You made some changes to your form, would you like to update your details?</div>
                  <div className="flex items-center w-2/4 mx-auto justify-evenly mt-5">
                    <button type='button' onClick={Refill} className='px-3 py-1 bg-red-600 text-white rounded-md'>discard</button>
                    <button type='button' onClick={SaveUser} className='px-5 py-1 bg-green-600 text-white rounded-md'>save</button>
                  </div>
                </div>
              </>}
              <div className="w-fit ml-auto">
                <button className='text-2xl px-10  text-white rounded-full py-2 bg-blue-600'>Submit</button>
              </div>
            </form>



            {show && <>
              <div className="absolute top-[30%] right-24 bg-blue-600 w-1/4 h-fit py-4 rounded-md nunito">
                <div className="text-center text-white font-bold mb-2 text-2xl">Matching Record Found</div>
                <div className="text-white flex item-center w-3/4 mx-auto justify-between">
                  <button onClick={() => { setShow(false), setShow2(false) }} className='bg-red-600 px-3 py-1 rounded-md'>dismiss</button>
                  <button onClick={() => { setShow2(true), setShow(false) }} className='px-3 bg-green-600 py-1 rounded-md'>Accept</button>
                </div>
              </div>
            </>}
            {show2 && <div className="w-1/4 bg-blue-600 h-[15rem] pb-3 scroll  overflow-y-auto absolute top-[27%] right-[20%]">
              <form
                className='flex w-full flex-col px-2 text-white'>
                <div className=" w-3/4 mx-auto">
                  <label className='text-2xl flex items-center justify-center font-bold'>Full Names Found</label>
                  <div className="">
                    {userRecords.map((user, index) => (
                      <div key={index} className="p-2 ">
                        <button className='font-bold'> {user.fullname}</button>
                        <div className="flex items-center justify-between">
                          <button type='button' onClick={() => { setShow(false), setShow2(false) }} className=' bg-white rounded-md  text-red-400 font-bold px-5 py-1 text-sm'>dismiss</button>
                          <button onMouseOver={() => setSingleUser(user)} onMouseLeave={() => setSingleUser({})} type='button' onClick={() => Prefill(user)} className=' bg-white text-green-400  rounded-md font-bold px-5 py-1 text-sm'>prefill</button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </form>
            </div>}
            {save &&
              <>
                <div className="w-11/12 absolute mx-auto h-64 flex items-center justify-center">
                  <form onSubmit={handleSubmit} className='w-full h-full flex items-center justify-center'>
                    <div className="w-2/4 rounded-md h-full bg-slate-300">
                      <div className="h-full">
                        <h1 className='text-center text-xl mt-3 font-bold '>Do you want to save these datails?</h1>
                        <div className="flex mt-28 w-2/4 mx-auto items-center justify-between ">
                          <button onClick={() => setScreen(3)} className='px-5 py-2 bg-red-600 text-white'>Dismiss</button>
                          <button className='text-white bg-green-600 px-5 py-2'>Accept</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </>}
          </div>
        </div>}

        {screen === 3 &&
          <>
            <div className="w-11/12 nunito bg-white h-full mx-auto flex items-center justify-center">
              <div className="flex flex-col w-full">
                <h1 className='text-3xl text-center capitalize'>Flight booked successfully!!!</h1>
                <img src={aeroimg} className='w-[30%] mx-auto' alt="" />
                <button onClick={Return} className='text-2xl bg-blue-600 text-white w-1/2 mx-auto py-5 mt-10'>Return to home page</button>
              </div>
            </div>
          </>}


      </div>
    </div>
  )
}

export default App