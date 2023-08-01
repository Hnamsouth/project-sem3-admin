import React, {useContext, useState} from 'react';
import {create} from "../../Service/categories.service";
import UserContext from "../../context/userContext";



function CreateCategory(props) {
    const {state,dispatch}=useContext(UserContext)


    const [category,setCategory]=useState({Name:""});
    const submit =async (data) => {
        const category = await create(data);






    }
    const handleInput=(event)=>{
        category[event.target.name]=event.target.value;
        setCategory(category);
    }




    return (
        <div>
            <div className={'container'}>
                <div className="col-md-12">
                    <div className="card ">
                        <div className="card-header card-header-rose card-header-text">
                            <div className="card-text">
                                <h4 className="card-title">Create Category</h4>
                            </div>
                        </div>
                        <div className="card-body ">
                            <form method="post" onSubmit={submit} className="form-horizontal">
                                <div className="row">
                                    <label className="col-sm-2 col-form-label">Name</label>
                                    <div className="col-sm-10">
                                        <div className="form-group">
                                            <input onChange={handleInput} name={'name'}  type="text" className="form-control" />
                                            <span className="bmd-help">A block of help text that breaks onto a new line.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-10
                                   ">
                                        <button type={'submit'} className={'btn btn-primary '}>Submit</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CreateCategory;