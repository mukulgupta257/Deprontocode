

// apis section to store all apis calling 

// api to get blogs 
const getpost=async _=>{
    const posts=await fetch('https://jsonplaceholder.typicode.com/posts',{ //using await to resolve promise 
    method:'GET',
    headers:{
        'Content-Type':'application/json'
    }
})
return await posts.json()
}

// api to get comments 
const getcomment=async _=>{
    const comments=await fetch('https://jsonplaceholder.typicode.com/comments',{ //using await to resolve promise 
    method:'GET',
    headers:{
        'Content-Type':'application/json'
    }
})
return await comments.json()
}

const blogpostscreen={
    after_render:async _=>{
        document.getElementById('backtohome').addEventListener('click',async _=>{
            console.log("rendered")
            const main_div=document.getElementById('main-div')
            main_div.innerHTML=await PostScreen.render();
            PostScreen.after_render() ? PostScreen.after_render():``
        })
    },
    render:async (blogid)=>{
        --blogid;
        const blog=await getpost()
        const comments=await getcomment()
        const newblog=blog[blogid]
        return`
            <div>
            <button id="backtohome">Back</button>
                ${newblog?`
                <div class="list-group mt-2">
                <div class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Tittle : ${newblog.title}</h5>
                    </div>
                    <p class="mb-1">Content : ${newblog.body}</p>
                    <small>Posted BY : ${newblog.userId}</small><br>
                    <div class="card card-body">
                    ${comments.map(comment=>`
                        ${newblog.id==comment.postId?`
                        <div class="comments">
                            <div>
                                Name:${comment.name}
                            </div>
                            <div>
                                E-mail:${comment.email}
                            </div>
                            <div>
                                Comment:${comment.body}
                            </div>

                        </div>
                        `:``}
                    `).join("\n")}
                </div>
                `:`blog not found`}
            </div>
        `
    }
}

const PostScreen={
    after_render:async _=>{
        const newpage=Array.from(document.getElementsByClassName('newblog')) 
        newpage.forEach(post => {
            post.addEventListener('click',async _=>{
                console.log("clicked"+post.id)
                const main_div=document.getElementById('main-div')
                main_div.innerHTML=await blogpostscreen.render(post.id);
                blogpostscreen.after_render();
            })
        });
    },
    render:async _=>{
        const blog=await getpost()
        const comments=await getcomment()
        return`
        <div id="post" class="mt-2">
        <ul class="blogs">
            ${blog.map((posts)=>`
            <div class="list-group mt-2">
                <div class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Tittle : ${posts.title}</h5>
                    </div>
                    <p class="mb-1">Content : ${posts.body}</p>
                    <small>Posted BY : ${posts.userId}</small><br>   
                    <button id=${posts.id} class="newblog">show Comments</button>
                </div>                
            </div>

            `).join("\n")}     
        </ul>
        </div>
        `
    }
}

window.addEventListener('load',async _=>{
    const main_div=document.getElementById('main-div')
    main_div.innerHTML=await PostScreen.render();
    PostScreen.after_render() ? PostScreen.after_render():``
})