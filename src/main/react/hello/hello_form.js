class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            submittedName: "",
        };
        this.handleChange = this.handleChange.bind(this);// 需要将handleChange和组件绑定，否则在input上调用handleChange时，this就是input元素，那么this.setState会报找不到setState方法，就不能达到修改组件属性的效果了
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {// 事件处理方法有事件参数，可以通过事件获得target等一系列事件相关属性
        this.setState({name:event.target.value});// 使用setState触发render
    }

    handleSubmit(event) {
        this.setState({submittedName:this.state.name});
        event.preventDefault();// 如果不加这句，submit默认会刷新页面
    }

    render() {
        return(// 文本input的value变化时，调用this.handleChange；form提交时，调用this.handleSubmit
            <form onSubmit={this.handleSubmit}>
                <label>name: <input type="text" value={this.state.name} onChange={this.handleChange}/></label>
                <p>your input name is: {this.state.name}</p>

                <input type="submit"/>
                <p>your submitted name is: {this.state.submittedName}</p>
            </form>
        );
    }
}

ReactDOM.render(
    <div>
        <h1>Hello</h1>
        <Form />
    </div>,
    document.getElementById("root")
);