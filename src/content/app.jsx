import React, { useEffect, useRef } from 'react'
import { TEngine } from './TEngine'
import './index.css'
import { flushSync } from 'react-dom'
export default function App() {
    const beeRef = useRef()
    useEffect(() => {
        const threeTarget = document.getElementById('bee-canvas');
        const TE = new TEngine(threeTarget);
        const url = chrome.runtime.getURL(
            '/bee/scene.gltf'
        )
        TE.loadModel(url)
            .then(() => {
                fly()
            })
    }, [])
    const fly = () => {
        let bee = beeRef.current;
        const a = 30;
        let x = 0;
        let y = 0;
        let t = 0;
        function animate(timestamp) {
            t = ((timestamp/1000) % 4000) % (2 * Math.PI)

            x = a * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
            y = a * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
            bee.style.left = x + 'px';
            bee.style.top = y + 'px';
            window.requestAnimationFrame(animate)
        }
        window.requestAnimationFrame(animate)


    }
    return (
        <div ref={beeRef} id='bee-canvas'></div>
    )
}