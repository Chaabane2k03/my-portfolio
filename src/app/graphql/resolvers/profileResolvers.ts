import { profile } from 'console'
import {supabase} from '../supabaseClient'


const profileResolvers = {
    Query : {
        profiles : async () => {
            const {data , error} = await supabase.from('profiles').select('*')
            if(error) throw new Error(error.message)
            return data
        },

        profile : async (_: any , {id}: {id: string}) => {
            const {data , error} = await supabase.from('profiles').select('*').eq('id' , id).single()
            if(error) throw new Error(error.message)
            return data
        }
    } ,
    Mutation : {
        createProfile : async (_ : any , {username , avatar_url , is_admin} : {username: string , avatar_url: string , is_admin: boolean}) => {
            const {data , error} = await supabase.from('profiles').insert({username , avatar_url , is_admin}).single()
            if(error) throw new Error(error.message)
            return data
        },

        updateProfile : async (_ : any , {id , username , avatar_url , is_admin} : {id: string , username?: string , avatar_url?: string , is_admin?: boolean}) => {
            const {data , error} = await supabase.from('profiles').update({username , avatar_url , is_admin}).eq('id' , id).single()
            if(error) throw new Error(error.message)
            return data
        },

        deleteProfile : async (_ : any , {id} : {id: string}) => {
            const {data , error} = await supabase.from('profiles').delete().eq('id' , id)
            if(error) throw new Error(error.message)
            return data
        }
    }
}

export default profileResolvers