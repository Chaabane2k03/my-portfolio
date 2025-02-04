import { create } from 'domain'
import {supabase } from '../supabaseClient'


const experienceResolvers = {
    Query : {
        experiences : async () => {
            const { data , error} = await supabase.from('experiences').select('*')
            if(error) throw new Error(error.message)
            return data
        },
        experience : async (_:any , { id } : { id : string }) => {
            const { data , error} = await supabase.from('experiences').select('*').eq('id' , id).single()           
            if(error) throw new Error(error.message)
            return data
        },
    },
    Mutation : {
        createExperience : async (_ : any , { user_id , job_title , company , start_date , end_date , description , type } : { user_id : string , job_title : string , company : string , start_date : string , end_date : string , description : string , type : string }) => {
            const { data , error} = await supabase.from('experiences').insert([{ user_id , job_title , company , start_date , end_date , description , type }]).select('*').single()
            if(error) throw new Error(error.message)
            return data
        },
        updateExperience : async (_ : any , { id , user_id , job_title , company , start_date , end_date , description , type } : { id : string , user_id : string , job_title : string , company : string , start_date : string , end_date : string , description : string , type : string }) => {
            const { data , error} = await supabase.from('experiences').update({ user_id , job_title , company , start_date , end_date , description , type }).eq('id' , id).select('*').single()
            if(error) throw new Error(error.message)
            if (!data) throw new Error(`Experience with id ${id} not found.`);
            return data
        },
        deleteExperience : async (_ : any , { id } : { id : string }) => {
            const { data , error} = await supabase.from('experiences').delete().eq('id' , id).select('*').single()
            if(error) throw new Error(error.message)
            if (!data) throw new Error(`Experience with id ${id} not found.`);
            return true
        }
    },
}

export default experienceResolvers