import {supabase } from '../supabaseClient'


const messageResolvers = {
    Query : {
        messages : async () => {
            const { data , error} = await supabase.from('messages').select('*')
            if(error) throw new Error(error.message)
            return data
        },
        message : async (_:any , { id } : { id : string }) => {
            const { data , error} = await supabase.from('messages').select('*').eq('id' , id).single()           
            if(error) throw new Error(error.message)
            return data
        },
    },
    Mutation : {
        createMessage : async (_ : any , { name , email , message } : { name : string , email : string , message : string }) => {
            const { data , error} = await supabase.from('messages').insert([{ name , email , message }]).select('*').single()
            if(error) throw new Error(error.message)
            return data
        } ,
        deleteMessage : async (_ : any , { id } : { id : string }) => {
            const { data , error} = await supabase.from('messages').delete().eq('id' , id).select('*').single()
            if(error) throw new Error(error.message)
            if (!data) throw new Error(`Message with id ${id} not found.`);
            return true
        }
    },
}

export default messageResolvers