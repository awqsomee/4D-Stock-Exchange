import React from 'react';
<canvas id="Canvas_diagram" width='600px' height="150px"></canvas>
let ctx = document.querySelector("Canvas_diagram").getContext("2D");
let Canvas_diagram = new Chart(ctx, {
    type: "line",
    datasets: [{
        labels: [0,0.5,1,1.5],
        data:[1, 0.8, 1,2 ] ,
        backgroundColor: ["#6c7175"],
        borderColor: ["#a0e28d"],
        borderWidth: 5,
    }],
    options:{}
})


const Canvas = () => {
    const ctx = document.querySelector("Canvas_diagram").getContext("2D");
    const Canvas_diagram = new Chart(ctx, {
    type: "line",
    datasets: [{
        labels: [0,0.5,1,1.5],
        data:[1, 0.8, 1,2 ] ,
        backgroundColor: ["#6c7175"],
        borderColor: ["#a0e28d"],
        borderWidth: 5,
    }],
    options:{}
})
  return (
    <div className='canvas'>
        <canvas width={600} height={400}/>
    </div>
  )
}

export default Canvas