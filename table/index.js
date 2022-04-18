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

const TableScreen={
    render:async _=>{
        const tabledata=await getdata()
        return`
        <div>
        <p>
        <button>Sort</button>
        </P>
            <table>
                <thead>
                    <tr>
                        <td>Userid</td>
                        <td>ID</td>
                        <td>Title</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    ${tabledata.map(data=>`
                    <tr>
                        <td>${data.userId}</td>
                        <td>${data.id}</td>
                        <td>${data.title}</td>
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