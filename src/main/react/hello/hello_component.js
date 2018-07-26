class Animal extends React.Component {
    render() {
        return (
            <h2>Hello {this.props.animal}</h2>
        );
    }
}

class Animals extends React.Component {
    render() {
        return (this.props.animals.map((animal) =>
            <Animal key={animal} animal={animal} />
        ));
    }
}

const animals = ["pig", "donkey", "bear", "tiger"];

ReactDOM.render(
    <div>
        <h1>Hello Animals</h1>
        <Animals animals={animals} />
    </div>,
    document.getElementById("root")
);