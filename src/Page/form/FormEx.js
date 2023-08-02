import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const FormEXP= ()=>{
// prepare schema for validate
const schema = yup.object({
    Name:yup.string().required().min(4).max(10),
    Age:yup.number().required().integer().positive().max(99),
    Email:yup.string().required().email("Not a Email")
}).required();

const {register,handleSubmit,formState:{errors}}=useForm({
    resolver:yupResolver(schema),
})

const onSubmit = (data) =>{
    console.log(data);
    //  call api...
}

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('Name')}/>
                    <p>{errors.Name?.message}</p>

                    <input {...register('Email')}/>
                    <p>{errors.Email?.message}</p>

                    <input type="submit"/>
            </form>

        </div>
      


    );
}
export default FormEXP;