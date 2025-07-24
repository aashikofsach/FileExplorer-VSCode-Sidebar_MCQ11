import './App.css'
import json from "./../data.json";
import { useState } from 'react';


function List({ list }) {
  const [show, setShow] = useState({});

  return <div className='container'>
    {
      list.map((node) => <div key={node.id} className='parent' >
        {node.isFolder && <span onClick={() => setShow((prev) => ({...prev , [node.name] : !prev[node.name]}))}>{show?.[node.name] ? "-" : "+"} </span>}
        <span>{node.name}</span>
       { node.isFolder && <span><img src="/add-folder.png" alt="add-folder" className='icon' /></span>}

        {show?.[node.name] && node.children && <List list={node.children} />}

      </div>)
    }
  </div>

}



function App() {
  const [data, setData] = useState(json);

  return (
    <div>
      <h1>VSCode-Sidebar/FileExplorer-Blueprint</h1>
      <List list={data} />

    </div>
  )
}

export default App
