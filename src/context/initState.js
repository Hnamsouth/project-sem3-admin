const token = localStorage.getItem("token");
const STATE={
    cart:[],
    favourites:[],
    token:token,
    loading:false,
    afterScript:[],
    userStyle:null,
    products:[],
    EditProduct:null,
    PnProfile:null
}

export default STATE;