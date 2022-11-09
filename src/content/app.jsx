import React,{useEffect} from 'react'
import { TEngine } from './TEngine'
import './index.css'
export default function App() {
    useEffect(()=>{
        const threeTarget=document.getElementById('bee-canvas');
        const TE = new TEngine(threeTarget);
        const url=chrome.runtime.getURL(
            '/bee/scene.gltf'
           )
           console.log('url','url',url)
        TE.loadRoom(url||'http://127.0.0.1:8080/bee/scene.gltf')
    },[])
    return (
        <div id='bee-canvas'></div>
    )
}