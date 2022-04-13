// import { BrowserRouter, Route, Routes } from 'react-router-dom'
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