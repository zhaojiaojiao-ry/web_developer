class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  // 下层多个组件使用的state，定义到上层组件里
            searchName:"",
            requireStock:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleChange(event) {  // state的处理方法也定义到上层组件里
        this.setState({
            searchName:event.target.value
        });
    }

    handleCheck(event) {
        this.setState({
            requireStock:event.target.checked
        });
    }

    render() {
        return (// 将state和处理方法当做props传递给下层组件
            <div>
                <SearchBar searchName={this.state.searchName} requireStock={this.state.requireStock} handleChange={this.handleChange} handleCheck={this.handleCheck}/>
                <SearchResultTable data={this.props.data} searchName={this.state.searchName} requireStock={this.state.requireStock}/>
            </div>
        );
    }
}

class SearchBar extends React.Component {
    render() {
        return(// 渲染时，使用上层传来的属性和处理方法
            <form>
                <input type="text" placeholder="Search..." value={this.props.searchName} onChange={this.props.handleChange}/>
                <br/>
                <label><input type="checkbox" checked={this.props.requireStock} onChange={this.props.handleCheck}/>Only show products in stock</label>
            </form>
        );
    }
}

class SearchResultTable extends React.Component {
    render() {
        return (// 渲染时，使用上层传来的属性
            <table>
                <thead>
                    <SearchResultHeader />
                </thead>
                <tbody>
                    <SearchResultBody data={this.props.data} searchName={this.props.searchName} requireStock={this.props.requireStock}/>
                </tbody>
            </table>
        );
    }
}

class SearchResultHeader extends React.Component {
    render() {
        return (
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
        );
    }
}

class SearchResultBody extends React.Component {
    render() {
        const data = this.props.data;
        let lastCategory = '';
        let body = [];
        data.forEach((item) => {
            if (this.props.searchName == "" || item.name.toUpperCase().indexOf(this.props.searchName.toUpperCase()) !== -1) {
                if (!this.props.requireStock || item.stocked) {
                    if (item.category == lastCategory) {
                        body.push(<SearchResultItemRow key={item.name} item={item}/>);
                    }
                    else {
                        body.push(<SearchResultCategoryRow key={item.category} category={item.category}/>);
                        body.push(<SearchResultItemRow key={item.name} item={item}/>)
                    }
                    lastCategory = item.category;
                }
            }
        });
        return body;
    }
}

class SearchResultCategoryRow extends React.Component {
    render() {
        return (
            <tr>
                <th colSpan="2">{this.props.category}</th>
            </tr>
        );
    }
}

class SearchResultItemRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.price}</td>
            </tr>
        );
    }
}

const data = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

ReactDOM.render(
  <SearchForm data={data} />,
  document.getElementById("root")
);

/*
1. 根据ui，划分组件，定义出组件类。整个表格、查询部分、结果表、结果的表头、结果的表体、结果表类型行、结果表普通行。
2. 根据静态数据，写好组件的render方法，也就是组件的嵌套渲染关系。
3. 确定需要的state、state所在的组件、事件处理方法：
如需要的state有：文本输入框的value、复选框的checked。
根据state所影响的组件范围，决定将state放在哪个组件中定义。
比如文本输入框的value，虽然来源是查询部分，但查询部分和结果部分都会受这个字段影响，所以这个state放在查询部分和结果表共同的上层组件-表格组件中定义。
如果不存在这样的上层组件，则需要新建一个上层组件来存储state。
那么对这个state的修改处理方法，也定义在上层表格组件中。
state和处理方法都通过props传递给下层的组件使用。
 */