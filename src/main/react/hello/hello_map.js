const animals = ["pig", "donkey", "bear", "tiger"];

// 用map加=>遍历，自动返回map的value到animalWords数组
const animalWords = animals.map((animal, index)=>
    <h2 key={animal}>Hello {animal}, you are the {index+1}th</h2>
);

// 用map加function遍历，函数返回值放到animalWords2数组
const animalWords2 = animals.map(function(animal, index) {
    return <h2 key={animal}>Hello {animal}, you are the {index+1}th</h2>;
});

// 用forEach加=>遍历，将结果push到目标数组中，可以使用index
var animalWords3 = [];
animals.forEach((animal, index) =>
    animalWords3.push(<h2 key={animal}>Hello {animal}, you are the {index+1}th</h2>)
);

// 用forEach加function遍历，函数里用了index和数组，用数组加下标的方法获取元素
var animalWords4 = [];
animals.forEach(function(animal, index, arr) {
    animalWords4.push(<h2 key={arr[index]}>Hello {arr[index]}, you are the {index+1}th</h2>);
});

ReactDOM.render(
    <div>
        <h1>Hello Animals</h1>
        <p>map arrow</p>
        {animalWords}
        <p>map function</p>
        {animalWords2}
        <p>foreach arrow</p>
        {animalWords3}
        <p>foreach function</p>
        {animalWords4}
    </div>,
    document.getElementById("root")
);