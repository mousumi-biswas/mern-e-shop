import React, {useState, useEffect} from 'react';
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from "react-toastify"
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import {getCategories} from '../../../functions/category'

import {
    createSub,
    getSubs,
    removeSub,
   
} from '../../../functions/sub'

const SubCreate = () => {

    const {user} = useSelector((state) => ({...state }))

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [pcategory, setPCategory] = useState("")
    const [subs, setSubs] = useState([])

    // step 1 for search
    const [keyword, setKeyword] = useState("")


    useEffect(()=>{
        loadCategories()
        loadSubs()
    },[])

    const loadCategories = () => {
        getCategories().then((c) => setCategories(c.data))
    }

    const loadSubs = () => {
        getSubs().then((s) => setSubs(s.data))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(name)
        setLoading(true)
        createSub({name, parent: pcategory}, user.token)
        .then((res)=> {
            setLoading(false)
            setName("")
            toast.success(` "${res.data.name}" is created`)
            loadSubs()
           
        })
        .catch((err)=>{
            setLoading(false)
            if(err.response.status === 400) toast.error(err.response.data)
        })

    }

    const handleRemove = async (slug) => {
        if(window.confirm("Delete?")) {
            setLoading(true)
            removeSub(slug, user.token)
            .then((res)=> {
                setLoading(false)
                toast.error(`${res.data.name} is deleted`)
                loadSubs()

               
            })
            .catch((err)=>{
                if(err.response.status===400){
                    toast.error(err.response.data)
                }
            })
        }
    }

    const categoryForm = () => 

    <form onSubmit={handleSubmit}>
    <div className="form-group">
        <label>Name</label>
        <input type="text" 
        className="form-control"
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
        required
         />
    <br />
    <button className="btn btn-outline-primary">Save</button>
    </div>

    </form>

    //step 3 for search
    const handleSearchChange = (e)=>{
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())
    }
    //step 4
    const searched = (keyword)=> (c) =>c.name.toLowerCase().includes(keyword)
    
    return (
        <div className="container-fluid">
            <div className = "row">
                <div className='col-md-2'>
                  <AdminNav />
                </div>

                <div className="col">
                    {loading ? (
                        <h4 className="text-danger">Loading</h4>
                    ) : (
                        <h4>  Create Sub Category</h4>
                    )}

                    <div className="form-group">
                        <label>Select Category</label>
                        <select name = "category" 
                        className="form-control"
                        onChange={(e) => setPCategory(e.target.value)}
                        >

                        <option>Please select</option>
                        {categories.length > 0 && 
                        categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)
                        }
                        </select>
                    </div>
                
                  {categoryForm()}

               <input
               type="search"
               placeholder="Filter"
               value={keyword}
               onChange={handleSearchChange}
               classname="form-control mb-4" />


                  <hr />
                {subs.filter(searched(keyword)).map((s)=>(
                   <div className="alert alert-secondary" key={s._id}> 
                   {s.name} <span onClick={() => handleRemove(s.slug)} className="btn btn-sm float-right"><DeleteOutlined className="text-danger" /></span> 

                   <Link to={`/admin/sub/${s.slug}`}>
                   <span className="btn btn-sm float-right"><EditOutlined className="text-warning"/></span>
                   </Link>
                   
                   </div> 
                ))}
                </div>

            </div>
        </div>
    );
}

export default SubCreate;
