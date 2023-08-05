import React from 'react';

function CreateProduct(props) {
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
                        <form method="get" action="https://demos.creative-tim.com/" className="form-horizontal">
                            <div className="row">
                                <label className="col-sm-2 col-form-label">With help</label>
                                <div className="col-sm-10">
                                    <div className="form-group">
                                        <input type="text" className="form-control" />
                                        <span className="bmd-help">A block of help text that breaks onto a new line.</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <div className="form-group">
                                        <input type="password" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-sm-2 col-form-label">Placeholder</label>
                                <div className="col-sm-10">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="placeholder" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-sm-2 col-form-label">Disabled</label>
                                <div className="col-sm-10">
                                    <div className="form-group">
                                        <input type="text" className="form-control" defaultValue="Disabled input here.." disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-sm-2 col-form-label">Static control</label>
                                <div className="col-sm-10">
                                    <div className="form-group">
                                        <p className="form-control-static"><a href="https://demos.creative-tim.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="9df5f8f1f1f2ddfeeff8fce9f4ebf8b0e9f4f0b3fef2f0">[email&nbsp;protected]</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-sm-2 col-form-label label-checkbox">Checkboxes and radios</label>
                                <div className="col-sm-10 checkbox-radios">
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="checkbox" defaultValue /> First Checkbox
                                            <span className="form-check-sign">
                        <span className="check" />
                      </span>
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="checkbox" defaultValue /> Second Checkbox
                                            <span className="form-check-sign">
                        <span className="check" />
                      </span>
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="radio" name="exampleRadios" defaultValue="option2" defaultChecked /> First Radio
                                            <span className="circle">
                        <span className="check" />
                      </span>
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="radio" name="exampleRadios" defaultValue="option1" /> Second Radio
                                            <span className="circle">
                        <span className="check" />
                      </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-sm-2 col-form-label label-checkbox">Inline checkboxes</label>
                                <div className="col-sm-10 checkbox-radios">
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="checkbox" defaultValue /> a
                                            <span className="form-check-sign">
                        <span className="check" />
                      </span>
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="checkbox" defaultValue /> b
                                            <span className="form-check-sign">
                        <span className="check" />
                      </span>
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="checkbox" defaultValue /> c
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