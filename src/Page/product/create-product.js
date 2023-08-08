import React, { useContext, useEffect, useState } from 'react';
import { create } from '../../Service/products.service';
import UserContext from '../../context/userContext';
import { get } from '../../Service/categories.service';

function CreateProduct(props) {

    const [categories, setCategories] = useState([]);
    
    const list = async () => {
        const categories = await get();
        setCategories(categories);

    }

    useEffect(() => {
        list()
    }, [])

    const submit = async(data) => {
        data.preventDefault();
        const rs = await create; 
    }



    return (
        <div className={'container'}>
            <div className="col-md-12">
                <div className="card ">
                    <div className="card-header card-header-rose card-header-text">
                        <div className="card-text">
                            <h4 className="card-title">Form Elements</h4>
                        </div>
                    </div>
                    <div className="card-body ">
                        <form method="post" className="form-horizontal">
                            <div className="row">
                                <label className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name={'name'} />
                                        <span className="bmd-help">Enter name.</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-sm-2 col-form-label">Price</label>
                                <div className="col-sm-10">
                                    <div className="form-group">
                                        <input type="text" name={'price'} className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-sm-2 col-form-label">Description</label>
                                <div className="col-sm-10">
                                    <div className="form-group">
                                        <textarea type="text" name={'description'} className="form-control form-control-lg" rows={4}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-sm-2 col-form-label">Color</label>
                                <div className="col-sm-10">
                                    <div className="form-group">
                                        <input type="text" name={'color'} className="form-control" />
                                    </div>
                                </div>
                            </div>


                            <div className='row'>
                                <label className='col-sm-2 col-form-label'>Category</label>
                                <div className='col-sm-10'>
                                    <div className='form-group'>
                                        <select name={'categoryId'} className='form-control'>
                                        {
                                            categories.map((e) =>{
                                                return (
                                                <option value={e.id}>{e.name}</option>
                                                )
                                            })
                                        }
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div className='row'>
                                <label className='col-sm-2 col-form-label'>Category Detail</label>
                                <div className='col-sm-10'>
                                    <div className='form-group'>
                                        <select name={'categoryDetailId'} className='form-control'>
                                            <option ></option>
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div className='row'>
                                <label className='col-sm-2 col-form-label'>Kind</label>
                                <div className='col-sm-10'>
                                    <div className='form-group'>
                                        <select name={'kindOfSport'} className='form-control'>
                                            <option ></option>
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <label className="col-sm-2 col-form-label label-checkbox">Gender</label>
                                <div className="col-sm-10 checkbox-radios">
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="radio" name={'gender'} defaultValue="1" defaultChecked /> Men
                                            <span className="form-check-sign">
                        <span className="check" />
                      </span>
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="radio" name={'gender'} defaultValue="2" /> Women
                                            <span className="form-check-sign">
                        <span className="check" />
                      </span>
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="radio" name={'gender'} defaultValue="" /> All
                                            <span className="form-check-sign">
                        <span className="check" />
                      </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-sm-2 col-form-label">Open Sale</label>
                                <div className="col-sm-10">
                                    <div className="form-group">
                                        <input type='date' name={'openSale'} className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-sm-2 col-form-label label-checkbox">Status</label>
                                <div className="col-sm-10 checkbox-radios">
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="radio" name={'status'} defaultValue='1' /> Open
                                            <span className="form-check-sign">
                        <span className="check" />
                      </span>
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="radio" name={'status'} defaultValue='2' /> Close
                                            <span className="form-check-sign">
                        <span className="check" />
                      </span>
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="radio" name={'status'} defaultValue='3' /> Opening soon
                                            <span className="form-check-sign">
                        <span className="check" />
                      </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;