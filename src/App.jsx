import './App.css'
import json from "./../data.json";
import { useState } from 'react';


function List({ list ,addNodeToList ,deleteNodeFromlist}) {
  const [show, setShow] = useState({});

  return <div className='container'>
    {
      list.map((node) => <div key={node.id} className='parent' >
        {node.isFolder && <span onClick={() => setShow((prev) => ({ ...prev, [node.name]: !prev[node.name] }))}>{show?.[node.name] ? "-" : "+"} </span>}
        <span>{node.name}</span>
        {node.isFolder && <span onClick={() => addNodeToList(node.id)}><img src="/add-folder.png" alt="add-folder" className='icon' /></span>}
         {<span onClick={() => deleteNodeFromlist(node.id)}><img src="/delete-folder.png" alt="add-folder" className='icon2' /></span>}

        {show?.[node.name] && node.children && <List list={node.children} addNodeToList={addNodeToList} deleteNodeFromlist={deleteNodeFromlist} />}

      </div>)
    }
  </div>

}



function App() {
  const [data, setData] = useState(json);

  const addNodeToList = (parentNode) => {
    const name = prompt("enter name ")
    const updateTree = (list) => {
      return list.map(node => {
        if (node.id === parentNode)
          return {
            ...node, children: [...node.children, { id: Date.now().toString(), name: name, isFolder: true , children : [] }]
          }
          if(node.children)
          {
           return {...node, children : updateTree(node.children)}
          }
          return node
      })

    };

    setData((prev) => updateTree(prev))

  }
  const deleteNodeFromlist=(itemId)=>
  {
    const updateTree = (list)=>{
      return list.filter((node)=> node.id!==itemId).map((node)=>{
        if(node.children)
        {
          return {...node , children : updateTree(node.children)}
        }
        return node
      })

    }
    setData((prev)=>updateTree(prev))

  }


  return (
    <div>
      <h1>VSCode-Sidebar/FileExplorer-Blueprint</h1>
      <List list={data} addNodeToList={addNodeToList} deleteNodeFromlist={deleteNodeFromlist} />

    </div>
  )
}

export default App
