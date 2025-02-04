import { create } from 'domain'
import {supabase } from '../supabaseClient'


const projectResolvers = {
    Query : {
        projects : async () => {
            const { data , error} = await supabase.from('projects').select('*')
            if(error) throw new Error(error.message)
            return data
        } ,
        project : async (_:any , { id } : { id : string }) => {
            const { data , error} = await supabase.from('projects').select('*').eq('id' , id)
            if(error) throw new Error(error.message)
            return data[0]
        },
        featuredProjects : async () => {
            const { data , error} = await supabase.from('projects').select('*').eq('is_featured' , true)
            if(error) throw new Error(error.message)
            return data
        }

    },
    Mutation : {
        createProject : async (_ : any , { user_id , title , slug , description , image_path , tech_stack , is_featured } : { user_id : string , title : string , slug : string , description : string , image_path : string , tech_stack : string[] , is_featured : boolean }) => {
            const { data , error} = await supabase.from('projects').insert([{ user_id , title , slug , description , image_path , tech_stack , is_featured }]).select('*').single()
            if(error) throw new Error(error.message)
            return data
        },
        updateProject : async (_ : any , { id , user_id , title , slug , description , image_path , tech_stack , is_featured } : { id : string , user_id : string , title : string , slug : string , description : string , image_path : string , tech_stack : string[] , is_featured : boolean }) => {
            const { data , error} = await supabase.from('projects').update({ user_id , title , slug , description , image_path , tech_stack , is_featured }).eq('id' , id).select('*').single()
            if(error) throw new Error(error.message)
            if (!data) throw new Error(`Project with id ${id} not found.`);
            return data
        },
        deleteProject : async (_ : any , { id } : { id : string }) => {
            const { data , error} = await supabase.from('projects').delete().eq('id' , id).select('*').single()
            if(error) throw new Error(error.message)
            if (!data) throw new Error(`Project with id ${id} not found.`);
            return true
        }
    },
}

export default projectResolvers