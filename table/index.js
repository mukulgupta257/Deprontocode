// api calling div
const getdata=async _=>{
    const posts=await fetch('https://jsonplaceholder.typicode.com/todos',{ //using await to resolve promise 
    method:'GET',
    headers:{
        'Content-Type':'application/json'
    }
})
return await posts.json()
}

const Completed={
    render:async _=>{
        const tabledata=await getdata()
        return`
        <div>
        <p>
        <button id="completed">Show completed</button>
        </P>
            <table id="dataTabe">
                <thead>
                    <tr>
                        <td>User Id</td>
                        <td>ID</td>
                        <td colspan=2>Title</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    ${tabledata.map(data=>`
                    ${data.completed===true?`<tr>
                    <td>1</td>
                    <td>${data.id}</td>
                    <td colspan=2>${data.title}</td>
                    <td>${data.completed}</td>
                </tr>`:``}
                    
                    }
                    `).join("\n")}
                </tbody>
            </table>
        </div>
        `
    }
}

const TableScreen={
    after_render:async _=>{
        document.getElementById('completed').addEventListener('click',async _=>{
            const main_div=document.getElementById('main-div')
            main_div.innerHTML=await Completed.render();
        })
    },
    render:async _=>{
        const tabledata=await getdata()
        return`
        <div>
        <p>
        <button id="completed">Show completed</button>
        </P>
            <table id="dataTabe">
                <thead>
                    <tr>
                        <td>User Id</td>
                        <td>ID</td>
                        <td colspan=2>Title</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    ${tabledata.map(data=>`
                    
                    <tr>
                        <td>${data.userId}</td>
                        <td>${data.id}</td>
                        <td colspan=2>${data.title}</td>
                        <td>${data.completed}</td>
                    </tr>
                    `).join("\n")}
                </tbody>
            </table>
        </div>
        `
    }
}

window.addEventListener('load',async _=>{
    const main_div=document.getElementById('main-div')
    main_div.innerHTML=await TableScreen.render();
    TableScreen.after_render() ? TableScreen.after_render():``
})