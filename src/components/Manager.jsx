import React, { useRef , useState , useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = ({online}) => {
    const ref = useRef(null);
    const [form, setform] = useState({site: "" , username: "" , password: ""});
    const [passArr, setPassArr] = useState([]);
    const [passType, setPassType] = useState("password");

    const getPass = async () => {
        let req = await fetch("http://localhost:3000/");
        let passwords = await req.json();
        // console.log(passwords);
        setPassArr(passwords);
    }

    useEffect(() => {
        getPass();
    }, [])
    

    const showPass = () => {
        if (ref.current) {
            if (ref.current.src.includes("/icons/eye-slash-solid.svg")) {
                ref.current.src = "/icons/eye-solid.svg";
                setPassType("text");
            } else {
                ref.current.src = "/icons/eye-slash-solid.svg";
                setPassType("password");
            }
        }
    };
    
    const savePass = async () => {
        if (form.username.toString().length <= 20 && form.password.toString().length <= 14) {

            // deletes if a password with existing id is saved
                if (form.id) {
                    await fetch("http://localhost:3000/" , {method: "DELETE" , headers: {"Content-Type":"application/json"}, body: JSON.stringify({id :form.id , email:online})});
                    form.id = "";
                    getPass();
                }
            // saves a passowrd with a new id 
                await fetch("http://localhost:3000/" , {method: "POST" , headers: {"Content-Type":"application/json"}, body: JSON.stringify({...form, id: uuidv4(), email: online })});
                getPass();
                setform({site: "" , username: "" , password: ""});
                form.id = "";
        }else {
            if (form.username.toString().length > 20) {
                toast.warn("Username can contain max 20 characters");
            }
            else{
                toast.warn("Password can contain max 14 characters");
            }
        }
    }

    const deletePass = async (id , user) => {
        // console.log(id + "deleting");
        let con = confirm("Do you want to delete this password ?");
        if(con){
        setPassArr(passArr.filter(item=>item.id != id));
        await fetch("http://localhost:3000/" , {method: "DELETE" , headers: {"Content-Type":"application/json"}, body: JSON.stringify({id})});
        getPass();
        toast.success("Password deleted for "+ user);
        }
    };

    const CopyPass = (text) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => toast("Text copied"));
        } else {
            toast.error("Clipboard API not supported");
        }
    };

    const EditPass = (id , user) => {
        setPassArr(passArr.filter(i=>i.id != id));// removes the desired password from all password saved
        setform({...passArr.filter(i=>i.id === id)[0] ,id: id});// set desired password elements to inputs 
        toast.success("Password edited for " + user);
    };
    
    const handleChange = (e) => {
        setform({...form , [e.target.name]:e.target.value});
    };

    return (
        <>
        <ToastContainer style={{paddingTop : "33px"}} position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        <div className="fixed top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className='container backdrop-blur-sm absolute left-[50%] translate-x-[-50%] mx-auto mt-16 w-3/5 border-2 border-slate-300 p-4 py-6 lg:w-2/5 lg:mx-4 rounded-lg shadow-2xl shadow-slate-800'>
            <label htmlFor="name" className='text-slate-100 ml-1 text-sm lg:text-lg'>Website Name</label>
            <input placeholder='Website name' type="text" className='flex-col rounded-full h-4 lg:h-10 w-full mx-auto mb-5 pl-2 p-3 lg:p-4 text-xs lg:text-sm bg-slate-200 lg:placeholder:text-sm placeholder:text-[9px]' onChange={handleChange} name='site' value={form.site} />
            <div className="flex">
                <label htmlFor="username" className='text-slate-100 w-3/5 ml-1 text-sm lg:text-lg'>Username</label>
                <label htmlFor="password" className='text-slate-100 w-2/5 ml-2 text-sm lg:text-lg'>Password</label>
            </div>
            <div className="flex">
                <input placeholder='Username (max 20 characters)' type="text" className='rounded-full h-4 lg:h-10 w-3/5 mx-auto mb-5 pl-2 p-3 lg:p-4 text-xs lg:text-sm bg-slate-200 lg:placeholder:text-sm placeholder:text-[9px]' onChange={handleChange} name='username' value={form.username} />
                <div className="relative h-10 w-2/5 ">
                <input placeholder='Password (max 14 characters)' type={passType} className='rounded-full h-4 lg:h-10 w-full mx-auto mb-5 pl-2 p-3 lg:p-4 text-xs lg:text-sm ml-1 absolute bg-slate-200 lg:placeholder:text-sm placeholder:text-[9px]' onChange={handleChange}  name='password' value={form.password} />
                <span className='absolute top-[6px] lg:top-[10px] right-0 lg:right-[5px] h-3 w-3 lg:h-5 lg:w-5 cursor-pointer' onClick={showPass}>
                    <img ref={ref} src="/icons/eye-slash-solid.svg" className='h-full w-full cursor-pointer' alt="/"/>
                </span>
                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                <button id='save' onClick={()=>{if(form.site != "" && form.username != "" && form.password != ""){savePass()}else{toast.warn("Enter Values !");}}} className='flex items-center justify-center rounded-full font-semibold bg-slate-200 text-[10px] lg:text-sm h-6 lg:h-10 w-24 lg:w-36 hover:bg-transparent hover:border-2 hover:text-white '>Save Password</button>
            </div>
        </div>
        <div className='container top-80 backdrop-blur-sm absolute left-[50%] translate-x-[-50%] mx-auto mt-8 w-full  p-1  lg:w-1/2 lg:mx-4 rounded-lg shadow-2xl shadow-slate-800  border-slate-300 border-2'>
            <h1 className='text-white text-center text-xl font-extrabold mb-3'>Your Saved Passwords</h1>
            {passArr.map((item , index) => {
                if ((item.email === online)) {
                    return <table key={index} className='text-white w-full text-xs lg:text-lg'>
                    <thead className='text-center bg-slate-800 text-sm lg:text-lg font-semibold'>
                        <tr>
                            <th className='w-[33%] pl-2 text-start'>Site</th>
                            <th className='w-[33%] text-start'>Username</th>
                            <th className='w-[33%] text-start'>Password</th>
                            <th className='w-[1%] text-start'></th>
                        </tr>
                    </thead> 
                    <tbody className='text-center cursor-pointer text-[5px]'>
                        <tr>
                            <td className='pl-2 hover:underline underline-offset-4 text-start text-sm'>
                                <span className='h-full flex items-center gap-1 cursor-pointer lg:text-sm text-[11px]'>
                                    <a href={item.site} target='_blank'>{item.site.includes("https://") ? item.site.slice(8,20) : item.site.slice(0,12)}</a>
                                    <div className="h-3 w-3 lg:h-4 lg:w-4">
                                        <lord-icon
                                            onClick={()=>{CopyPass(item.site)}}
                                            style={{"height":"100%" , "width":"100%"}}
                                            title="Copy"
                                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                                            colors="primary:#fff,secondary:#fff"
                                            trigger="hover">
                                        </lord-icon>
                                    </div>
                                </span>
                            </td>
                            <td className='hover:underline underline-offset-4 text-start text-sm '>
                                <span className='flex items-center gap-1 cursor-pointer lg:text-sm text-[11px]'>
                                    {item.username}
                                    <div className="h-3 w-3 lg:h-4 lg:w-4">
                                        <lord-icon
                                            onClick={()=>{CopyPass(item.username)}}
                                            style={{"height":"100%" , "width":"100%" }}
                                            title="Copy"
                                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                                            colors="primary:#fff,secondary:#fff"
                                            trigger="hover">
                                        </lord-icon>
                                    </div>
                                </span>
                            </td>
                            <td className='hover:underline underline-offset-4 text-start text-sm'>
                                <span className='flex items-center gap-1 cursor-pointer lg:text-sm text-[11px]'>
                                    {item.password}
                                    <div className="h-3 w-3 lg:h-4 lg:w-4">
                                        <lord-icon
                                            onClick={()=>{CopyPass(item.password)}}
                                            style={{"height":"100%" , "width":"100%" }}
                                            title="Copy"
                                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                                            colors="primary:#fff,secondary:#fff"
                                            trigger="hover">
                                        </lord-icon>
                                    </div>
                                </span>
                            </td>
                            <td className='hover:underline underline-offset-4 text-xs'>
                                <span className='flex items-center gap-1 cursor-pointer justify-end'>
                                    <lord-icon
                                        style={{"height":"17px" , "width":"17px"  }}
                                        title="Delete"
                                        onClick={()=>{deletePass(item.id , item.username)}}
                                        src="https://cdn.lordicon.com/hwjcdycb.json"
                                        trigger="hover"
                                        stroke="bold"
                                        colors="primary:#fff,secondary:#fff">
                                    </lord-icon>
                                    <lord-icon
                                        style={{"height":"17px" , "width":"17px"  }}
                                        title="Edit"
                                        onClick={()=>{EditPass(item.id , item.username)}}
                                        src="https://cdn.lordicon.com/exymduqj.json"
                                        trigger="hover"
                                        stroke="bold"
                                        state="hover-line"
                                        colors="primary:#fff,secondary:#fff">
                                    </lord-icon>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                }
                else{
                    return <div className='text-white text-center text-xl font-extrabold mb-3 w-full'>No passwords saved</div>
                }
            })}
        </div>
        </>
    )
}

export default Manager