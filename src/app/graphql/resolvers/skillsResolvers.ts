import {supabase } from '../supabaseClient'


const skillsResolvers = {
    Query : {
        skills : async () => {
            const { data , error} = await supabase.from('skills').select('*')
            if(error) throw new Error(error.message)
            return data
        },
        skill : async (_:any , { id } : { id : string }) => {
            const { data , error} = await supabase.from('skills').select('*').eq('id' , id).single()           
            if(error) throw new Error(error.message)
            return data
        },
    },
    Mutation : {
        createSkill: async (_: any, { name, category, icon }: { name: string, category: string, icon: string }) => {
            const { data, error } = await supabase
                .from('skills')
                .insert([{ name, category, icon }])
                .select('*')
                .single(); // Ensure a single object is returned
        
            if (error) throw new Error(error.message);
            return data; // Ensure this matches the Skill type
        },
        
        updateSkill : async (_ : any , {id , name , category , icon} : {id : string , name : string , category : string , icon : string}) => {
            const { data , error} = await supabase.from('skills').update({name , category , icon}).eq('id' , id).select('*').single()
            if(error) throw new Error(error.message)
            if (!data) throw new Error(`Skill with id ${id} not found.`);
            return data
        },
        deleteSkill : async (_ : any , {id} : {id : string}) => {
            const { data , error} = await supabase.from('skills').delete().eq('id' , id).select('*').single()
            if (error) throw new Error(error.message);
            if (!data) throw new Error(`Skill with id ${id} not found.`);
            return true;
        },
    },
}

export default skillsResolvers