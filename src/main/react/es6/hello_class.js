class AllWords extends React.Component{
    constructor(props) {
        super(props);
        this.word = props.word;
    }
    render() {
        return (<h1>{this.word}</h1>);
    }
}


ReactDOM.render(
    <AllWords word={"abc hello"}/>,
    document.getElementById("root")
);