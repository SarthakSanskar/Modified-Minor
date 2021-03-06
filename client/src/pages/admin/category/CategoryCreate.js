import React, {useState,useEffect} from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {
  createCategory,
  getCategories,
  removeCategory
} from '../../../functions/category';
import { Link } from 'react-router-dom';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {


  const {user} = useSelector((state) => ({ ...state }));

  const [name,setName] = useState('');
  const [loading,setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  //step 1
  const [keyword, setKeyword] = useState('');


  useEffect(() => {
      loadCategories();
  }, []);

  const loadCategories = () =>
      getCategories().then((c) => setCategories(c.data));



  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createCategory({name}, user.token)
    .then(res => {
      setLoading(false);
      setName('');
      toast.success(`"${res.data.name}" is created`);
      loadCategories();
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
      if (err.response.status === 400) toast.error(err.response.data);
    })
  }


  const handleRemove = async (slug) => {
    let answer = window.confirm('Delete..?');
    // console.log(answer);
    if (answer){
      setLoading(true);
      console.log(user.token);
      removeCategory(slug,user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.name} deleted`);
        loadCategories();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.data);
        setLoading(false);}
      })
    }
  }

  // Step 3
  // const handleSearchChange = (e) => {
  //   e.preventDefault();
  //   setKeyword(e.target.value.toLowerCase())
  // };

  // Step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return(
  <div className='container-fluid'>
    <div className='row'>
        <div className='col-md-2'>
            <AdminNav />
        </div>
        <div className='col'>
                {loading ?(
                  <h3 className='text-danger'> Loading... </h3>
                ) : (
                  <h3> Create Category </h3>
                ) }
                <CategoryForm name={name} handleSubmit={handleSubmit} setName={setName}  />


                {/*step 2  and step 3 */}
                < LocalSearch keyword={keyword} setKeyword={setKeyword} />

            // <hr/>

            {/*  step 5 */}
                {categories.filter(searched(keyword)).map((c) => (
                    <div className='alert alert-info' key={c._id}>
                        {c.name} {" "}
                        <span onClick={() => handleRemove(c.slug)} className='btn btn-sm float-right'>
                            <DeleteOutlined className='text-danger' />
                        </span>{" "}
                        <Link to={`/admin/category/${c.slug}`}>
                            <span className='btn btn-sm float-right'>
                                < EditOutlined  />
                            </span>
                        </Link>
                    </div>
                ))}
        </div>
    </div>
  </div>)
};

export default CategoryCreate;
