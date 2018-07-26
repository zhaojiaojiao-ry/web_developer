class Animal extends React.Component {
    constructor(props) {// 如果有this.state，需要重写构造器，首先调用父类的构造器，然后设置自己的this.state，this.state是个对象，可以包含多个属性
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {// 组件初次渲染完成后，会自动调用，获得一个定时器
        this.timer = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {// 组件要释放之前，会自动调用
        clearInterval(this.timer);
    }

    tick() {// 定时器每一秒钟调用一次tick
        this.setState({date:new Date()});// 修改this.state时，使用setState方法，这样可以重新触发render，同时，这个setState中设置的新属性会和老state中没修改的属性merge得到新state
    }

    render() {
        return(
          <h2>{this.props.animal}, {this.state.date.toLocaleTimeString()}</h2>
        );
    }
}

ReactDOM.render(
  <Animal animal="tiger" />,
  document.getElementById("root")
);

// 执行流程是：constructor, render, componentDidMount, 循环执行tick和render多次，直到释放之前执行componentWillUnmount