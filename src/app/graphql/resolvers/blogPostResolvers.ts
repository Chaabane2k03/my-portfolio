import { create } from 'domain'
import {supabase } from '../supabaseClient'


const blogPostResolvers = {
    Query : {
        blogPosts : async () => {
            const { data , error} = await supabase.from('blog_posts').select('*')
            if(error) throw new Error(error.message)
            return data
        },
        blogPost : async (_:any , { id } : { id : string }) => {
            const { data , error} = await supabase.from('blog_posts').select('*').eq('id' , id).single()
            if(error) throw new Error(error.message)
            return data
        },
        publishedBlogPosts : async () => {
            const { data , error} = await supabase.from('blog_posts').select('*').eq('is_published' , true)
            if(error) throw new Error(error.message)
            return data
        },
    },
    Mutation : {
          
            /**
             * 
             * createBlogPost(
    user_id: ID!
    title: String!
    slug: String!
    content: String!
    cover_path: String
    is_published: Boolean!
  ): BlogPost!
  updateBlogPost(
    id: ID!
    title: String
    slug: String
    content: String
    cover_path: String
    is_published: Boolean
  ): BlogPost!
  deleteBlogPost(id: ID!): Boolean!
             * 
             * 
             */

        createBlogPost : async (_ : any , { user_id , title , slug , content , cover_path , is_published } : { user_id : string , title : string , slug : string , content : string , cover_path : string , is_published : boolean }) => {
            const { data , error} = await supabase.from('blog_posts').insert([{ user_id , title , slug , content , cover_path , is_published }]).select('*').single()
            if(error) throw new Error(error.message)
            return data
        } ,
        updateBlogPost : async (_ : any , { id , user_id , title , slug , content , cover_path , is_published } : { id : string , user_id : string , title : string , slug : string , content : string , cover_path : string , is_published : boolean }) => {
            const { data , error} = await supabase.from('blog_posts').update({ user_id , title , slug , content , cover_path , is_published }).eq('id' , id).select('*').single()
            if(error) throw new Error(error.message)
            if (!data) throw new Error(`BlogPost with id ${id} not found.`);
            return data
        },
        deleteBlogPost : async (_ : any , { id } : { id : string }) => {
            const { data , error} = await supabase.from('blog_posts').delete().eq('id' , id).select('*').single()
            if(error) throw new Error(error.message)
            if (!data) throw new Error(`BlogPost with id ${id} not found.`);
            return true
        },
         
    },
}

export default blogPostResolvers