import './App.css'
import json from "./../data.json";
import { useState } from 'react';


function List({ list }) {
  return <div className='container'>
    {
      list.map((node) => <div key={node.id}>
        <span>{node.name}</span>
       { node.children && <List list={node.children} />}

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
