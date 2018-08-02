function AllWords() {
    let word = "Hello o";
    let allWords = [];
    for (let i=0;i<10;i++) {
        allWords.push(<h1 key={i}>{word}</h1>);
    }
    return (
        <div>{allWords}</div>
    );

}

function testLet(func) {
    for(let i=0;i<10;i++) {// 用let定义的变量i，在每层循环中，有独立的i
        func[i] = function() {
            console.log(i);
        }
    }
}

function testVar(func) {
    for (var j=0;j<10;j++) {// 用var定义的变量j，整个for循环，共用一个j；for语句和for下面的循环是两个作用域，for语句是for循环的父作用域
        func[j] = function() {
            console.log(j);
        }
    }
}


let b = [];
testLet(b);
b[6]();// print 6

let c = [];
testVar(c);
c[6]();// print 10

ReactDOM.render(
    <AllWords/>,
    document.getElementById("root")
);

